import React from 'react';
import { CulturalCheckResult, CulturalCheckStatus, StylingSelection } from '../types';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  X,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

interface CulturalCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  culturalCheck: CulturalCheckResult;
  selection: StylingSelection;
  onFixLook: (updatedSelection: StylingSelection) => void;
  onContinueToLookbook?: () => void;
}

export const CulturalCheckModal: React.FC<CulturalCheckModalProps> = ({
  isOpen,
  onClose,
  culturalCheck,
  selection,
  onFixLook,
  onContinueToLookbook
}) => {
  if (!isOpen) return null;

  const status: CulturalCheckStatus = culturalCheck.status || 'SAFE';

  // Handle "SỬA LOOK" without restarting whole flow:
  // Automatically replaces or removes the problematic accessory or updates style
  const handleAutoFix = () => {
    const updated = { ...selection };

    if (culturalCheck.problematic_selection) {
      const prob = culturalCheck.problematic_selection;
      const repl = culturalCheck.recommended_replacement;

      // Remove problematic accessory
      updated.accessories = updated.accessories.filter((a) => a !== prob);

      // If replacement accessory suggested, add it
      if (repl && !updated.accessories.includes(repl as any)) {
        updated.accessories.push(repl as any);
      }
    } else {
      // General fix: adjust personal style or ensure safe accessory
      if (status === 'REVIEW' && selection.personalStyle === 'Street') {
        updated.personalStyle = 'Elegant';
      }
    }

    onFixLook(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Ribbon by Status */}
        <div
          className={`px-6 sm:px-8 py-5 flex items-center justify-between text-white ${
            status === 'SAFE'
              ? 'bg-emerald-700'
              : status === 'CAUTION'
              ? 'bg-amber-600'
              : 'bg-rose-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              {status === 'SAFE' && <ShieldCheck className="w-6 h-6 text-emerald-100" />}
              {status === 'CAUTION' && <AlertTriangle className="w-6 h-6 text-amber-100" />}
              {status === 'REVIEW' && <AlertOctagon className="w-6 h-6 text-rose-100" />}
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">
                AI CULTURAL GUARDRAIL
              </span>
              <h2 className="font-serif font-bold text-xl text-white">
                CULTURAL CHECK • {status}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Status Banner */}
          <div
            className={`p-5 rounded-2xl border ${
              status === 'SAFE'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : status === 'CAUTION'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-serif font-bold text-base mb-2">
              {status === 'SAFE' && (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Look này đã vượt qua Cultural Check.</span>
                </>
              )}
              {status === 'CAUTION' && (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Cần cân nhắc bối cảnh và mức độ phối ngẫu.</span>
                </>
              )}
              {status === 'REVIEW' && (
                <>
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                  <span>ANH CẢ PHÁT HIỆN MỘT ĐIỂM CẦN XEM LẠI</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              {culturalCheck.reason}
            </p>
          </div>

          {/* Conditional Sections for REVIEW / CAUTION */}
          {status === 'REVIEW' && (
            <div className="space-y-4">
              {/* WHY Section */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  VÌ SAO (WHY)
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {culturalCheck.reason}
                </p>
              </div>

              {/* WHAT TO KEEP Section */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  ĐẶC TRƯNG CẦN BẢO TỒN (WHAT TO KEEP)
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {culturalCheck.relevant_characteristic ||
                    'Cấu trúc tà áo, độ đoan trang của cổ đứng/cổ đối khâm và tỷ lệ tổng thể của trang phục truyền thống.'}
                </p>
              </div>

              {/* SUGGESTED ALTERNATIVE Section */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  GỢI Ý THAY THẾ TỪ ANH CẢ (SUGGESTED ALTERNATIVE)
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {culturalCheck.suggestion}
                </p>
                {culturalCheck.problematic_selection && culturalCheck.recommended_replacement && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-200/80 flex items-center gap-2 text-xs font-medium text-emerald-900">
                    <span className="line-through text-stone-400">
                      {culturalCheck.problematic_selection}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                      {culturalCheck.recommended_replacement}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {status === 'CAUTION' && (
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 block">
                GỢI Ý TỪ ANH CẢ
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {culturalCheck.suggestion}
              </p>
            </div>
          )}

          {status === 'SAFE' && (
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                ĐÁNH GIÁ CHUẨN MỰC
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {culturalCheck.suggestion}
              </p>
              <div className="mt-3 p-3 bg-stone-50 rounded-lg text-[11px] text-stone-500 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#B84A39] shrink-0" />
                <span>
                  Trang phục giữ trọn bản sắc nhưng vẫn tạo được dấu ấn cá nhân rõ nét.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with SỬA LOOK CTA */}
        <div className="bg-stone-100/90 px-6 sm:px-8 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Đóng
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {status === 'REVIEW' && (
              /* REQUIRED BUTTON: SỬA LOOK (replaces/fixes problematic selection without resetting whole flow) */
              <button
                onClick={handleAutoFix}
                className="w-full sm:w-auto flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#B84A39] hover:bg-[#A33827] text-white font-serif font-bold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>SỬA LOOK (ÁP DỤNG GỢI Ý)</span>
              </button>
            )}

            {status !== 'REVIEW' && onContinueToLookbook && (
              <button
                onClick={() => {
                  onClose();
                  onContinueToLookbook();
                }}
                className="w-full sm:w-auto flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-serif font-bold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Tiếp tục xuất Lookbook →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
