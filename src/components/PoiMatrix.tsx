import React, { useState } from 'react';
import { POI_CATEGORIES } from '../data/poiData';
import { PoICategory } from '../types';
import { Search, LayoutGrid, List, ArrowUpRight, Target, Clock, Sparkles } from 'lucide-react';

interface PoiMatrixProps {
  onSelectCategory: (poi: PoICategory) => void;
  onOpenAiPlanner: (categoryId?: number) => void;
}

export const PoiMatrix: React.FC<PoiMatrixProps> = ({
  onSelectCategory,
  onOpenAiPlanner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | 'Primary' | 'Secondary' | 'Extended'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredPois = POI_CATEGORIES.filter((poi) => {
    const matchesSearch =
      poi.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.poiToTapIn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.strategicObjective.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier =
      tierFilter === 'All' ||
      (tierFilter === 'Primary' && poi.catchmentTier.startsWith('Primary')) ||
      (tierFilter === 'Secondary' && poi.catchmentTier.startsWith('Secondary')) ||
      (tierFilter === 'Extended' && poi.catchmentTier.startsWith('Extended'));

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Editorial Hero Intro Section with Soft Green & Soft Yellow Nuance */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EEF6F0] via-[#F4F9F2] to-[#FEFAF0] border border-[#DCE9DF] p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5E3E]">
            <span>Sparks EC Expansion Playbook</span>
            <span aria-hidden="true">·</span>
            <span>12 Strategic PoI Categories</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#845E0E]">Offline Catchment Dominance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173020] tracking-tight">
            Point of Interest (PoI) Offline Activation Matrix
          </h1>
          <p className="text-sm text-[#465E4F] leading-relaxed">
            Systematic blueprint for Sparks Early Childhood & Enrichment Centers to identify,
            approach, and activate hyper-local high-intent family hubs within 0–10 km radii.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#3E5748]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#35754C]"></span>
              <span>12 Dedicated Target Channels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4A224]"></span>
              <span>0–2 km Primary Core Density</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#528C65]"></span>
              <span>Multi-Touchpoint Conversion Funnel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search, Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#DFECE2] shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#7A9684] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PoI categories, targets (Kumon, Daycare, Mall)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7FAF8] border border-[#DEEBE1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white text-[#21382A] placeholder-[#80998B]"
          />
        </div>

        {/* Catchment Tier Filter (Segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F6F2] rounded-lg border border-[#DCE8DE] self-start sm:self-auto overflow-x-auto">
          {(['All', 'Primary', 'Secondary', 'Extended'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                tierFilter === tier
                  ? 'bg-white text-[#20482F] shadow-xs border border-[#D3E3D7]'
                  : 'text-[#587363] hover:text-[#183322]'
              }`}
            >
              {tier === 'All' ? 'All Tiers (12)' : tier}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F6F2] rounded-lg border border-[#DCE8DE] shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-[#224A30] shadow-xs'
                : 'text-[#617D6C] hover:text-[#1A3323]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-white text-[#224A30] shadow-xs'
                : 'text-[#617D6C] hover:text-[#1A3323]'
            }`}
            title="Table View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPois.map((poi) => (
            <div
              key={poi.id}
              onClick={() => onSelectCategory(poi)}
              className="group relative bg-white rounded-xl border border-[#DFEBE2] hover:border-[#BED6C5] p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Clean unboxed metadata header */}
                <div className="flex items-center justify-between text-xs text-[#52705E]">
                  <span className="font-bold text-[#356B49]">0{poi.id}.</span>
                  <div className="flex items-center gap-2">
                    <span>{poi.catchmentTier}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#845E0E]">{poi.impactScore} Impact</span>
                  </div>
                </div>

                {/* Primary Category Title */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#183121] group-hover:text-[#2A5E3B] transition-colors tracking-tight">
                    {poi.category}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#8BA495] group-hover:text-[#2A5E3B] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* PoI to Tap In - Prominently highlighted */}
                <div className="p-3 bg-[#F6F9F6] rounded-xl border border-[#E3ECE6] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#356B48]">
                    PoI to Tap In:
                  </div>
                  <p className="text-xs font-semibold text-[#1C3625] leading-relaxed">
                    {poi.poiToTapIn}
                  </p>
                </div>

                {/* Strategic Objective Snippet */}
                <p className="text-xs text-[#445D4E] line-clamp-2 leading-relaxed">
                  {poi.strategicObjective}
                </p>
              </div>

              {/* Card Footer with Quick Tactics Preview & Action */}
              <div className="pt-4 mt-4 border-t border-[#EAF0EB] flex items-center justify-between text-xs">
                <span className="text-[#648070] text-[11px]">
                  {poi.activationTactics.length} Tactics Ready
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAiPlanner(poi.id);
                  }}
                  className="flex items-center gap-1 text-[#2B5D3C] hover:text-[#183A24] font-semibold text-xs"
                >
                  <Sparkles className="w-3 h-3 text-[#C4951B]" />
                  <span>Plan AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-[#DFEBE2] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F3F7F4] border-b border-[#DFEBE2] text-[11px] font-bold text-[#30523C] uppercase tracking-wider">
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4 min-w-[220px]">PoI Category</th>
                  <th className="py-3 px-4 min-w-[320px]">PoI to Tap In</th>
                  <th className="py-3 px-4 min-w-[140px]">Catchment Tier</th>
                  <th className="py-3 px-4 min-w-[120px]">Impact</th>
                  <th className="py-3 px-4 text-right pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBF2ED] text-xs">
                {filteredPois.map((poi) => (
                  <tr
                    key={poi.id}
                    onClick={() => onSelectCategory(poi)}
                    className="hover:bg-[#F9FCFA] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-[#587363] tabular-nums">
                      0{poi.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#193322]">
                      {poi.category}
                    </td>
                    <td className="py-3 px-4 text-[#2A4434] font-medium">
                      {poi.poiToTapIn}
                    </td>
                    <td className="py-3 px-4 text-[#4A6454]">
                      {poi.catchmentTier}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#845E0E] font-semibold">
                        {poi.impactScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCategory(poi);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#EFF6F1] text-[#295939] hover:bg-[#DDEEE1] transition-colors"
                      >
                        Explore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPois.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#DFEBE2] space-y-3">
          <p className="text-sm font-semibold text-[#254130]">No PoI categories matched your query</p>
          <p className="text-xs text-[#637D6E]">Try adjusting your search terms or selecting "All Tiers".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setTierFilter('All');
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#306041] rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
