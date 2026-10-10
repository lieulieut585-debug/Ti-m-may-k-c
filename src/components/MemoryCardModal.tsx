import React from 'react';
import { MemoryCardData, CulturalGarmentItem } from '../types';
import { BookOpen, X, BookmarkCheck, Sparkles, Shield, Scroll, CheckCircle2 } from 'lucide-react';

interface MemoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryCard: MemoryCardData;
  garment: CulturalGarmentItem;
  onProceedToCulturalCheck?: () => void;
}

export const MemoryCardModal: React.FC<MemoryCardModalProps> = ({
  isOpen,
  onClose,
  memoryCard,
  garment,
  onProceedToCulturalCheck,
}) => {
  if (!isOpen) return null;

  const giuLaiItems = memoryCard.giu_lai || garment.giu_lai;
  const coTheRemixItems = memoryCard.co_the_remix || garment.co_the_remix;
  const keyChars = memoryCard.key_characteristics || garment.key_characteristics;
  const sources = memoryCard.sources || garment.sources;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-[#2A7B68] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-[#236757]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <Scroll className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-200">
                DI SẢN TRANG PHỤC VIỆT
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
                MẢNH GHÉP KÝ ỨC
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Card Title & Cultural Story (Max 3-4 sentences, factual) */}
          <div className="bg-white/90 rounded-2xl p-6 border border-[#E8E1D5] shadow-xs relative">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#B84A39] mb-1">
              {memoryCard.title || `Ký ức: ${garment.name}`}
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">
              {garment.vietnameseName} ({garment.period})
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif italic border-l-3 border-[#2A7B68] pl-4 py-0.5">
              “{memoryCard.story}”
            </p>
          </div>

          {/* Cultural Context & Key Characteristics */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B84A39]" />
              BỐI CẢNH LỊCH SỬ & ĐẶC TRƯNG CỐT LÕI
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {memoryCard.cultural_context || garment.historical_context}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {keyChars.map((kc, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-stone-100/70 border border-stone-200 text-xs text-stone-700 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B84A39] shrink-0 mt-1.5" />
                  <span>{kc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TWO MANDATORY SECTIONS: GIỮ LẠI vs CÓ THỂ REMIX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* SECTION 1: GIỮ LẠI (Core characteristics supported by knowledge base) */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm mb-3">
                <Shield className="w-4 h-4 text-amber-700" />
                <span>GIỮ LẠI (BẢN SẮC CỐT LÕI)</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {giuLaiItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-amber-200/60 text-[11px] text-amber-800 italic">
                *Đặc trưng nền tảng xác định đúng danh xưng cổ phục.
              </div>
            </div>

            {/* SECTION 2: CÓ THỂ REMIX (Elements explicitly identified as suitable for styling variation) */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-sm mb-3">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>CÓ THỂ REMIX (TỰ DO SÁNG TẠO)</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {coTheRemixItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 italic">
                *Thoải mái làm mới để phù hợp phong cách Gen Z.
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500">
            <span className="font-semibold text-stone-700 block mb-1">Nguồn tư liệu sử liệu đối chiếu:</span>
            <ul className="list-disc list-inside space-y-0.5 text-stone-500">
              {sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100/90 px-6 sm:px-8 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500 text-center sm:text-left">
            “Remix tự do — nhưng không đánh mất cái làm nên Việt phục.”
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onProceedToCulturalCheck && (
              <button
                onClick={() => {
                  onClose();
                  onProceedToCulturalCheck();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Xem Cultural Check →
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
