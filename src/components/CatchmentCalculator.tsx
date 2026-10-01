import React, { useState } from 'react';
import { Calculator, Target, TrendingUp, Users, DollarSign, Compass, Info } from 'lucide-react';

export const CatchmentCalculator: React.FC = () => {
  // Input parameters
  const [partnerCount, setPartnerCount] = useState<number>(10);
  const [avgFootfall, setAvgFootfall] = useState<number>(350);
  const [tapInRate, setTapInRate] = useState<number>(5.0); // % of footfall who take flyer / scan QR
  const [trialConvRate, setTrialConvRate] = useState<number>(45.0); // % of leads who book & attend trial
  const [enrollConvRate, setEnrollConvRate] = useState<number>(38.0); // % of trials who enroll
  const [tuitionFee, setTuitionFee] = useState<number>(1800000); // IDR per month
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState<number>(18000000); // IDR

  // Computations (Monthly = 4 weeks)
  const monthlyTotalFootfall = partnerCount * avgFootfall * 4;
  const monthlyLeads = Math.round((monthlyTotalFootfall * (tapInRate / 100)));
  const monthlyTrials = Math.round((monthlyLeads * (trialConvRate / 100)));
  const monthlyEnrolments = Math.round((monthlyTrials * (enrollConvRate / 100)));
  const monthlyNewMRR = monthlyEnrolments * tuitionFee;
  const estimatedCAC = monthlyEnrolments > 0 ? Math.round(monthlyMarketingSpend / monthlyEnrolments) : 0;
  const costPerLead = monthlyLeads > 0 ? Math.round(monthlyMarketingSpend / monthlyLeads) : 0;

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="bg-gradient-to-r from-[#EEF6F0] via-[#F7FAF4] to-[#FFFDF5] rounded-2xl border border-[#DFEBE3] p-6 sm:p-8">
        <div className="max-w-3xl space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2C5F3E]">
            <Calculator className="w-3.5 h-3.5 text-[#356B48]" />
            <span>Sparks EC Financial & Growth Modeling</span>
            <span aria-hidden="true">·</span>
            <span>Hyper-Local Radius Economics</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#173020] tracking-tight">
            Catchment Radius & Lead Projection Calculator
          </h2>
          <p className="text-sm text-[#496353] leading-relaxed">
            Model the exact relationship between offline PoI partner volume, footfall tap-in rates,
            and resulting student enrolments and tuition revenue.
          </p>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders & Parameter Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#DFEBE2] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EEF4EF] pb-3">
            <h3 className="text-sm font-bold text-[#193322]">
              Funnel Variables & Operational Inputs
            </h3>
            <span className="text-[11px] text-[#648171]">
              Simulate 30-Day Campaign Window
            </span>
          </div>

          {/* Slider 1: Active Partner Venues */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F3929]">
                Active PoI Partner Venues (Across 12 Categories)
              </label>
              <span className="font-bold text-[#2A5E3C] font-mono tabular-nums bg-[#EFF6F1] px-2.5 py-0.5 rounded-md border border-[#D5E5DA]">
                {partnerCount} Venues
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="1"
              value={partnerCount}
              onChange={(e) => setPartnerCount(Number(e.target.value))}
              className="w-full accent-[#306041] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A9686]">
              <span>2 Pilot Venues</span>
              <span>15 Moderate Network</span>
              <span>35 High-Density Dominance</span>
            </div>
          </div>

          {/* Slider 2: Average Weekly Footfall per Partner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F3929]">
                Avg. Weekly Family Footfall per Venue
              </label>
              <span className="font-bold text-[#2A5E3C] font-mono tabular-nums bg-[#EFF6F1] px-2.5 py-0.5 rounded-md border border-[#D5E5DA]">
                {avgFootfall.toLocaleString('id-ID')} Families / wk
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={avgFootfall}
              onChange={(e) => setAvgFootfall(Number(e.target.value))}
              className="w-full accent-[#306041] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A9686]">
              <span>100 (Boutique Studio)</span>
              <span>600 (Preschool / Clinic)</span>
              <span>1,500 (Mall Hub)</span>
            </div>
          </div>

          {/* Slider 3: Tap-In Rate % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F3929]">
                Tap-In Lead Capture Rate (Flyer take-up / QR Scan)
              </label>
              <span className="font-bold text-[#2A5E3C] font-mono tabular-nums bg-[#EFF6F1] px-2.5 py-0.5 rounded-md border border-[#D5E5DA]">
                {tapInRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={tapInRate}
              onChange={(e) => setTapInRate(Number(e.target.value))}
              className="w-full accent-[#306041] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A9686]">
              <span>1% (Passive Standee)</span>
              <span>5% (Bag Insert / Frontliner Reco)</span>
              <span>15% (Interactive Pop-Up)</span>
            </div>
          </div>

          {/* Slider 4: Trial Booking Conversion % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F3929]">
                Lead to Trial Booking Conversion
              </label>
              <span className="font-bold text-[#2A5E3C] font-mono tabular-nums bg-[#EFF6F1] px-2.5 py-0.5 rounded-md border border-[#D5E5DA]">
                {trialConvRate.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              step="5"
              value={trialConvRate}
              onChange={(e) => setTrialConvRate(Number(e.target.value))}
              className="w-full accent-[#306041] cursor-pointer"
            />
          </div>

          {/* Slider 5: Trial to Enrolment Conversion % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F3929]">
                Trial Session to Paid Enrolment Rate
              </label>
              <span className="font-bold text-[#865E0C] font-mono tabular-nums bg-[#FEF6DC] px-2.5 py-0.5 rounded-md border border-[#F4E1A3]">
                {enrollConvRate.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="70"
              step="5"
              value={enrollConvRate}
              onChange={(e) => setEnrollConvRate(Number(e.target.value))}
              className="w-full accent-[#306041] cursor-pointer"
            />
          </div>

          {/* Fee & Marketing Spend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#EEF4EF]">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F3929]">
                Sparks EC Monthly Tuition (IDR)
              </label>
              <input
                type="number"
                step="100000"
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1F3728] font-mono tabular-nums"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F3929]">
                Monthly Offline Marketing Budget (IDR)
              </label>
              <input
                type="number"
                step="1000000"
                value={monthlyMarketingSpend}
                onChange={(e) => setMonthlyMarketingSpend(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1F3728] font-mono tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Projections & Funnel Flow (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Enrolment & Revenue Highlight */}
          <div className="bg-gradient-to-br from-[#2D5A3C] to-[#1E3F29] text-white p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D5EBDC]">
                30-Day Projected Enrolments
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[#FDF3A9] mt-1">
                {monthlyEnrolments} Students
              </div>
              <p className="text-xs text-[#D8EADB] mt-1">
                Converted through {partnerCount} active local PoI touchpoints
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-[#B9D9C2] text-[11px]">Monthly Tuition Addition</div>
                <div className="text-sm font-bold font-mono tabular-nums mt-0.5">
                  Rp {(monthlyNewMRR / 1000000).toFixed(1)}M / bln
                </div>
              </div>

              <div>
                <div className="text-[#B9D9C2] text-[11px]">Blended CAC per Student</div>
                <div className="text-sm font-bold font-mono tabular-nums mt-0.5">
                  Rp {estimatedCAC.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>

          {/* Waterfall Funnel Breakdown */}
          <div className="bg-white rounded-xl border border-[#DFEBE2] p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E603F]">
              Funnel Conversion Breakdown
            </h4>

            <div className="space-y-2 text-xs">
              {/* Stage 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAF8] border border-[#E5EFE7]">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#1F3929]">Total Catchment Footfall</div>
                  <div className="text-[10px] text-[#698575]">4-week traffic across venues</div>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#1F3929]">
                  {monthlyTotalFootfall.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Stage 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4F9F5] border border-[#DEEBE1]">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#235033]">Verified Parent Leads</div>
                  <div className="text-[10px] text-[#698575]">{tapInRate}% tap-in capture</div>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#235033]">
                  {monthlyLeads.toLocaleString('id-ID')} leads
                </span>
              </div>

              {/* Stage 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FEFBF2] border border-[#F4E6C3]">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#875F0E]">Completed Trial Sessions</div>
                  <div className="text-[10px] text-[#8C7646]">{trialConvRate}% show-up rate</div>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#875F0E]">
                  {monthlyTrials.toLocaleString('id-ID')} trials
                </span>
              </div>

              {/* Stage 4 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#EAF5ED] border border-[#C5E3CE]">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#1E4E2D]">Active Enrolments</div>
                  <div className="text-[10px] text-[#476C54]">{enrollConvRate}% close rate</div>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#1E4E2D]">
                  {monthlyEnrolments} enrolments
                </span>
              </div>
            </div>

            {/* Cost Efficiency Note */}
            <div className="pt-2 text-[11px] text-[#557161] flex items-center justify-between border-t border-[#EEF4EF]">
              <span>Cost per Qualified Lead:</span>
              <span className="font-mono tabular-nums font-bold text-[#265335]">
                Rp {costPerLead.toLocaleString('id-ID')} / lead
              </span>
            </div>
          </div>

          {/* Catchment Radius Rule of Thumb */}
          <div className="p-4 bg-[#F7FAF8] rounded-xl border border-[#DCE8DF] text-xs space-y-2">
            <div className="font-bold text-[#275336] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#356B48]" />
              Catchment Radius Distribution Rule
            </div>
            <div className="space-y-1 text-[11px] text-[#4B6656] leading-relaxed">
              <div className="flex justify-between">
                <span>• Primary (0–2 km): Kumon, Preschool, Residential</span>
                <span className="font-bold text-[#1F432A]">~60% Enrolments</span>
              </div>
              <div className="flex justify-between">
                <span>• Secondary (2–5 km): Playgrounds, Baby Stores, F&B</span>
                <span className="font-bold text-[#1F432A]">~30% Enrolments</span>
              </div>
              <div className="flex justify-between">
                <span>• Extended (5–10 km): Malls, Kids Events, Mom Groups</span>
                <span className="font-bold text-[#1F432A]">~10% Enrolments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
