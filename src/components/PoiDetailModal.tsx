import React, { useState } from 'react';
import { PoICategory } from '../types';
import { X, Copy, Check, MessageSquare, Mail, Target, Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface PoiDetailModalProps {
  poi: PoICategory | null;
  onClose: () => void;
  onSelectForStrategy: (poiId: number) => void;
}

export const PoiDetailModal: React.FC<PoiDetailModalProps> = ({
  poi,
  onClose,
  onSelectForStrategy,
}) => {
  const [copiedWA, setCopiedWA] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!poi) return null;

  const handleCopyWA = () => {
    navigator.clipboard.writeText(poi.samplePitchScriptWA);
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(poi.samplePitchEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-xl border border-[#DFEAE2] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#F3F8F4] to-[#FAF8ED] border-b border-[#E1ECE3] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D714F]">
                <span>Category #{poi.id}</span>
                <span aria-hidden="true">·</span>
                <span>{poi.catchmentTier}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#886214] bg-[#FEF6D9] px-2 py-0.5 rounded-md border border-[#F3DF9C]">
                  Impact: {poi.impactScore}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#193222] tracking-tight">
                {poi.category}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#617B6A] hover:text-[#183121] hover:bg-white/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PoI to Tap In highlighted banner */}
          <div className="mt-4 p-3.5 bg-white/95 rounded-xl border border-[#D8E6DC] shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#356747] mb-1">
              PoI to Tap In (Primary Targets):
            </div>
            <p className="text-sm font-medium text-[#203628] leading-relaxed">
              {poi.poiToTapIn}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Quick Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#E3ECE6] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#335F42]">
                <Target className="w-3.5 h-3.5 text-[#3D7852]" />
                Target Audience Persona
              </div>
              <p className="text-[#3E5246] leading-relaxed">{poi.targetAudience}</p>
            </div>

            <div className="p-3 bg-[#FCFAF2] rounded-xl border border-[#EFE8D1] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#825C11]">
                <Clock className="w-3.5 h-3.5 text-[#C4951B]" />
                Optimal Operating Peak Hours
              </div>
              <p className="text-[#594A2A] leading-relaxed">{poi.peakHours}</p>
            </div>
          </div>

          {/* Strategic Objective */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3B27] mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#C4951B]" />
              Strategic Objective for Sparks EC
            </h3>
            <p className="text-xs sm:text-sm text-[#3C5244] bg-[#F4F8F5] p-3.5 rounded-xl border border-[#DCE8DF] leading-relaxed">
              {poi.strategicObjective}
            </p>
          </div>

          {/* Activation Tactics */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3B27] mb-2.5">
              Recommended Activation Tactics & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {poi.activationTactics.map((tactic, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#DFECE2] text-xs text-[#283E30]"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#E8F3EB] text-[#295537] font-bold text-[10px] shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{tactic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3B27] mb-2.5">
              4-Stage Conversion Funnel Flow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-xl bg-[#F6F9F6] border border-[#DEE9E0] text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#3D714F]">
                  1. Awareness
                </div>
                <p className="text-[#364A3D] text-[11px] leading-snug">
                  {poi.conversionFunnel.awareness}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F6F9F6] border border-[#DEE9E0] text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#3D714F]">
                  2. Consideration
                </div>
                <p className="text-[#364A3D] text-[11px] leading-snug">
                  {poi.conversionFunnel.consideration}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEFBF2] border border-[#F3E7C4] text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A6313]">
                  3. Trial Booking
                </div>
                <p className="text-[#4E3E1C] text-[11px] leading-snug">
                  {poi.conversionFunnel.trialBooking}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#EBF5ED] border border-[#CDE5D4] text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#265936]">
                  4. Enrolment
                </div>
                <p className="text-[#20402A] text-[11px] leading-snug">
                  {poi.conversionFunnel.enrollment}
                </p>
              </div>
            </div>
          </div>

          {/* Value Proposition for Partner */}
          <div className="p-3.5 bg-gradient-to-r from-[#F8FBF8] to-[#FFFDF7] rounded-xl border border-[#DFEBE1]">
            <div className="text-xs font-bold text-[#2A5438] mb-1">
              B2B Partner Value Proposition (The Win-Win Hook):
            </div>
            <p className="text-xs text-[#41584A] leading-relaxed">
              {poi.valuePropForPartner}
            </p>
          </div>

          {/* Sample Pitch Script (WhatsApp & Email) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E3B27] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#356B48]" />
                Ready-to-Use WhatsApp Outreach Pitch
              </h3>
              <button
                onClick={handleCopyWA}
                className="flex items-center gap-1 text-xs text-[#2A5638] hover:text-[#183622] font-semibold transition-colors"
              >
                {copiedWA ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3.5 bg-[#F6F9F6] rounded-xl border border-[#DCE8E0] text-xs text-[#2B3E31] leading-relaxed font-mono whitespace-pre-wrap">
              {poi.samplePitchScriptWA}
            </div>
          </div>

          {/* Operational Checklist */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3B27] mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3A754E]" />
              Execution & Rollout Checklist
            </h3>
            <div className="space-y-2">
              {poi.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-[#304738] bg-white p-2.5 rounded-lg border border-[#E3EDE5]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#EAF4ED] text-[#2C5B3B] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAFBF9] border-t border-[#E5EFE7] px-6 py-3.5 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#526B5C] hover:text-[#1D3626] rounded-xl hover:bg-[#EFF5F0] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectForStrategy(poi.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all"
          >
            <span>Plan AI Strategy with this PoI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
