import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Globe,
  Compass,
  FileText,
  Calculator,
  MessageSquare,
  BookOpen,
  X,
  ExternalLink,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { StrategyGenerator } from './components/StrategyGenerator';
import { CatchmentCalculator } from './components/CatchmentCalculator';
import { PitchHub } from './components/PitchHub';
import { PoiDetailModal } from './components/PoiDetailModal';
import { POI_CATEGORIES } from './data/poiData';
import {
  PRESET_SPARKS_CENTERS,
  SparksCenterLocation,
  MapPoiItem,
  getPoisForCenter,
} from './data/sparksLocations';
import { PoICategory, PartnerVenue } from './types';

export default function App() {
  // Center & Search State
  const [center, setCenter] = useState<SparksCenterLocation>(PRESET_SPARKS_CENTERS[0]);
  const [searchAddress, setSearchAddress] = useState('https://maps.app.goo.gl/qS7... (Alam Sutera, Tangerang)');
  const [latitude, setLatitude] = useState('-6.22917780268102');
  const [longitude, setLongitude] = useState('106.6339140117745');
  const [radiusMeters, setRadiusMeters] = useState<number>(5000); // 5-7 km radius as requested
  const [analysisDay, setAnalysisDay] = useState<string>('Thu');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  // Active Consultant / Team Route
  const [activeConsultant, setActiveConsultant] = useState<'A' | 'B'>('A');

  // App interaction mode
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [activeOverlayModal, setActiveOverlayModal] = useState<
    'none' | 'aiPlanner' | 'calculator' | 'pitch' | 'poiMatrix'
  >('none');

  // PoI and Route Selection
  const [pois, setPois] = useState<MapPoiItem[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<MapPoiItem | null>(null);
  const [routePoiIds, setRoutePoiIds] = useState<string[]>([]);
  const [detailPoiCategory, setDetailPoiCategory] = useState<PoICategory | null>(null);
  const [copiedGmaps, setCopiedGmaps] = useState<boolean>(false);

  // Compute POIs whenever center, radius, or selected categories change
  useEffect(() => {
    if (isInitialized) {
      const generatedPois = getPoisForCenter(
        center.lat,
        center.lng,
        radiusMeters,
        selectedCategoryIds
      );
      setPois(generatedPois);

      if (generatedPois.length > 0 && !selectedPoi) {
        setSelectedPoi(generatedPois[0]);
      }
    }
  }, [center, radiusMeters, selectedCategoryIds, isInitialized]);

  // Build the Google Maps multi-stop Route URL (as in Pic 2!)
  const getConsultantStops = () => {
    const half = Math.ceil(pois.length / 2);
    return activeConsultant === 'A' ? pois.slice(0, half) : pois.slice(half);
  };

  const currentStops = getConsultantStops();

  // Multi-stop Google Maps URL format:
  // https://www.google.com/maps/dir/OriginLat,OriginLng/Stop1Lat,Stop1Lng/.../OriginLat,OriginLng
  const gmapsRouteUrl =
    currentStops.length > 0
      ? `https://www.google.com/maps/dir/${center.lat},${center.lng}/${currentStops
          .map((s) => `${s.lat},${s.lng}`)
          .join('/')}/${center.lat},${center.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;

  // Copy Google Maps link handler
  const handleCopyGmapsRoute = () => {
    navigator.clipboard.writeText(gmapsRouteUrl);
    setCopiedGmaps(true);
    setTimeout(() => setCopiedGmaps(false), 2500);
  };

  // Open Google Maps link handler (opens Pic 2 directly in browser)
  const handleOpenGmapsRoute = () => {
    window.open(gmapsRouteUrl, '_blank');
  };

  // Handler: "Try Sample Data"
  const handleTrySampleData = () => {
    const defaultCenter = PRESET_SPARKS_CENTERS[0];
    setCenter(defaultCenter);
    setLatitude(defaultCenter.lat.toString());
    setLongitude(defaultCenter.lng.toString());
    setSearchAddress(defaultCenter.address);
    setIsInitialized(true);

    const generated = getPoisForCenter(
      defaultCenter.lat,
      defaultCenter.lng,
      radiusMeters,
      selectedCategoryIds
    );
    setPois(generated);
    if (generated.length > 0) {
      setSelectedPoi(generated[0]);
      setRoutePoiIds([generated[0].id, generated[1]?.id || '', generated[2]?.id || ''].filter(Boolean));
    }
  };

  // Handler: "Search Sparks Center" / "Find" button
  const handleFindAddress = () => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (!isNaN(latNum) && !isNaN(lngNum)) {
      const newCenter: SparksCenterLocation = {
        id: `center-${Date.now()}`,
        name: searchAddress.includes('http') ? 'Sparks Center — Custom Location' : searchAddress || 'Sparks Center',
        address: searchAddress.includes('http') ? `Coordinates: ${latNum.toFixed(4)}, ${lngNum.toFixed(4)}` : searchAddress,
        lat: latNum,
        lng: lngNum,
        city: 'Jabodetabek',
        description: 'Target Sparks Early Childhood & Enrichment Center',
      };
      setCenter(newCenter);
      setIsInitialized(true);
      return;
    }

    const foundPreset = PRESET_SPARKS_CENTERS.find(
      (p) =>
        searchAddress.toLowerCase().includes(p.city.toLowerCase()) ||
        searchAddress.toLowerCase().includes(p.name.toLowerCase())
    );

    const targetCenter = foundPreset || PRESET_SPARKS_CENTERS[0];
    setCenter(targetCenter);
    setLatitude(targetCenter.lat.toString());
    setLongitude(targetCenter.lng.toString());
    setIsInitialized(true);
  };

  // Handler: "Use My Current Location"
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat.toFixed(6));
          setLongitude(lng.toFixed(6));
          setSearchAddress(`Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          setCenter({
            id: 'current-gps',
            name: 'Sparks Center (Current GPS Location)',
            address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            lat,
            lng,
            city: 'Local Area',
            description: 'GPS Located Sparks Center',
          });
          setIsInitialized(true);
        },
        () => {
          handleTrySampleData();
        }
      );
    } else {
      handleTrySampleData();
    }
  };

  const handleToggleRoutePoi = (poiId: string) => {
    setRoutePoiIds((prev) =>
      prev.includes(poiId) ? prev.filter((id) => id !== poiId) : [...prev, poiId]
    );
  };

  const handleRegenerateRoute = () => {
    // Shuffle or re-sequence stops
    if (pois.length > 0) {
      const shuffled = [...pois].sort(() => 0.5 - Math.random());
      setPois(shuffled);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#1E2E24] flex flex-col selection:bg-[#D5EADB] selection:text-[#183622]">
      {/* Top Header Bar mirroring the original screen with Soft Green & Yellow Brand */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#DCE8DE] px-4 sm:px-6 py-2.5">
        <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#316041] to-[#20452E] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#FDF099]" />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#173020] tracking-tight flex items-center gap-2">
                <span>Sparks EC Strategy Tool</span>
                <span className="text-[10px] font-bold text-[#865E0C] bg-[#FEF6DC] px-2 py-0.5 rounded border border-[#F4E1A3] hidden sm:inline-block">
                  Radius 5–7 km
                </span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#63806F]">
                Early Childhood Sales & Expansion Strategy Tool
              </div>
            </div>
          </div>

          {/* Quick Strategy Links & Global Coverage Indicator Right */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs">
            <button
              onClick={() => setActiveOverlayModal('aiPlanner')}
              className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#295637] hover:bg-[#EFF6F1] rounded-lg border border-[#D5E5DA] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C4951B]" />
              <span className="hidden sm:inline">AI Location Planner</span>
            </button>

            <button
              onClick={() => setActiveOverlayModal('calculator')}
              className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#295637] hover:bg-[#EFF6F1] rounded-lg border border-[#D5E5DA] transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Catchment Economics</span>
            </button>

            <button
              onClick={() => setActiveOverlayModal('pitch')}
              className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#295637] hover:bg-[#EFF6F1] rounded-lg border border-[#D5E5DA] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pitch & Scripts</span>
            </button>

            <div className="h-5 w-[1px] bg-[#E3EDE5] hidden sm:block"></div>

            {/* Global Coverage indicator from original screenshot */}
            <div className="flex items-center gap-1.5 text-xs text-[#52705E] px-2 py-1 rounded-md bg-[#F4F8F5] border border-[#DEEBE1]">
              <Globe className="w-3.5 h-3.5 text-[#356B48]" />
              <span className="hidden lg:inline font-medium">Global Coverage</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout (Exact Layout of the Screenshot!) */}
      <div className="flex-1 max-w-[1680px] w-full mx-auto p-4 sm:p-5 flex flex-col lg:flex-row gap-5">
        {/* Left Column: Sidebar */}
        <Sidebar
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          radiusMeters={radiusMeters}
          setRadiusMeters={setRadiusMeters}
          analysisDay={analysisDay}
          setAnalysisDay={setAnalysisDay}
          selectedCategoryIds={selectedCategoryIds}
          setSelectedCategoryIds={setSelectedCategoryIds}
          onFindAddress={handleFindAddress}
          onUseCurrentLocation={handleUseCurrentLocation}
          pois={pois}
          center={center}
          activeConsultant={activeConsultant}
          setActiveConsultant={setActiveConsultant}
          onRegenerateRoute={handleRegenerateRoute}
          onViewScheduleDetails={() => {}}
          onOpenGmapsRoute={handleOpenGmapsRoute}
          onCopyGmapsRoute={handleCopyGmapsRoute}
          copiedGmaps={copiedGmaps}
        />

        {/* Right Column: Main Workspace */}
        <MainWorkspace
          isInitialized={isInitialized}
          onTrySampleData={handleTrySampleData}
          onSearchCenter={handleFindAddress}
          center={center}
          radiusMeters={radiusMeters}
          analysisDay={analysisDay}
          pois={pois}
          selectedPoi={selectedPoi}
          onSelectPoi={(p) => setSelectedPoi(p)}
          routePoiIds={routePoiIds}
          onToggleRoutePoi={handleToggleRoutePoi}
          activeConsultant={activeConsultant}
          setActiveConsultant={setActiveConsultant}
          onOpenGmapsRoute={handleOpenGmapsRoute}
          onCopyGmapsRoute={handleCopyGmapsRoute}
          copiedGmaps={copiedGmaps}
          gmapsRouteUrl={gmapsRouteUrl}
        />
      </div>

      {/* Modals for Extra Strategic Tools */}
      {/* 1. AI Strategy Generator Modal */}
      {activeOverlayModal === 'aiPlanner' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-xl border border-[#DFEBE2] overflow-hidden p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEF4EF] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C4951B]" />
                <h3 className="text-lg font-bold text-[#183120]">
                  Sparks EC AI Location & Campaign Planner (Gemini 3.8 Flash)
                </h3>
              </div>
              <button
                onClick={() => setActiveOverlayModal('none')}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <StrategyGenerator
              initialCategoryId={selectedPoi ? selectedPoi.categoryId : 1}
              onAddVenuesToPipeline={() => {
                setActiveOverlayModal('none');
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Catchment Calculator Modal */}
      {activeOverlayModal === 'calculator' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-xl border border-[#DFEBE2] overflow-hidden p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEF4EF] mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#356B48]" />
                <h3 className="text-lg font-bold text-[#183120]">
                  Sparks EC Catchment & Revenue Projection Calculator
                </h3>
              </div>
              <button
                onClick={() => setActiveOverlayModal('none')}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <CatchmentCalculator />
          </div>
        </div>
      )}

      {/* 3. Pitch & Script Hub Modal */}
      {activeOverlayModal === 'pitch' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-xl border border-[#DFEBE2] overflow-hidden p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEF4EF] mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#356B48]" />
                <h3 className="text-lg font-bold text-[#183120]">
                  Outreach Pitch & Script Hub for All 12 PoIs
                </h3>
              </div>
              <button
                onClick={() => setActiveOverlayModal('none')}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <PitchHub />
          </div>
        </div>
      )}

      {/* 4. Detail modal for PoI category playbook */}
      {detailPoiCategory && (
        <PoiDetailModal
          poi={detailPoiCategory}
          onClose={() => setDetailPoiCategory(null)}
          onSelectForStrategy={() => {
            setDetailPoiCategory(null);
            setActiveOverlayModal('aiPlanner');
          }}
        />
      )}
    </div>
  );
}
