import React, { useState } from 'react';
import { PartnerVenue } from '../types';
import { POI_CATEGORIES } from '../data/poiData';
import { Users, Plus, Download, Search, CheckCircle2, ChevronRight, Phone, MapPin, BarChart3, AlertCircle } from 'lucide-react';

interface PartnerPipelineProps {
  venues: PartnerVenue[];
  onUpdateVenueStatus: (id: string, newStatus: PartnerVenue['status']) => void;
  onOpenAddPartner: () => void;
}

export const PartnerPipeline: React.FC<PartnerPipelineProps> = ({
  venues,
  onUpdateVenueStatus,
  onOpenAddPartner,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredVenues = venues.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.locationArea.toLowerCase().includes(search.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || v.categoryName === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || v.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate metrics
  const totalVenues = venues.length;
  const activeVenues = venues.filter((v) => v.status === 'Active Activation').length;
  const totalLeads = venues.reduce((acc, curr) => acc + (curr.leadsGenerated || 0), 0);
  const totalWeeklyFootfall = venues.reduce(
    (acc, curr) => acc + (curr.estimatedWeeklyFootfall || 0),
    0
  );

  const exportCSV = () => {
    const headers = [
      'Name',
      'Category',
      'Location Area',
      'Distance (km)',
      'Contact Person',
      'Contact Channel',
      'Status',
      'Priority',
      'Weekly Footfall',
      'Leads Generated',
      'Agreed Mechanism',
      'Notes',
    ];

    const rows = venues.map((v) => [
      `"${v.name}"`,
      `"${v.categoryName}"`,
      `"${v.locationArea}"`,
      v.distanceKm,
      `"${v.contactPerson}"`,
      `"${v.contactChannel}"`,
      `"${v.status}"`,
      `"${v.priority}"`,
      v.estimatedWeeklyFootfall,
      v.leadsGenerated,
      `"${v.agreedMechanism.replace(/"/g, '""')}"`,
      `"${v.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sparks_ec_poi_partners_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: PartnerVenue['status']) => {
    switch (status) {
      case 'Active Activation':
        return 'text-[#1F5430] bg-[#E8F5EC] border-[#C2E3CD]';
      case 'Agreement Signed':
        return 'text-[#2E5E3D] bg-[#EFF6F1] border-[#D1E6D8]';
      case 'In Discussion':
        return 'text-[#875F0E] bg-[#FEF6DC] border-[#F4E1A3]';
      case 'Contacted':
        return 'text-[#486353] bg-[#F1F6F3] border-[#DBE9E0]';
      case 'Prospect':
        return 'text-[#647F70] bg-[#F7F9F7] border-[#E3ECE6]';
      case 'Completed':
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Overview Header */}
      <div className="bg-gradient-to-r from-[#EEF6F1] via-[#F6FAF4] to-[#FFFDF7] rounded-2xl border border-[#DFEBE3] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2F6140]">
              <Users className="w-3.5 h-3.5 text-[#356B48]" />
              <span>Offline Venue Pipeline CRM</span>
              <span aria-hidden="true">·</span>
              <span>Sparks EC Execution</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#183120] tracking-tight">
              Partner Venues & Activation Pipeline
            </h2>
            <p className="text-sm text-[#4A6454] leading-relaxed max-w-2xl">
              Track outreach, contract sign-offs, weekly flyer/standee deployments, and
              direct trial leads generated across all 12 PoI categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#2B5C3B] bg-white hover:bg-[#F2F7F4] border border-[#D5E5DA] rounded-xl shadow-2xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onOpenAddPartner}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Venue</span>
            </button>
          </div>
        </div>

        {/* 4 Quantitative Scorecards (Tabular figures) */}
        <div className="mt-6 pt-5 border-t border-[#E3ECE6] grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 bg-white/90 rounded-xl border border-[#DFECE2]">
            <div className="text-[11px] text-[#5C7868]">Total Tracked Venues</div>
            <div className="text-xl font-extrabold text-[#173020] font-mono tabular-nums mt-0.5">
              {totalVenues}
            </div>
          </div>

          <div className="p-3.5 bg-white/90 rounded-xl border border-[#DFECE2]">
            <div className="text-[11px] text-[#5C7868]">Active Deployments</div>
            <div className="text-xl font-extrabold text-[#285A37] font-mono tabular-nums mt-0.5">
              {activeVenues}
            </div>
          </div>

          <div className="p-3.5 bg-white/90 rounded-xl border border-[#DFECE2]">
            <div className="text-[11px] text-[#5C7868]">Total Trial Leads Captured</div>
            <div className="text-xl font-extrabold text-[#825C10] font-mono tabular-nums mt-0.5">
              {totalLeads}
            </div>
          </div>

          <div className="p-3.5 bg-white/90 rounded-xl border border-[#DFECE2]">
            <div className="text-[11px] text-[#5C7868]">Weekly Footfall Reach</div>
            <div className="text-xl font-extrabold text-[#1A3423] font-mono tabular-nums mt-0.5">
              {totalWeeklyFootfall.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#DFEBE2] shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#7B9584] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search venue name, location, contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1F3728] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 text-xs bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1F3728] focus:outline-none focus:ring-1 focus:ring-[#3B7750]"
        >
          <option value="All">All Categories (12)</option>
          {POI_CATEGORIES.map((c) => (
            <option key={c.id} value={c.category}>
              {c.category}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 text-xs bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1F3728] focus:outline-none focus:ring-1 focus:ring-[#3B7750]"
        >
          <option value="All">All Statuses</option>
          <option value="Prospect">Prospect</option>
          <option value="Contacted">Contacted</option>
          <option value="In Discussion">In Discussion</option>
          <option value="Agreement Signed">Agreement Signed</option>
          <option value="Active Activation">Active Activation</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Venues Table / List */}
      <div className="bg-white rounded-xl border border-[#DFEBE2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F8F5] border-b border-[#DFEBE2] text-[11px] font-bold text-[#31523E] uppercase tracking-wider">
                <th className="py-3 px-4 min-w-[200px]">Partner Venue & Category</th>
                <th className="py-3 px-4 min-w-[150px]">Location & Distance</th>
                <th className="py-3 px-4 min-w-[160px]">Contact Person</th>
                <th className="py-3 px-4 min-w-[180px]">Status & Pipeline Stage</th>
                <th className="py-3 px-4 min-w-[100px] text-right">Weekly Footfall</th>
                <th className="py-3 px-4 min-w-[90px] text-right">Leads</th>
                <th className="py-3 px-4 min-w-[220px]">Agreed Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2ED] text-xs">
              {filteredVenues.map((v) => (
                <tr key={v.id} className="hover:bg-[#FAFDFB] transition-colors">
                  {/* Name & Category */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#183421]">{v.name}</div>
                    <div className="text-[11px] text-[#557262] mt-0.5">
                      {v.categoryName}
                    </div>
                  </td>

                  {/* Location & Distance */}
                  <td className="py-3.5 px-4 text-[#3E5648]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#3D7852] shrink-0" />
                      <span>{v.locationArea}</span>
                    </div>
                    <div className="text-[11px] text-[#698575] font-mono tabular-nums mt-0.5">
                      {v.distanceKm} km from Sparks EC
                    </div>
                  </td>

                  {/* Contact Person */}
                  <td className="py-3.5 px-4 text-[#3E5648]">
                    <div className="font-medium text-[#20392A]">{v.contactPerson}</div>
                    <div className="text-[11px] text-[#627E6E] font-mono mt-0.5">
                      {v.contactChannel}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={v.status}
                      onChange={(e) =>
                        onUpdateVenueStatus(v.id, e.target.value as PartnerVenue['status'])
                      }
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${getStatusColor(
                        v.status
                      )}`}
                    >
                      <option value="Prospect">Prospect</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Agreement Signed">Agreement Signed</option>
                      <option value="Active Activation">Active Activation</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Weekly Footfall */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#324B3C]">
                    {v.estimatedWeeklyFootfall.toLocaleString('id-ID')}
                  </td>

                  {/* Leads */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-bold text-[#2A5E3C] bg-[#EAF5ED] px-2 py-0.5 rounded-md border border-[#D0E5D7]">
                      {v.leadsGenerated}
                    </span>
                  </td>

                  {/* Agreed Mechanism */}
                  <td className="py-3.5 px-4 text-[#445E50] text-[11px] leading-relaxed">
                    {v.agreedMechanism}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVenues.length === 0 && (
          <div className="p-8 text-center text-xs text-[#5D7A6B]">
            No partner venues found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
