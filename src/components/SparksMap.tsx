import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SparksCenterLocation, MapPoiItem } from '../data/sparksLocations';

interface SparksMapProps {
  center: SparksCenterLocation;
  radiusMeters: number;
  pois: MapPoiItem[];
  selectedPoiId?: string | null;
  onSelectPoi: (poi: MapPoiItem) => void;
  routePoiIds?: string[];
}

export const SparksMap: React.FC<SparksMapProps> = ({
  center,
  radiusMeters,
  pois,
  selectedPoiId,
  onSelectPoi,
  routePoiIds = [],
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: 13,
        zoomControl: true,
      });

      // CartoDB Positron / OpenStreetMap Clean tiles (neutral, soft, elegant for corporate dashboard)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center, circle, markers, and route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !layerGroupRef.current) return;

    // Pan map to center
    map.setView([center.lat, center.lng], 13);

    // Clear existing markers
    layerGroupRef.current.clearLayers();

    // 1. Draw 5-7km catchment circle (soft green with subtle yellow border)
    if (circleRef.current) {
      circleRef.current.remove();
    }
    const circle = L.circle([center.lat, center.lng], {
      radius: radiusMeters,
      color: '#3B7451',
      weight: 1.5,
      opacity: 0.8,
      fillColor: '#68B084',
      fillOpacity: 0.08,
      dashArray: '4, 6',
    }).addTo(layerGroupRef.current);
    circleRef.current = circle;

    // 2. Custom Center Marker (Sparks Center Flagship)
    const centerHtml = `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: rgba(59, 116, 81, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 30px; height: 30px; border-radius: 9999px; background: #234932; border: 2.5px solid #FDF099; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
      </div>
    `;

    const centerIcon = L.divIcon({
      html: centerHtml,
      className: 'custom-center-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    const centerMarker = L.marker([center.lat, center.lng], { icon: centerIcon })
      .bindPopup(
        `<div style="padding: 12px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="font-size: 10px; font-weight: 700; color: #2E5B3E; text-transform: uppercase; letter-spacing: 0.05em;">Base Center</div>
          <div style="font-size: 13px; font-weight: 800; color: #152A1C; margin-top: 2px;">${center.name}</div>
          <div style="font-size: 11px; color: #4B6354; margin-top: 2px;">${center.address}</div>
          <div style="margin-top: 6px; font-size: 10px; background: #EEF6F0; padding: 4px 8px; border-radius: 6px; color: #234932; font-weight: 600;">
            Catchment Radius: ${(radiusMeters / 1000).toFixed(1)} km
          </div>
        </div>`
      )
      .addTo(layerGroupRef.current);

    // 3. Render PoI Markers
    pois.forEach((poi) => {
      const isRouteStop = routePoiIds.includes(poi.id);
      const isSelected = selectedPoiId === poi.id;

      // Color coding depending on category
      const isEnrichment = poi.categoryId === 1 || poi.categoryId === 2;
      const isPlayground = poi.categoryId === 3 || poi.categoryId === 9;
      const isCommunity = poi.categoryId === 4 || poi.categoryId === 8;

      let markerBg = isRouteStop ? '#C79316' : isSelected ? '#1A4D2E' : isEnrichment ? '#2E5B3E' : isPlayground ? '#D99B26' : '#477B5A';
      let borderCol = isRouteStop ? '#FFF8D6' : '#FFFFFF';

      const poiHtml = `
        <div style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 9999px; background: ${markerBg}; border: 2px solid ${borderCol}; box-shadow: 0 3px 8px rgba(0,0,0,0.18); color: white; font-size: 10px; font-weight: 800; cursor: pointer; transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'}; transition: transform 0.15s ease;">
          ${isRouteStop ? '★' : poi.categoryId}
        </div>
      `;

      const poiIcon = L.divIcon({
        html: poiHtml,
        className: 'custom-poi-marker',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon });

      const popupHtml = `
        <div style="padding: 12px; max-width: 250px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-weight: 700; color: #2E5B3E;">
            <span>Category #${poi.categoryId}</span>
            <span style="color: #875F0E; background: #FEF7D6; padding: 2px 6px; border-radius: 4px;">${poi.distanceKm} km away</span>
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #162B1D; margin-top: 4px; line-height: 1.2;">
            ${poi.name}
          </div>
          <div style="font-size: 11px; color: #536E5E; margin-top: 2px;">
            ${poi.categoryName} · ${poi.subType}
          </div>
          <div style="margin-top: 8px; font-size: 11px; background: #F4F8F5; padding: 6px; border-radius: 6px; border: 1px solid #DCE9DF;">
            <div style="font-weight: 700; color: #264E35; font-size: 10px; text-transform: uppercase;">Recommended Tactic:</div>
            <div style="color: #2F4939; margin-top: 2px;">${poi.recommendedTactic}</div>
          </div>
          <div style="margin-top: 6px; display: flex; justify-content: space-between; font-size: 10px; color: #617D6C;">
            <span>Peak Day: <b>${poi.crowdPeakDay}</b></span>
            <span>Weekly Footfall: <b>${poi.estimatedWeeklyFootfall.toLocaleString('id-ID')}</b></span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectPoi(poi);
      });

      marker.addTo(layerGroupRef.current!);
    });

    // 4. Render Route Polyline if route stops exist
    if (routeLineRef.current) {
      routeLineRef.current.remove();
    }
    if (routePoiIds.length > 0) {
      const routePoints: [number, number][] = [[center.lat, center.lng]];
      routePoiIds.forEach((id) => {
        const p = pois.find((item) => item.id === id);
        if (p) routePoints.push([p.lat, p.lng]);
      });
      // Loop back to center
      routePoints.push([center.lat, center.lng]);

      const polyline = L.polyline(routePoints, {
        color: '#D4A017',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.85,
      }).addTo(layerGroupRef.current);
      routeLineRef.current = polyline;
    }
  }, [center, radiusMeters, pois, selectedPoiId, routePoiIds]);

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-xl overflow-hidden border border-[#DCE8DE] shadow-xs">
      <div ref={mapContainerRef} className="w-full h-full min-h-[480px] z-0" />

      {/* Map Legend Overlay in Soft Green / Yellow */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-[#DDE8DF] shadow-xs text-[11px] space-y-1.5 pointer-events-auto">
        <div className="font-bold text-[#1A3323] flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#234932] border border-[#FDF099]"></span>
          <span>Sparks Center Flagship</span>
        </div>
        <div className="flex items-center gap-3 text-[#465E4E]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E5B3E]"></span> Enrichment/School
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D99B26]"></span> Play/Mall
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#477B5A]"></span> Community/Clinic
          </span>
        </div>
      </div>
    </div>
  );
};
