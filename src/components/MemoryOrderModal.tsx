import React from 'react';
import { SAMPLE_MEMORY_ORDER } from '../data/culturalKnowledge';
import { HeartHandshake, Sparkles, X, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface MemoryOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptChallenge: () => void;
}

export const MemoryOrderModal: React.FC<MemoryOrderModalProps> = ({
  isOpen,
  onClose,
  onAcceptChallenge,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] shadow-2xl overflow-hidden flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-[#B84A39] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <HeartHandshake className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200">
                THỬ THÁCH ĐỒNG HÀNH
              </span>
              <h2 className="font-serif font-bold text-xl text-white">
                ĐƠN HÀNG KÝ ỨC
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="text-center pb-2">
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              “Giúp Mai tìm một look phù hợp.”
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Giải bài toán phối đồ có câu chuyện văn hóa phía sau.
            </p>
          </div>

          {/* Customer Profile Dossier Card */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-3.5 shadow-2xs">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block">
                KHÁCH HÀNG
              </span>
              <div className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <span>{SAMPLE_MEMORY_ORDER.customerName}</span>
                <span className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {SAMPLE_MEMORY_ORDER.profile}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block">
                BỐI CẢNH & YÊU CẦU
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-0.5">
                {SAMPLE_MEMORY_ORDER.situation}
              </p>
            </div>

            {/* Crucial Memory Object */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block">
                KỈ VẬT KÝ ỨC (MEMORY OBJECT)
              </span>
              <p className="font-serif italic font-bold text-sm text-amber-900 mt-0.5">
                “{SAMPLE_MEMORY_ORDER.memoryObject}”
              </p>
              <p className="text-[11px] text-amber-800 mt-1">
                Gợi ý: Hãy nhớ bổ sung <strong>Quạt</strong> trong danh sách phụ kiện để hoàn thành tâm nguyện của Mai.
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-100/70 rounded-xl text-[11px] text-stone-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A7B68] shrink-0" />
            <span>
              Bạn sẽ sử dụng cùng phòng thiết kế thời trang. Anh Cả sẽ chấm điểm mức độ hài lòng của Mai và chạy Cultural Check.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100/90 px-6 sm:px-8 py-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
          >
            Để sau
          </button>
          <button
            onClick={() => {
              onClose();
              onAcceptChallenge();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#B84A39] hover:bg-[#A33827] text-white font-serif font-bold text-xs tracking-wide shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>BẮT ĐẦU PHỐI CHO MAI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
