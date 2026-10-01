import React, { useState } from 'react';
import { POI_CATEGORIES } from '../data/poiData';
import { MessageSquare, Mail, FileText, Copy, Check, Sparkles, Building, Send } from 'lucide-react';

export const PitchHub: React.FC = () => {
  const [selectedPoiId, setSelectedPoiId] = useState<number>(1);
  const [channel, setChannel] = useState<'wa' | 'email' | 'moa'>('wa');
  const [partnerName, setPartnerName] = useState('Kumon Ruko Emerald');
  const [picName, setPicName] = useState('Ibu Ratna');
  const [areaName, setAreaName] = useState('BSD City');
  const [copied, setCopied] = useState(false);

  const selectedPoi = POI_CATEGORIES.find((p) => p.id === selectedPoiId) || POI_CATEGORIES[0];

  const getPopulatedWA = () => {
    return selectedPoi.samplePitchScriptWA
      .replace(/\[Nama Owner\/Manager\]|\[Nama PIC Playground\]|\[Nama Admin Komunitas\]|\[Manager Baby Shop\]|\[Nama Klinik\/RSIA\]|\[Owner Café\/Resto\]|\[Nama Cluster\]|\[Nama Mall\]|\[Nama Komunitas\/Gereja\/TPA\]|\[Nama Event\]/g, picName)
      .replace(/\[Nama Tempat\]|\[Nama Preschool\]|\[Nama Playground\]|\[Playground\]|\[Nama Komunitas\]|\[Nama Toko\]|\[Nama Klinik\]|\[Nama Resto\]|\[Nama Café\/Resto\]|\[Nama Cluster\]|\[Nama Mall\]|\[Nama Sekolah\]|\[Nama Lembaga\]|\[Nama Event\]/g, partnerName)
      .replace(/\[Area\]/g, areaName);
  };

  const getPopulatedEmail = () => {
    return selectedPoi.samplePitchEmail
      .replace(/\[Nama Partner\]|\[Nama Tempat\]|\[Nama Preschool\]|\[Nama Playground\]|\[Nama Komunitas\]|\[Nama Toko\]|\[Nama Klinik\]|\[Nama RSIA\/Klinik\]|\[Nama Restoran\]|\[Nama Café\/Resto\]|\[Nama Cluster\]|\[Nama Mall\]|\[Nama Sekolah\]|\[Nama Lembaga\]|\[Nama Acara\]|\[Nama Event\]/g, partnerName)
      .replace(/\[Area\]/g, areaName);
  };

  const getMoAOverview = () => {
    return `MEMORANDUM OF UNDERSTANDING (MoU) & PARTNERSHIP BRIEF
PIHAK I: Sparks Early Childhood & Enrichment Center (${areaName})
PIHAK II: ${partnerName} (${selectedPoi.category})

1. MAKSUD & TUJUAN
Kolaborasi sinergis non-kompetitif untuk memberikan fasilitas nilai tambah bagi keluarga dan anak usia 1–9 tahun di wilayah ${areaName}.

2. BENTUK KEMITRAAN
• ${selectedPoi.valuePropForPartner}
• Mekanisme Aktivasi: ${selectedPoi.activationTactics.join('; ')}

3. BENEFIT BAGI PIHAK II (${partnerName})
• Penyediaan voucher eksklusif Free Sparks Trial Pass untuk seluruh customer/siswa/pasien ${partnerName}
• Publikasi bersama di media sosial dan database member Sparks EC
• Tanpa beban biaya operasional bagi Pihak II

4. KEWAJIBAN PIHAK I (Sparks EC)
• Menyediakan materi promosi (standee akrilik, flyer, placemat, atau voucher cetak)
• Memfasilitasi sesi trial edukatif dengan instruktur berlisensi
• Bertanggung jawab penuh atas operasional dan keselamatan anak selama kegiatan Sparks EC

Dibuat di: ${areaName}
Tanggal: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
Pihak I (Sparks EC)                    Pihak II (${partnerName})`;
  };

  const getActiveText = () => {
    if (channel === 'wa') return getPopulatedWA();
    if (channel === 'email') return getPopulatedEmail();
    return getMoAOverview();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EEF6F0] via-[#F7FAF4] to-[#FFFDF5] rounded-2xl border border-[#DFEBE3] p-6 sm:p-8">
        <div className="max-w-3xl space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5F3E]">
            <MessageSquare className="w-3.5 h-3.5 text-[#356B48]" />
            <span>Sparks EC Outreach Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Pre-tested Indonesian Scripts</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#173020] tracking-tight">
            Pitch Deck, WhatsApp & Email Outreach Hub
          </h2>
          <p className="text-sm text-[#486353] leading-relaxed">
            High-converting partnership communication templates customized for principals, clinic
            directors, mom community admins, and store managers.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Category Selector & Variables (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Variable Replacements */}
          <div className="bg-white rounded-xl border border-[#DFEBE2] p-4 shadow-xs space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D603F]">
              Dynamic Script Variables
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#486253]">
                  Partner Venue Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#486253]">
                  PIC / Decision Maker Name
                </label>
                <input
                  type="text"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#486253]">
                  District / Area
                </label>
                <input
                  type="text"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-[#F8FAF8] border border-[#DEEBE1] rounded-lg text-[#1D3625] focus:outline-none focus:ring-1 focus:ring-[#3B7750]"
                />
              </div>
            </div>
          </div>

          {/* PoI Category Selector List */}
          <div className="bg-white rounded-xl border border-[#DFEBE2] p-4 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D603F] mb-1">
              Select PoI Target ({POI_CATEGORIES.length})
            </div>
            <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
              {POI_CATEGORIES.map((poi) => (
                <button
                  key={poi.id}
                  onClick={() => setSelectedPoiId(poi.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between border ${
                    selectedPoiId === poi.id
                      ? 'bg-[#EBF5ED] border-[#B9DDBF] text-[#1D442B] font-bold shadow-2xs'
                      : 'bg-white border-transparent text-[#4C6858] hover:bg-[#F5F8F6]'
                  }`}
                >
                  <span className="truncate">
                    0{poi.id}. {poi.category}
                  </span>
                  <span className="text-[10px] text-[#708B7B] shrink-0 font-mono">
                    {poi.catchmentTier.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Script Preview & Copy Toolbar (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#DFEBE2] p-5 sm:p-6 shadow-xs space-y-4">
          {/* Channel Tabs & Copy Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF4EF] pb-4">
            <div className="flex items-center gap-1.5 p-1 bg-[#F1F6F2] rounded-lg border border-[#DCE8DE]">
              <button
                onClick={() => setChannel('wa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  channel === 'wa'
                    ? 'bg-white text-[#214930] shadow-xs border border-[#D5E5DA]'
                    : 'text-[#587363] hover:text-[#183322]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#356B48]" />
                <span>WhatsApp Outreach</span>
              </button>

              <button
                onClick={() => setChannel('email')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  channel === 'email'
                    ? 'bg-white text-[#214930] shadow-xs border border-[#D5E5DA]'
                    : 'text-[#587363] hover:text-[#183322]'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-[#C4951B]" />
                <span>Formal Email Proposal</span>
              </button>

              <button
                onClick={() => setChannel('moa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  channel === 'moa'
                    ? 'bg-white text-[#214930] shadow-xs border border-[#D5E5DA]'
                    : 'text-[#587363] hover:text-[#183322]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#356B48]" />
                <span>One-Page MoU Brief</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#306041] hover:bg-[#254C33] rounded-xl shadow-xs transition-all self-end sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#FDF099]" />
                  <span>Copy Script</span>
                </>
              )}
            </button>
          </div>

          {/* Current Category Value Proposition Hook */}
          <div className="p-3 bg-[#F6FAF7] rounded-xl border border-[#DFECE2] text-xs">
            <span className="font-bold text-[#2A5739]">Recommended Pitch Strategy: </span>
            <span className="text-[#3F584A]">{selectedPoi.valuePropForPartner}</span>
          </div>

          {/* Script Content Area */}
          <div className="relative">
            <pre className="p-4 sm:p-5 bg-[#FAFBF9] rounded-xl border border-[#DCE8DF] text-xs text-[#203628] leading-relaxed font-mono whitespace-pre-wrap max-h-[460px] overflow-y-auto">
              {getActiveText()}
            </pre>
          </div>

          {/* Tip */}
          <div className="flex items-center gap-2 text-[11px] text-[#63806F] pt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C4951B] shrink-0" />
            <span>
              Best response rate is achieved when sending on weekday mornings between 09:30 – 11:00
              WIB.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
