import React from 'react';
import { Compass, Sparkles, MapPin, Users, Calculator, MessageSquare, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'matrix' | 'generator' | 'pipeline' | 'calculator' | 'pitch';
  setActiveTab: (tab: 'matrix' | 'generator' | 'pipeline' | 'calculator' | 'pitch') => void;
  onOpenAddPartner: () => void;
  partnerCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddPartner,
  partnerCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E3ECE5] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (Single text element wordmark in Cabinet Grotesk / display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#417553] to-[#2B563B] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-[#FDF099]" />
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('matrix');
              }}
              className="text-lg font-bold tracking-tight text-[#1A3323] hover:text-[#2E5B3E] transition-colors"
            >
              Sparks EC Strategy
            </a>
            <p className="text-[11px] text-[#698272] hidden sm:block">
              Point of Interest (PoI) & Hyper-Local Marketing Engine
            </p>
          </div>
        </div>

        {/* Zone 2: 4-6 Clean navigation tabs (single-line, text with active state indicator) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#F2F7F3] p-1 rounded-xl border border-[#DFEBE2]">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-white text-[#224A30] shadow-xs border border-[#D5E5DA]'
                : 'text-[#587362] hover:text-[#1A3323] hover:bg-white/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#3D7852]" />
            PoI Matrix (12)
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-white text-[#224A30] shadow-xs border border-[#D5E5DA]'
                : 'text-[#587362] hover:text-[#1A3323] hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4951B]" />
            AI Strategy Planner
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'bg-white text-[#224A30] shadow-xs border border-[#D5E5DA]'
                : 'text-[#587362] hover:text-[#1A3323] hover:bg-white/60'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#3D7852]" />
            Partner Pipeline
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#E8F3EB] text-[#2C573A] font-medium tabular-nums">
              {partnerCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-white text-[#224A30] shadow-xs border border-[#D5E5DA]'
                : 'text-[#587362] hover:text-[#1A3323] hover:bg-white/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#3D7852]" />
            Catchment Calculator
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pitch'
                ? 'bg-white text-[#224A30] shadow-xs border border-[#D5E5DA]'
                : 'text-[#587362] hover:text-[#1A3323] hover:bg-white/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#3D7852]" />
            Pitch & Scripts
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddPartner}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#336344] hover:bg-[#285036] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Venue</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="flex md:hidden overflow-x-auto gap-1 pt-2.5 pb-0.5 scrollbar-none">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'matrix' ? 'bg-[#336344] text-white' : 'bg-[#EBF2ED] text-[#33533E]'
          }`}
        >
          PoI Matrix
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'generator' ? 'bg-[#336344] text-white' : 'bg-[#EBF2ED] text-[#33533E]'
          }`}
        >
          AI Strategy
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'pipeline' ? 'bg-[#336344] text-white' : 'bg-[#EBF2ED] text-[#33533E]'
          }`}
        >
          Pipeline ({partnerCount})
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'calculator' ? 'bg-[#336344] text-white' : 'bg-[#EBF2ED] text-[#33533E]'
          }`}
        >
          Catchment
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'pitch' ? 'bg-[#336344] text-white' : 'bg-[#EBF2ED] text-[#33533E]'
          }`}
        >
          Pitch & Scripts
        </button>
      </div>
    </header>
  );
};
