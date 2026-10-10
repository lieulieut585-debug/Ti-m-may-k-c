import React, { useRef, useState } from 'react';
import {
  GeminiStylistResponse,
  StylingSelection,
  VietPhucId,
  CulturalCheckStatus
} from '../types';
import { CULTURAL_GARMENTS } from '../data/culturalKnowledge';
import { GarmentIllustration } from './GarmentIllustration';
import {
  Download,
  Share2,
  X,
  Check,
  Sparkles,
  Scissors,
  ShieldCheck,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: GeminiStylistResponse;
  selection: StylingSelection;
  onNewStyling: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  result,
  selection,
  onNewStyling,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const garment = CULTURAL_GARMENTS[selection.vietPhucId] || CULTURAL_GARMENTS.ao_ngu_than;
  const status: CulturalCheckStatus = result.cultural_check?.status || 'SAFE';

  // Handle Share: Clipboard copy link or Web Share API
  const handleShare = async () => {
    const shareText = `Khám phá look Việt phục "${result.look_name}" của mình tại Tiệm May Ký Ức — Chạm ký ức. Phối chất riêng. Giữ nét Việt.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tiệm May Ký Ức — ${result.look_name}`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Handle Download Lookbook Poster
  const handleDownload = () => {
    setDownloading(true);
    try {
      // Create SVG-based vector poster export as data URI download
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FAF7F2"/>
              <stop offset="100%" stop-color="#F2EDE4"/>
            </linearGradient>
          </defs>
          <rect width="800" height="1100" fill="url(#bg)"/>
          <rect x="30" y="30" width="740" height="1040" fill="none" stroke="#E8E1D5" stroke-width="2"/>
          <rect x="40" y="40" width="720" height="1020" fill="none" stroke="#B84A39" stroke-width="1" stroke-opacity="0.4"/>
          
          <text x="400" y="100" font-family="serif" font-size="34" font-weight="bold" text-anchor="middle" fill="#1F1F24" letter-spacing="4">TIỆM MAY KÝ ỨC</text>
          <text x="400" y="130" font-family="serif" font-size="14" font-style="italic" text-anchor="middle" fill="#8E3224">“Chạm ký ức. Phối chất riêng. Giữ nét Việt.”</text>
          
          <rect x="300" y="150" width="200" height="25" rx="12" fill="#B84A39" fill-opacity="0.1"/>
          <text x="400" y="167" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#B84A39" letter-spacing="2">YOUR CREATION</text>
          
          <text x="400" y="230" font-family="serif" font-size="30" font-weight="bold" text-anchor="middle" fill="#1F1F24">${escapeXml(result.look_name)}</text>
          
          <text x="400" y="270" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#555">Trang phục: ${escapeXml(garment.name)}  |  Dịp: ${escapeXml(selection.occasion)}  |  Phong cách: ${escapeXml(selection.personalStyle)}</text>
          
          <rect x="150" y="300" width="500" height="420" rx="20" fill="#FFFFFF" stroke="#E8E1D5"/>
          <text x="400" y="520" font-family="serif" font-size="22" font-style="italic" text-anchor="middle" fill="#888">[ ${escapeXml(garment.name)} • ${escapeXml(selection.colorMood)} ]</text>
          
          <text x="400" y="760" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">PHỤ KIỆN: ${escapeXml(result.accessories.join(', ') || 'Tối giản')}</text>
          <text x="400" y="800" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#2A7B68">CULTURAL CHECK STATUS: ${status}</text>
          
          <rect x="100" y="830" width="600" height="120" rx="15" fill="#FFFFFF" stroke="#E8E1D5"/>
          <text x="400" y="870" font-family="serif" font-size="14" font-style="italic" text-anchor="middle" fill="#222">“${escapeXml(result.mentor_message.slice(0, 140))}...”</text>
          <text x="400" y="910" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#888">Lời nhắn từ Anh Cả — AI Cultural Stylist</text>
          
          <text x="400" y="1020" font-family="serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#8E3224">Remix tự do — nhưng không đánh mất cái làm nên Việt phục.</text>
          <text x="400" y="1040" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#AAA">TIEM MAY KY UC © 2026 • AI CULTURAL STYLING STUDIO</text>
        </svg>
      `;

      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Lookbook_TiemMayKyUc_${selection.vietPhucId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-[#1F1F24] text-white px-6 sm:px-8 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#FFE27D]" />
            <h2 className="font-serif font-bold text-lg sm:text-xl text-white">
              LOOKBOOK THỜI TRANG ĐƯƠNG ĐẠI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Poster Container */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {/* FASHION POSTER CANVAS */}
          <div
            ref={posterRef}
            className="relative bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E8] to-[#EFE8DC] rounded-2xl p-6 sm:p-8 border-2 border-[#E8E1D5] shadow-md text-stone-900 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Subtle inner decorative border */}
            <div className="absolute inset-3 border border-[#B84A39]/30 rounded-xl pointer-events-none" />

            {/* Poster Header */}
            <div className="mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B84A39] bg-[#B84A39]/10 px-3 py-1 rounded-full font-bold">
                YOUR CREATION
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-2">
                TIỆM MAY KÝ ỨC
              </h1>
              <p className="font-serif italic text-xs text-[#8E3224] mt-0.5">
                “Chạm ký ức. Phối chất riêng. Giữ nét Việt.”
              </p>
            </div>

            {/* Look Name */}
            <div className="my-2">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1F24]">
                {result.look_name}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-stone-600">
                <span className="font-semibold text-stone-800">{garment.name}</span>
                <span>•</span>
                <span>Dịp: {selection.occasion}</span>
                <span>•</span>
                <span>Style: {selection.personalStyle}</span>
              </div>
            </div>

            {/* Center Visual Garment Artwork */}
            <div className="w-full max-w-xs my-4 bg-white/90 rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col items-center">
              <GarmentIllustration
                garmentId={selection.vietPhucId}
                palette={result.color_palette}
                colorMood={selection.colorMood}
                accessories={result.accessories}
                avatarProfile={selection.avatarProfile}
                remixScissors={selection.remixScissors}
                className="w-full"
                showDetails={false}
              />

              {/* Color Palette bar */}
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400">Tông màu:</span>
                {result.color_palette.map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Accessories list */}
            {result.accessories.length > 0 && (
              <div className="text-xs text-stone-600 mb-3">
                <span className="font-semibold text-stone-800">Phụ kiện: </span>
                <span>{result.accessories.join(' • ')}</span>
              </div>
            )}

            {/* Cultural Check Status Stamp */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  status === 'SAFE'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : status === 'CAUTION'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CULTURAL CHECK: {status}</span>
              </span>
            </div>

            {/* Short Cultural Message */}
            <div className="max-w-md bg-white/70 rounded-xl p-3 border border-stone-200 text-xs text-stone-700 italic leading-relaxed mb-4">
              “{result.mentor_message}”
            </div>

            {/* Poster Footer Tagline */}
            <div className="pt-2 border-t border-stone-300/60 w-full text-center">
              <p className="font-serif font-bold text-xs text-[#8E3224] tracking-wide">
                Remix tự do — nhưng không đánh mất cái làm nên Việt phục.
              </p>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                TIỆM MAY KÝ ỨC © 2026 • AI CULTURAL STYLING STUDIO
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-stone-100/90 px-6 sm:px-8 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onNewStyling();
            }}
            className="text-xs text-stone-600 hover:text-stone-900 underline underline-offset-2 cursor-pointer"
          >
            ← Phối look mới
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* BUTTON: CHIA SẺ */}
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-stone-500" />
                  <span>CHIA SẺ</span>
                </>
              )}
            </button>

            {/* BUTTON: TẢI LOOKBOOK */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#B84A39] hover:bg-[#A33827] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Đang xuất...' : 'TẢI LOOKBOOK'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
