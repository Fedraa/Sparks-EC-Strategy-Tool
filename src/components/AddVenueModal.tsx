import React, { useState } from 'react';
import { POI_CATEGORIES } from '../data/poiData';
import { PartnerVenue } from '../types';
import { X, Plus, Building, MapPin, Phone, Users } from 'lucide-react';

interface AddVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVenue: (venue: PartnerVenue) => void;
}

export const AddVenueModal: React.FC<AddVenueModalProps> = ({
  isOpen,
  onClose,
  onAddVenue,
}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [locationArea, setLocationArea] = useState('BSD City, Tangerang');
  const [distanceKm, setDistanceKm] = useState<number>(1.2);
  const [contactPerson, setContactPerson] = useState('');
  const [contactChannel, setContactChannel] = useState('');
  const [priority, setPriority] = useState<PartnerVenue['priority']>('High');
  const [estimatedWeeklyFootfall, setEstimatedWeeklyFootfall] = useState<number>(300);
  const [agreedMechanism, setAgreedMechanism] = useState('Standee QR trial voucher + flyer drop-off');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const matchedCategory = POI_CATEGORIES.find((c) => c.id === Number(categoryId)) || POI_CATEGORIES[0];

    const newVenue: PartnerVenue = {
      id: `v-${Date.now()}`,
      name: name.trim(),
      categoryId: matchedCategory.id,
      categoryName: matchedCategory.category,
      locationArea: locationArea.trim(),
      distanceKm: Number(distanceKm),
      contactPerson: contactPerson.trim() || 'Store Manager',
      contactChannel: contactChannel.trim() || 'WA Pending',
      status: 'Prospect',
      priority,
      estimatedWeeklyFootfall: Number(estimatedWeeklyFootfall),
      agreedMechanism: agreedMechanism.trim(),
      leadsGenerated: 0,
      notes: notes.trim(),
    };

    onAddVenue(newVenue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-white rounded-2xl shadow-xl border border-[#DFEAE2] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F3F8F4] to-[#FAF8ED] border-b border-[#E1ECE3] p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-[#183120] tracking-tight">
              Add New Partner Venue
            </h3>
            <p className="text-xs text-[#52705E]">
              Track a new local venue into your Sparks EC offline pipeline
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#627D6C] hover:text-[#183120] hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Venue Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A28]">Venue Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kumon Ruko Emerald, Kinderfield Preschool, RSIA Bunda..."
              className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
            />
          </div>

          {/* PoI Category */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A28]">Target PoI Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
            >
              {POI_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  0{c.id}. {c.category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Area & Distance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">Location Area</label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="e.g. BSD City, Tangerang"
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">Distance from Store (km)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              />
            </div>
          </div>

          {/* Contact Person & Channel */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">PIC / Contact Name</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Ibu Ratna (Director)"
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">WhatsApp / Contact</label>
              <input
                type="text"
                value={contactChannel}
                onChange={(e) => setContactChannel(e.target.value)}
                placeholder="e.g. WA: 0812-3456-XXXX"
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              />
            </div>
          </div>

          {/* Priority & Weekly Footfall */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">Priority Tier</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PartnerVenue['priority'])}
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E3A28]">Est. Weekly Footfall</label>
              <input
                type="number"
                step="50"
                min="10"
                value={estimatedWeeklyFootfall}
                onChange={(e) => setEstimatedWeeklyFootfall(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
              />
            </div>
          </div>

          {/* Proposed Activation Mechanism */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A28]">Planned Activation Mechanism</label>
            <input
              type="text"
              value={agreedMechanism}
              onChange={(e) => setAgreedMechanism(e.target.value)}
              placeholder="e.g. Standee QR, Bag insert, School gate flyering..."
              className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A28]">Notes & Context</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Good relationship with owner, best time to call is morning..."
              className="w-full px-3 py-2 text-xs bg-[#F8FAF8] border border-[#DDEBE0] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750] focus:bg-white"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#546E60] hover:text-[#183120] hover:bg-[#F2F6F3] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all"
            >
              Add to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
