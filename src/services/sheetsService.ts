import centersData from '../data/centersData.json';
import sheetsData from '../data/sheetsData.json';
import { SparksCenterLocation, MapPoiItem } from '../data/sparksLocations';

export const SPREADSHEET_ID = '1IVSxzJd7mKjO6TAH8emDBWM_FZeks20TfJeHQ-AH4sY';

export const SPARKS_CENTERS: SparksCenterLocation[] = centersData as SparksCenterLocation[];

// In-memory store initialized from the bundled snapshot
let currentPoisByCenter: Record<string, MapPoiItem[]> = (sheetsData as any).poisByCenter || {};
let lastSyncedTimestamp: string = (sheetsData as any).lastSynced || new Date().toISOString();
let isLiveSynced: boolean = false;

// Haversine distance calculator
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

/**
 * Get all available Sparks Centers (27 Centers across Indonesia)
 */
export function getAllCenters(): SparksCenterLocation[] {
  return SPARKS_CENTERS;
}

/**
 * Get POIs for a selected center or custom coordinates, filtered by radius and category
 */
export function getPoisForCenter(
  center: SparksCenterLocation,
  radiusMeters: number = 5000,
  selectedCategoryIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
): MapPoiItem[] {
  const maxRadiusKm = radiusMeters / 1000;

  // 1. If center matches one of the 27 known centers, retrieve its assigned POIs
  const assignedPois = currentPoisByCenter[center.name];

  if (assignedPois && assignedPois.length > 0) {
    return assignedPois
      .filter((poi) => poi.distanceKm <= maxRadiusKm)
      .filter((poi) => selectedCategoryIds.includes(poi.categoryId))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }

  // 2. If it's a custom pin / GPS location, calculate proximity across the full database
  const allPois: MapPoiItem[] = [];
  const seenIds = new Set<string>();

  for (const list of Object.values(currentPoisByCenter)) {
    for (const p of list) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        const dist = calculateDistanceKm(center.lat, center.lng, p.lat, p.lng);
        if (dist <= maxRadiusKm && selectedCategoryIds.includes(p.categoryId)) {
          allPois.push({
            ...p,
            distanceKm: dist,
          });
        }
      }
    }
  }

  return allPois.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

/**
 * Helper to parse a standard CSV string handling quoted fields
 */
function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rows: string[][] = [];

  for (const line of lines) {
    const row: string[] = [];
    let insideQuotes = false;
    let currentField = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        row.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    row.push(currentField);
    rows.push(row);
  }

  return rows;
}

/**
 * Live sync function to fetch fresh data directly from Google Sheets
 */
export async function syncFromGoogleSheets(): Promise<{
  success: boolean;
  message: string;
  totalPois: number;
  lastSynced: string;
}> {
  try {
    // Fetch Scoring tab
    const scoringUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Scoring`;
    const response = await fetch(scoringUrl);

    if (!response.ok) {
      throw new Error(`Google Sheets responded with status ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      throw new Error('No data rows returned from Google Sheets Scoring tab');
    }

    // Process rows into poisByCenter
    const newPoisByCenter: Record<string, MapPoiItem[]> = {};

    // Header is row 0: ID, Nama Lokasi, Kategori, Traffic, Keluarga, Segmen Menengah, Skor Jarak, SKOR TOTAL, Ranking, Tier, Kelengkapan Data, Jarak dari Sparks (km), CENTER ASSIGNED, Link Maps
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 13) continue;

      const pid = row[0];
      const name = row[1];
      const catCol = row[2];
      const traffic = parseFloat(row[3]) || 0;
      const keluarga = parseFloat(row[4]) || 0;
      const segmen = parseFloat(row[5]) || 0;
      const distScore = parseFloat(row[6]) || 0;
      const totalScore = parseFloat(row[7]) || 0;
      const ranking = parseInt(row[8], 10) || 9999;
      const tier = row[9] || 'B';
      const distKm = parseFloat(row[11]) || 0;
      const centerAssigned = row[12];
      const mapsUrl = row[13] || '';

      // Extract Lat & Lng from Maps URL
      let lat = 0;
      let lng = 0;
      const coordMatch = mapsUrl.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
      if (coordMatch) {
        lat = parseFloat(coordMatch[1]);
        lng = parseFloat(coordMatch[2]);
      }

      // Check existing cached POI to preserve full address / category info
      const existing = (sheetsData as any).poisByCenter?.[centerAssigned]?.find(
        (p: any) => p.id === pid
      );

      const categoryId = existing?.categoryId || 3;
      const categoryName = existing?.categoryName || 'Kids Play & Family Entertainment';
      const tactic = existing?.recommendedTactic || 'Aktivitas promosi & flyering';
      const address = existing?.address || '';
      const phone = existing?.contactPhone || '';

      const poiItem: MapPoiItem = {
        id: pid,
        name,
        categoryId,
        categoryName,
        subType: catCol || 'Venue',
        lat,
        lng,
        distanceKm: distKm,
        address,
        estimatedWeeklyFootfall: existing?.estimatedWeeklyFootfall || Math.round(traffic * 5 + 100),
        crowdPeakDay: keluarga >= 80 ? 'Sat' : 'Thu',
        densityLevel: totalScore >= 85 ? 'Very High' : totalScore >= 75 ? 'High' : 'Medium',
        recommendedTactic: tactic,
        contactPhone: phone,
        score: totalScore,
        ranking,
        tier,
        trafficScore: traffic,
        familyScore: keluarga,
        sesScore: segmen,
        distanceScore: distScore,
        mapsUrl,
        centerAssigned,
      };

      if (!newPoisByCenter[centerAssigned]) {
        newPoisByCenter[centerAssigned] = [];
      }
      newPoisByCenter[centerAssigned].push(poiItem);
    }

    // Sort each center's POIs by score descending
    for (const c of Object.keys(newPoisByCenter)) {
      newPoisByCenter[c].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }

    currentPoisByCenter = newPoisByCenter;
    lastSyncedTimestamp = new Date().toISOString();
    isLiveSynced = true;

    const totalPoisCount = Object.values(newPoisByCenter).reduce(
      (sum, list) => sum + list.length,
      0
    );

    return {
      success: true,
      message: `Successfully synchronized ${totalPoisCount} POIs from Google Sheets.`,
      totalPois: totalPoisCount,
      lastSynced: lastSyncedTimestamp,
    };
  } catch (error: any) {
    console.warn('Google Sheets live fetch fallback to local snapshot:', error?.message);
    return {
      success: false,
      message: error?.message || 'Failed to sync with Google Sheets',
      totalPois: Object.values(currentPoisByCenter).reduce(
        (sum, list) => sum + list.length,
        0
      ),
      lastSynced: lastSyncedTimestamp,
    };
  }
}

export function getSyncStatus() {
  return {
    isLive: isLiveSynced,
    lastSynced: lastSyncedTimestamp,
    totalCenters: SPARKS_CENTERS.length,
    totalPois: Object.values(currentPoisByCenter).reduce(
      (sum, list) => sum + list.length,
      0
    ),
  };
}
