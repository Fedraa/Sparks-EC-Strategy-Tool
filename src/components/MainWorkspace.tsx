import React, { useState } from 'react';
import {
  MapPin,
  Search,
  GitBranch,
  Clock,
  Compass,
  Download,
  Copy,
  ExternalLink,
  Check,
  Calendar,
  Layers,
  BarChart3,
  TrendingUp,
  Users,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { SparksCenterLocation, MapPoiItem } from '../data/sparksLocations';
import { POI_CATEGORIES } from '../data/poiData';
import { SparksMap } from './SparksMap';

interface MainWorkspaceProps {
  isInitialized: boolean;
  onTrySampleData: () => void;
  onSearchCenter: () => void;
  center: SparksCenterLocation;
  radiusMeters: number;
  analysisDay: string;
  pois: MapPoiItem[];
  selectedPoi: MapPoiItem | null;
  onSelectPoi: (poi: MapPoiItem) => void;
  routePoiIds: string[];
  onToggleRoutePoi: (poiId: string) => void;
  activeConsultant: 'A' | 'B';
  setActiveConsultant: (val: 'A' | 'B') => void;
  onOpenGmapsRoute: () => void;
  onCopyGmapsRoute: () => void;
  copiedGmaps: boolean;
  gmapsRouteUrl: string;
}

export const MainWorkspace: React.FC<MainWorkspaceProps> = ({
  isInitialized,
  onTrySampleData,
  onSearchCenter,
  center,
  radiusMeters,
  analysisDay,
  pois,
  selectedPoi,
  onSelectPoi,
  routePoiIds,
  onToggleRoutePoi,
  activeConsultant,
  setActiveConsultant,
  onOpenGmapsRoute,
  onCopyGmapsRoute,
  copiedGmaps,
  gmapsRouteUrl,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'route'>('route');
  const [hourFilter, setHourFilter] = useState<'all' | 'morning' | 'afternoon'>('all');
  const [showGmapsPreviewModal, setShowGmapsPreviewModal] = useState<boolean>(false);

  // Initial Welcome State
  if (!isInitialized) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[580px] bg-white rounded-2xl border border-[#DCE8DE] shadow-xs p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EFF6F1] border-4 border-[#D8EADB] flex items-center justify-center text-[#2E5B3E] shadow-xs mb-6">
          <MapPin className="w-9 h-9 text-[#2E5B3E]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173020] tracking-tight mb-2">
          Welcome to Sparks EC Strategy Tool
        </h2>
        <p className="text-sm text-[#4E6757] max-w-md leading-relaxed mb-7">
          Start by searching for a Sparks Center address in the sidebar or use the sample data to
          see how the dashboard works.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={onTrySampleData}
            className="px-5 py-2.5 text-xs font-semibold text-[#275336] bg-[#EFF6F1] hover:bg-[#E1EFE5] border border-[#CBDED0] rounded-xl shadow-2xs transition-all active:scale-[0.98]"
          >
            Try Sample Data
          </button>
          <button
            onClick={onSearchCenter}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all active:scale-[0.98]"
          >
            Search Sparks Center
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl w-full pt-8 border-t border-[#EEF4EF]">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F3F7F4] text-[#366847] flex items-center justify-center border border-[#DFEBE2]">
              <Search className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#1E3726] uppercase tracking-wider">
              1. FIND POIS
            </div>
            <p className="text-[11px] text-[#637D6E]">
              Detect high-density family hubs within 5–7 km radius.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F3F7F4] text-[#C4951B] flex items-center justify-center border border-[#DFEBE2]">
              <GitBranch className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#1E3726] uppercase tracking-wider">
              2. OPTIMIZE ROUTE
            </div>
            <p className="text-[11px] text-[#637D6E]">
              Sequence partnership visits and generate Google Maps route.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F3F7F4] text-[#366847] flex items-center justify-center border border-[#DFEBE2]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#1E3726] uppercase tracking-wider">
              3. SCHEDULE VISITS
            </div>
            <p className="text-[11px] text-[#637D6E]">
              Coordinate pickup time flyering and B2B school pitches.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Active Dashboard Data Calculations
  // Distinct segments in found POIs
  const uniqueSegments = Array.from(new Set(pois.map((p) => p.categoryName)));

  // Counts by segment
  const segmentCounts: Record<string, number> = {};
  pois.forEach((p) => {
    segmentCounts[p.categoryName] = (segmentCounts[p.categoryName] || 0) + 1;
  });

  // Counts by radius
  const radiusUnder1km = pois.filter((p) => p.distanceKm <= 1.0).length;
  const radius1to3km = pois.filter((p) => p.distanceKm > 1.0 && p.distanceKm <= 3.0).length;
  const radiusOver3km = pois.filter((p) => p.distanceKm > 3.0).length;

  // Counts by crowd level
  const crowdHigh = pois.filter((p) => p.densityLevel === 'Very High').length;
  const crowdMed = pois.filter((p) => p.densityLevel === 'High').length;
  const crowdLow = pois.filter((p) => p.densityLevel === 'Medium').length;

  // Consultant stops split (Consultant A gets first half, Consultant B gets second half)
  const half = Math.ceil(pois.length / 2);
  const consultantStops = activeConsultant === 'A' ? pois.slice(0, half) : pois.slice(half);

  // Recommended times schedule
  const getRecommendedTime = (idx: number) => {
    const times = [
      '09:00 AM',
      '10:30 AM',
      '11:45 AM',
      '01:30 PM',
      '03:00 PM',
      '04:30 PM',
      '05:45 PM',
    ];
    return times[idx % times.length];
  };

  const getRecommendedApproaches = (poi: MapPoiItem) => {
    if (poi.densityLevel === 'Very High') return '25-40 Approaches';
    if (poi.densityLevel === 'High') return '15-25 Approaches';
    return '10-15 Approaches';
  };

  const exportExcel = () => {
    const headers = [
      'Name',
      'Category',
      'Subtype',
      'Distance (km)',
      'Weekly Footfall',
      'Peak Day',
      'Crowd Level',
      'Recommended Tactic',
    ];
    const rows = pois.map((p) => [
      `"${p.name}"`,
      `"${p.categoryName}"`,
      `"${p.subType}"`,
      p.distanceKm,
      p.estimatedWeeklyFootfall,
      `"${p.crowdPeakDay}"`,
      `"${p.densityLevel}"`,
      `"${p.recommendedTactic.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sparks_ec_pois_${radiusMeters}m.csv`;
    a.click();
  };

  return (
    <div className="flex-1 space-y-4">
      {/* 1. TOP HEADER ROW (Matching Pic 1) */}
      <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Found N POIs + Segments Badge */}
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#173020] tracking-tight">
            Found {pois.length} POIs
          </h2>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4ED] text-[#245434] border border-[#CFE5D6] uppercase tracking-wider">
            {uniqueSegments.length} SEGMENTS
          </span>
        </div>

        {/* Right Action Controls: List | Map | Route toggle, Export Excel, Radius Badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* List | Map | Route Toggle */}
          <div className="flex items-center p-1 bg-[#F1F6F2] rounded-xl border border-[#DCE8DE]">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#204A2F] shadow-xs'
                  : 'text-[#5E7A69] hover:text-[#183120]'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-[#204A2F] shadow-xs'
                  : 'text-[#5E7A69] hover:text-[#183120]'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setViewMode('route')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                viewMode === 'route'
                  ? 'bg-white text-[#204A2F] shadow-xs'
                  : 'text-[#5E7A69] hover:text-[#183120]'
              }`}
            >
              Route
            </button>
          </div>

          {/* Export Excel / CSV button (Soft Green) */}
          <button
            onClick={exportExcel}
            className="flex items-center gap-1.5 px-3.5 py-1.5 font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>

          {/* Radius Badge */}
          <div className="px-3 py-1.5 font-mono font-bold text-[11px] bg-[#FEF8DF] border border-[#F3DF9A] text-[#865E0C] rounded-xl">
            RADIUS: {radiusMeters}M
          </div>
        </div>
      </div>

      {/* 2. THREE SUMMARY KPI CARDS ROW (Exact Match to Pic 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Card 1: BY SEGMENT */}
        <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 shadow-xs space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766] flex items-center justify-between border-b border-[#EEF4EF] pb-2">
            <span>By Segment</span>
            <Layers className="w-3.5 h-3.5 text-[#356B48]" />
          </div>
          <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
            {Object.entries(segmentCounts).map(([seg, count]) => (
              <div key={seg} className="flex items-center justify-between text-[#2D4536]">
                <span className="truncate pr-2">{seg}</span>
                <span className="font-bold text-[#1F5430] font-mono tabular-nums">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: BY RADIUS */}
        <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 shadow-xs space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766] flex items-center justify-between border-b border-[#EEF4EF] pb-2">
            <span>By Radius</span>
            <Compass className="w-3.5 h-3.5 text-[#356B48]" />
          </div>
          <div className="space-y-2 text-[#2D4536]">
            <div className="flex items-center justify-between">
              <span>0-1000m (Immediate Walkable)</span>
              <span className="font-bold text-[#1F5430] font-mono tabular-nums">{radiusUnder1km}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>1000m-3000m (Core Catchment)</span>
              <span className="font-bold text-[#1F5430] font-mono tabular-nums">{radius1to3km}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3000m+ (Outer Drive Zone)</span>
              <span className="font-bold text-[#1F5430] font-mono tabular-nums">{radiusOver3km}</span>
            </div>
          </div>
        </div>

        {/* Card 3: BY CROWD LEVEL */}
        <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 shadow-xs space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766] flex items-center justify-between border-b border-[#EEF4EF] pb-2">
            <span>By Crowd Level</span>
            <BarChart3 className="w-3.5 h-3.5 text-[#356B48]" />
          </div>
          <div className="space-y-2 text-[#2D4536]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2A5E3C]"></span> High Crowd
              </span>
              <span className="font-bold text-[#2A5E3C] font-mono tabular-nums">{crowdHigh}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]"></span> Medium Crowd
              </span>
              <span className="font-bold text-[#865E0C] font-mono tabular-nums">{crowdMed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span> Low Crowd
              </span>
              <span className="font-bold text-slate-500 font-mono tabular-nums">{crowdLow}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE CHARTS ROW: PEAK HOURS & PEAK DAYS (Exact Match to Pic 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Chart: PEAK HOURS DISTRIBUTION */}
        <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#EEF4EF] pb-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#356B48]" />
              Peak Hours Distribution
            </span>
            <button className="text-[10px] font-bold text-[#285737] bg-[#EFF6F1] px-2 py-0.5 rounded-md border border-[#D5E5DA]">
              ALL SELECTED POIS
            </button>
          </div>

          {/* Hourly Bar Graphic */}
          <div className="pt-2 flex items-end justify-between gap-2 h-28 px-2">
            {[
              { time: '08:00', height: '40%', active: false },
              { time: '10:00', height: '65%', active: false },
              { time: '12:00', height: '85%', active: true },
              { time: '14:00', height: '55%', active: false },
              { time: '16:00', height: '95%', active: true },
              { time: '18:00', height: '70%', active: false },
            ].map((slot, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  style={{ height: slot.height }}
                  className={`w-full max-w-[42px] rounded-t-lg transition-all ${
                    slot.active
                      ? 'bg-[#316041] hover:bg-[#254C33]'
                      : 'bg-[#DFEBE2] hover:bg-[#CADDCF]'
                  }`}
                  title={`${slot.time} - Estimated crowd index`}
                ></div>
                <span className="text-[10px] font-mono text-[#63806F]">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chart: PEAK DAYS ANALYSIS */}
        <div className="bg-white rounded-2xl border border-[#DCE8DE] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#EEF4EF] pb-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C4951B]" />
              Peak Days Analysis
            </span>
            <span className="text-[10px] font-semibold text-[#865E0C] bg-[#FEF8DF] px-2 py-0.5 rounded-md border border-[#F3DF9A]">
              Selected: {analysisDay}
            </span>
          </div>

          {/* Daily Bar Graphic */}
          <div className="pt-2 flex items-end justify-between gap-2 h-28 px-2">
            {[
              { day: 'Mon', height: '45%' },
              { day: 'Tue', height: '40%' },
              { day: 'Wed', height: '50%' },
              { day: 'Thu', height: '60%' },
              { day: 'Fri', height: '70%' },
              { day: 'Sat', height: '100%' },
              { day: 'Sun', height: '95%' },
            ].map((d, idx) => {
              const isSelectedDay = d.day === analysisDay;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: d.height }}
                    className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                      isSelectedDay
                        ? 'bg-[#D4A017] shadow-xs'
                        : d.day === 'Sat' || d.day === 'Sun'
                        ? 'bg-[#316041]'
                        : 'bg-[#DFEBE2]'
                    }`}
                  ></div>
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelectedDay ? 'text-[#865E0C] font-bold' : 'text-[#63806F]'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. MAP VIEW IF SELECTED */}
      {viewMode === 'map' && (
        <div className="h-[520px]">
          <SparksMap
            center={center}
            radiusMeters={radiusMeters}
            pois={pois}
            selectedPoiId={selectedPoi?.id}
            onSelectPoi={onSelectPoi}
            routePoiIds={consultantStops.map((s) => s.id)}
          />
        </div>
      )}

      {/* 5. ROUTE VIEW (Exact Match to Pic 1 bottom section + GMaps button from Pic 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Card: ROUTE SUMMARY */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#DCE8DE] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF4EF] pb-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
              Route Summary
            </span>
            <button
              onClick={onSearchCenter}
              className="text-[11px] font-bold text-[#2A5739] hover:underline"
            >
              Change Anchor
            </button>
          </div>

          <div className="space-y-3">
            {/* Anchor Point Box */}
            <div className="p-3 bg-[#F4F8F5] rounded-xl border border-[#DCE9DF] space-y-1 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2F6140] flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-[#234932] text-white flex items-center justify-center font-bold text-[9px]">
                  A
                </span>
                <span>Anchor Point</span>
              </div>
              <div className="font-bold text-[#162D1F]">{center.name}</div>
              <div className="text-[11px] text-[#557161]">{center.address}</div>
            </div>

            {/* Strategy For Day */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#865E0C] bg-[#FEF8DF] p-2 rounded-lg border border-[#F3DF9A]">
              Strategy For: {analysisDay.toUpperCase()}DAY
            </div>

            {/* Consultant Tabs */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
                Active Route
              </div>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F1F6F2] rounded-lg border border-[#DCE8DE] text-xs">
                <button
                  onClick={() => setActiveConsultant('A')}
                  className={`py-1.5 font-bold rounded-md transition-all text-center ${
                    activeConsultant === 'A'
                      ? 'bg-white text-[#214930] shadow-xs'
                      : 'text-[#587363] hover:text-[#183322]'
                  }`}
                >
                  CONSULTANT A
                </button>
                <button
                  onClick={() => setActiveConsultant('B')}
                  className={`py-1.5 font-bold rounded-md transition-all text-center ${
                    activeConsultant === 'B'
                      ? 'bg-white text-[#214930] shadow-xs'
                      : 'text-[#587363] hover:text-[#183322]'
                  }`}
                >
                  CONSULTANT B
                </button>
              </div>
            </div>

            {/* BUTTON 1: COPY GMAPS ROUTE */}
            <button
              onClick={onCopyGmapsRoute}
              className="w-full py-2.5 px-3 text-xs font-bold text-[#2A5939] bg-[#EFF6F1] hover:bg-[#E2EFE6] border border-[#CBDED0] rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {copiedGmaps ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Google Maps Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C4951B]" />
                  <span>Copy GMaps Route</span>
                </>
              )}
            </button>

            {/* BUTTON 2: OPEN IN GOOGLE MAPS (Matches Pic 2!) */}
            <button
              onClick={onOpenGmapsRoute}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 text-[#FDF099]" />
              <span>Open in Google Maps (Pic 2)</span>
            </button>

            {/* Preview modal trigger */}
            <button
              onClick={() => setShowGmapsPreviewModal(true)}
              className="w-full py-1.5 text-center text-xs font-bold text-[#306041] hover:underline"
            >
              Preview Multi-Stop Turn-by-Turn Route
            </button>
          </div>
        </div>

        {/* Right Cards: Sequenced Route Stops (Exact Match to Pic 1 right column) */}
        <div className="lg:col-span-8 space-y-3">
          {consultantStops.map((poi, idx) => {
            const stopNumber = idx + 1;
            const singleGmapsUrl = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${poi.lat},${poi.lng}`;

            return (
              <div
                key={poi.id}
                onClick={() => onSelectPoi(poi)}
                className="bg-white rounded-2xl border border-[#DCE8DE] p-4 sm:p-5 shadow-xs hover:border-[#B7D6C0] transition-all space-y-3 cursor-pointer"
              >
                {/* Header: Stop Number + Venue Title + Recommended Time + Target */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[#EEF4EF] pb-3">
                  <div className="flex items-start gap-3">
                    {/* Number Badge inside Circle (Orange / Gold like Pic 1) */}
                    <div className="w-9 h-9 rounded-full bg-[#E07A10] text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      {stopNumber}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-base font-extrabold text-[#173020] leading-snug hover:text-[#2E5B3E]">
                        {poi.name}
                      </h4>
                      <div className="text-[11px] font-semibold text-[#5A7766] flex items-center gap-1 font-mono uppercase tracking-wider">
                        <Navigation className="w-3 h-3 text-[#356B48]" />
                        <span>{(poi.distanceKm * 1000).toFixed(0)}M FROM SPARKS CENTER</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Meta: Recommended Time & Target Approaches */}
                  <div className="text-left sm:text-right space-y-1 shrink-0 pl-12 sm:pl-0">
                    <div className="flex items-center sm:justify-end gap-1.5 text-[11px] font-mono text-[#5A7766]">
                      <Clock className="w-3 h-3 text-[#C4951B]" />
                      <span>RECOMMENDED: </span>
                      <span className="font-bold text-[#183120]">
                        {getRecommendedTime(idx)}
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-[#2E5B3E] font-mono">
                      {getRecommendedApproaches(poi)}
                    </div>
                  </div>
                </div>

                {/* Sub-body: Establishments in this building + Time window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#688574]">
                      Establishments in this Target:
                    </div>
                    <div className="font-semibold text-[#20392A]">{poi.name}</div>
                    <div className="text-[11px] text-[#52705E] uppercase tracking-wider font-semibold">
                      {poi.categoryName} ({poi.subType})
                    </div>
                  </div>

                  <div className="space-y-1 text-left sm:text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#688574]">
                      Crowd Peak Time Window:
                    </div>
                    <div className="font-mono text-[#20392A] font-medium">
                      02:00 PM – 06:30 PM ({poi.crowdPeakDay})
                    </div>
                    <div className="text-[11px] text-[#557161]">
                      Est. Weekly Footfall: {poi.estimatedWeeklyFootfall.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Footer Action: Tactic + GMAPS link (Exact Match to Pic 1 & Pic 2) */}
                <div className="pt-2 border-t border-[#EEF4EF] flex items-center justify-between text-xs">
                  <div className="text-[11px] text-[#3E5B49] flex items-center gap-1.5 truncate max-w-md">
                    <span className="font-bold text-[#275336]">Tactic: </span>
                    <span className="truncate">{poi.recommendedTactic}</span>
                  </div>

                  {/* GMAPS Link with External Link Icon */}
                  <a
                    href={singleGmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[11px] font-extrabold text-[#306041] hover:text-[#183622] hover:underline uppercase tracking-wider shrink-0"
                  >
                    <span>GMAPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. GOOGLE MAPS MULTI-STOP ROUTE PREVIEW MODAL (Mirrors Pic 2!) */}
      {showGmapsPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-2xl border border-[#DCE8DE] overflow-hidden">
            {/* Modal Header mimicking Google Maps navigation bar */}
            <div className="bg-[#244931] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Navigation className="w-5 h-5 text-[#FDF099]" />
                <div>
                  <h3 className="font-bold text-sm">
                    Google Maps Multi-Stop Route Plan ({consultantStops.length} Waypoints)
                  </h3>
                  <p className="text-[11px] text-[#C2DEC9]">
                    Optimized Driving Route for Sparks EC Outreach
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGmapsPreviewModal(false)}
                className="text-white/80 hover:text-white font-bold p-1 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Route Waypoint Inputs like Pic 2 left panel */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="p-4 bg-[#F8FAF8] rounded-xl border border-[#DEEBE1] space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2E5E3D] mb-1">
                  Route Waypoint Sequence (Departure & Return to Base):
                </div>

                {/* Origin */}
                <div className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-lg border border-[#D8E6DB]">
                  <span className="w-5 h-5 rounded-full bg-[#234932] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    O
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-[#183120]">START: </span>
                    <span>{center.name} ({center.address})</span>
                  </div>
                </div>

                {/* Stops */}
                {consultantStops.map((stop, i) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-lg border border-[#D8E6DB]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#E07A10] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    <div className="truncate flex-1">
                      <span className="font-bold text-[#183120]">{stop.name}</span>
                      <span className="text-[#648070] text-[11px] ml-2">({stop.address})</span>
                    </div>
                    <span className="text-[#845E0E] font-mono text-[11px] shrink-0">
                      {stop.distanceKm} km
                    </span>
                  </div>
                ))}

                {/* Destination */}
                <div className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-lg border border-[#D8E6DB]">
                  <span className="w-5 h-5 rounded-full bg-[#234932] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    D
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-[#183120]">RETURN: </span>
                    <span>{center.name}</span>
                  </div>
                </div>
              </div>

              {/* Driving ETA stats box like Pic 2 bottom card */}
              <div className="p-4 bg-[#EFF6F1] rounded-xl border border-[#CDE5D4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#183120] text-sm">
                    via Primary Arterial Corridors
                  </div>
                  <div className="text-[#4E6857]">Fastest route connecting all stops</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold text-[#234F31] font-mono">
                    ~{(consultantStops.length * 15 + 10).toFixed(0)} min (
                    {consultantStops.reduce((a, c) => a + c.distanceKm, 0).toFixed(1)} km)
                  </div>
                </div>
              </div>

              {/* Direct Link text */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#557161]">Google Maps URL:</div>
                <input
                  readOnly
                  value={gmapsRouteUrl}
                  className="w-full p-2 text-xs font-mono bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#203628]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAFBF9] border-t border-[#EEF4EF] p-4 flex items-center justify-between gap-3">
              <button
                onClick={onCopyGmapsRoute}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-[#D5E5DA] text-[#244F32] hover:bg-[#F2F7F4]"
              >
                {copiedGmaps ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedGmaps ? 'Copied Link' : 'Copy Route Link'}</span>
              </button>

              <button
                onClick={onOpenGmapsRoute}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-[#FDF099]" />
                <span>Open in Google Maps (Pic 2)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
