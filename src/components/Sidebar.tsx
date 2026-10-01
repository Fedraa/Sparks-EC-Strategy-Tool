import React from 'react';
import {
  MapPin,
  Search,
  Crosshair,
  BookOpen,
  Baby,
  Gamepad2,
  Users,
  ShoppingBag,
  Stethoscope,
  Utensils,
  Home,
  Building,
  GraduationCap,
  Landmark,
  Calendar,
  GitBranch,
  RefreshCw,
  Copy,
  ExternalLink,
  Check,
} from 'lucide-react';
import { POI_CATEGORIES } from '../data/poiData';
import { MapPoiItem, SparksCenterLocation } from '../data/sparksLocations';

interface SidebarProps {
  searchAddress: string;
  setSearchAddress: (val: string) => void;
  latitude: string;
  setLatitude: (val: string) => void;
  longitude: string;
  setLongitude: (val: string) => void;
  radiusMeters: number;
  setRadiusMeters: (val: number) => void;
  analysisDay: string;
  setAnalysisDay: (day: string) => void;
  selectedCategoryIds: number[];
  setSelectedCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
  onFindAddress: () => void;
  onUseCurrentLocation: () => void;
  // Route Optimization props
  pois: MapPoiItem[];
  center: SparksCenterLocation;
  activeConsultant: 'A' | 'B';
  setActiveConsultant: (val: 'A' | 'B') => void;
  onRegenerateRoute: () => void;
  onViewScheduleDetails: () => void;
  onOpenGmapsRoute: () => void;
  onCopyGmapsRoute: () => void;
  copiedGmaps: boolean;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const POI_ICONS: Record<number, React.ReactNode> = {
  1: <BookOpen className="w-3.5 h-3.5 shrink-0" />,
  2: <Baby className="w-3.5 h-3.5 shrink-0" />,
  3: <Gamepad2 className="w-3.5 h-3.5 shrink-0" />,
  4: <Users className="w-3.5 h-3.5 shrink-0" />,
  5: <ShoppingBag className="w-3.5 h-3.5 shrink-0" />,
  6: <Stethoscope className="w-3.5 h-3.5 shrink-0" />,
  7: <Utensils className="w-3.5 h-3.5 shrink-0" />,
  8: <Home className="w-3.5 h-3.5 shrink-0" />,
  9: <Building className="w-3.5 h-3.5 shrink-0" />,
  10: <GraduationCap className="w-3.5 h-3.5 shrink-0" />,
  11: <Landmark className="w-3.5 h-3.5 shrink-0" />,
  12: <Calendar className="w-3.5 h-3.5 shrink-0" />,
};

export const Sidebar: React.FC<SidebarProps> = ({
  searchAddress,
  setSearchAddress,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  radiusMeters,
  setRadiusMeters,
  analysisDay,
  setAnalysisDay,
  selectedCategoryIds,
  setSelectedCategoryIds,
  onFindAddress,
  onUseCurrentLocation,
  pois,
  center,
  activeConsultant,
  setActiveConsultant,
  onRegenerateRoute,
  onViewScheduleDetails,
  onOpenGmapsRoute,
  onCopyGmapsRoute,
  copiedGmaps,
}) => {
  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategoryIds.length === POI_CATEGORIES.length) {
      setSelectedCategoryIds([1, 2, 3]);
    } else {
      setSelectedCategoryIds(POI_CATEGORIES.map((p) => p.id));
    }
  };

  return (
    <aside className="w-full lg:w-[320px] shrink-0 bg-white rounded-2xl border border-[#DCE8DE] shadow-xs p-4 sm:p-5 space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 text-[#2A5739] font-bold text-sm">
        <MapPin className="w-4 h-4 text-[#356B48]" />
        <span>Sparks Center Location</span>
      </div>

      {/* SEARCH ADDRESS */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
          Search Address
        </label>
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#86A292] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onFindAddress()}
              placeholder="Address or Google Maps link..."
              className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#F7FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3624] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white truncate"
            />
          </div>
          <button
            onClick={onFindAddress}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#306041] hover:bg-[#254C33] active:scale-[0.98] rounded-lg shadow-2xs transition-all shrink-0"
          >
            Find
          </button>
        </div>
      </div>

      {/* OR DIVIDER */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-[#E5EFE7] w-full"></div>
        <span className="bg-white px-2 text-[10px] font-bold text-[#8AA293] uppercase tracking-wider absolute">
          OR
        </span>
      </div>

      {/* LATITUDE & LONGITUDE INPUTS */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-[#5A7766] uppercase tracking-wider">
            Latitude (Optional)
          </label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="-6.2291778"
            className="w-full px-2.5 py-1.5 text-xs bg-[#F7FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3624] font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-[#5A7766] uppercase tracking-wider">
            Longitude (Optional)
          </label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="106.6339140"
            className="w-full px-2.5 py-1.5 text-xs bg-[#F7FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3624] font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
          />
        </div>
      </div>

      {/* USE MY CURRENT LOCATION BUTTON */}
      <button
        onClick={onUseCurrentLocation}
        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#295637] bg-[#EFF6F1] hover:bg-[#E3EFE6] border border-[#D5E5DA] rounded-lg transition-all"
      >
        <Crosshair className="w-3.5 h-3.5 text-[#356B48]" />
        <span>Use My Current Location</span>
      </button>

      {/* RADIUS (METERS) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
            Radius (Meters)
          </label>
          <div className="flex gap-1">
            {[5000, 6000, 7000].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusMeters(r)}
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  radiusMeters === r
                    ? 'bg-[#316041] text-white font-bold'
                    : 'bg-[#F2F6F3] text-[#52705E] hover:bg-[#E5ECE7]'
                }`}
              >
                {r / 1000}km
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            step="500"
            min="1000"
            max="15000"
            value={radiusMeters}
            onChange={(e) => setRadiusMeters(Number(e.target.value))}
            className="w-full pl-3 pr-8 py-1.5 text-xs bg-[#F7FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3624] font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8AA293]">
            m
          </span>
        </div>
      </div>

      {/* ANALYSIS DAY (AFFECTS CROWD DENSITY) */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
          Analysis Day (Affects Crowd Density)
        </label>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setAnalysisDay(day)}
              className={`py-1 text-[11px] font-semibold rounded-md transition-all text-center ${
                analysisDay === day
                  ? 'bg-[#316041] text-white shadow-2xs font-bold'
                  : 'bg-[#F4F7F5] text-[#557060] hover:bg-[#E7EFEA]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* POI SEGMENTS (Matching Pic 1) */}
      <div className="space-y-2 pt-2 border-t border-[#E8F0EA]">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
            PoI Segments ({selectedCategoryIds.length}/{POI_CATEGORIES.length})
          </label>
          <button
            onClick={handleSelectAll}
            className="text-[11px] font-bold text-[#2A5739] hover:underline"
          >
            {selectedCategoryIds.length === POI_CATEGORIES.length ? 'DESELECT' : 'SELECT ALL'}
          </button>
        </div>

        {/* 12 POI Segment buttons matching exact image */}
        <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
          {POI_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center gap-2 p-1.5 rounded-lg text-left text-xs transition-all border ${
                  isSelected
                    ? 'bg-[#316041] text-white border-[#244931] shadow-2xs'
                    : 'bg-[#F8FAF8] text-[#365040] border-[#E2ECE5] hover:bg-[#EFF5F0]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-[#FDF299]' : 'bg-[#EAF2EC] text-[#2F5E3E]'
                  }`}
                >
                  {POI_ICONS[cat.id] || <BookOpen className="w-3.5 h-3.5" />}
                </div>
                <div className="truncate">
                  <div className="font-semibold truncate text-[11px]">{cat.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ROUTE OPTIMIZATION SECTION (Exact match to Pic 1) */}
      <div className="space-y-2.5 pt-3 border-t border-[#E8F0EA]">
        <div className="flex items-center gap-2 text-[#2A5739] font-bold text-xs">
          <GitBranch className="w-4 h-4 text-[#C4951B]" />
          <span>Route Optimization</span>
        </div>
        <p className="text-[11px] text-[#557161] leading-relaxed">
          Optimize travel routes for {pois.length} identified points of interest around the Sparks
          Center.
        </p>

        {/* Regenerate Schedules Button */}
        <button
          onClick={onRegenerateRoute}
          className="w-full py-2 px-3 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FDF099]" />
          <span>Regenerate Schedules</span>
        </button>

        {/* ACTIVE ROUTE TABS */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A7766]">
            Active Route
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F1F6F2] rounded-lg border border-[#DCE8DE]">
            <button
              onClick={() => setActiveConsultant('A')}
              className={`py-1 text-[11px] font-bold rounded-md transition-all text-center ${
                activeConsultant === 'A'
                  ? 'bg-white text-[#214930] shadow-xs'
                  : 'text-[#587363] hover:text-[#183322]'
              }`}
            >
              CONSULTANT A
            </button>
            <button
              onClick={() => setActiveConsultant('B')}
              className={`py-1 text-[11px] font-bold rounded-md transition-all text-center ${
                activeConsultant === 'B'
                  ? 'bg-white text-[#214930] shadow-xs'
                  : 'text-[#587363] hover:text-[#183322]'
              }`}
            >
              CONSULTANT B
            </button>
          </div>
        </div>

        {/* COPY GMAPS ROUTE & OPEN IN GMAPS (Matches user prompt & Pic 2) */}
        <div className="space-y-1.5 pt-1">
          <button
            onClick={onCopyGmapsRoute}
            className="w-full py-2 px-3 text-xs font-bold text-[#2A5939] bg-[#EFF6F1] hover:bg-[#E2EFE6] border border-[#CBDED0] rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            {copiedGmaps ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied GMaps Link!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C4951B]" />
                <span>Copy GMaps Route</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenGmapsRoute}
            className="w-full py-2 px-3 text-xs font-bold text-white bg-[#D4A017] hover:bg-[#BE8E10] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps (Pic 2)</span>
          </button>
        </div>

        {/* Link: View Full Schedule Details */}
        <div className="text-center pt-1">
          <button
            onClick={onViewScheduleDetails}
            className="text-[11px] font-bold text-[#306041] hover:underline"
          >
            View Full Schedule Details
          </button>
        </div>
      </div>
    </aside>
  );
};
