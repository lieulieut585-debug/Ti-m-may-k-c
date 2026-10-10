import React from 'react';
import { SavedLookItem } from '../types';
import { CULTURAL_GARMENTS } from '../data/culturalKnowledge';
import { GarmentIllustration } from './GarmentIllustration';
import { X, Scale, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface CompareLooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedLooks: SavedLookItem[];
  onRemoveLook: (id: string) => void;
  onSelectLookToWear: (look: SavedLookItem) => void;
}

export const CompareLooksModal: React.FC<CompareLooksModalProps> = ({
  isOpen,
  onClose,
  savedLooks,
  onRemoveLook,
  onSelectLookToWear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1F1F24] text-white px-6 sm:px-8 py-4.5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B84A39] flex items-center justify-center text-white">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                ⚖️ SO SÁNH CÁC LOOK (COMPARE LOOKS)
                <span className="text-xs font-mono font-normal bg-white/10 px-2 py-0.5 rounded-full">
                  {savedLooks.length}/3 Looks
                </span>
              </h2>
              <p className="text-[11px] text-stone-300">
                Đối chiếu trực diện giữa các phương án phối đồ & remix đương đại
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {savedLooks.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <Scale className="w-12 h-12 mx-auto text-stone-300 mb-3" />
              <p className="font-serif text-lg text-stone-700">Chưa có Look nào được lưu vào khay so sánh.</p>
              <p className="text-xs text-stone-400 mt-1">
                Hãy nhấn nút <strong>“📌 Lưu vào khay So Sánh”</strong> trên màn hình kết quả để so sánh tối đa 3 looks!
              </p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-${savedLooks.length} gap-4 items-stretch`}>
              {savedLooks.map((item, index) => {
                const garment = CULTURAL_GARMENTS[item.selection.vietPhucId];
                const scissors = item.selection.remixScissors;
                const status = item.result.cultural_check?.status || 'SAFE';
                const isRemixed = item.result.reinterpretation_type === 'CONTEMPORARY_REMIX';

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200 p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow"
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-stone-400">
                          LOOK 0{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveLook(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1 rounded cursor-pointer"
                          title="Xóa khỏi khay so sánh"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Look Title */}
                      <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                        {item.result.look_name}
                      </h3>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {garment.name} • {item.selection.contextGroup || item.selection.occasion}
                      </div>

                      {/* Small Garment Canvas */}
                      <div className="my-3 py-2 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-center">
                        <GarmentIllustration
                          garmentId={item.selection.vietPhucId}
                          palette={item.result.color_palette}
                          colorMood={item.selection.colorMood}
                          accessories={item.result.accessories}
                          avatarProfile={item.selection.avatarProfile}
                          remixScissors={item.selection.remixScissors}
                          showDetails={false}
                          className="w-full max-w-[140px]"
                        />
                      </div>

                      {/* Criteria Comparisons */}
                      <div className="space-y-3 text-xs mt-3 pt-3 border-t border-stone-100">
                        {/* 1. Style DNA */}
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 uppercase font-bold block mb-1">
                            🧬 STYLE DNA
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {(item.result.style_dna || [item.selection.personalStyle]).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 2. Context Fit */}
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 uppercase font-bold block mb-1">
                            🎯 ĐỘ HỢP BỐI CẢNH
                          </span>
                          <div className="flex items-center gap-1.5">
                            {item.result.context_fit?.selected_context_status === 'HIGH' ? (
                              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                🟢 Rất phù hợp
                              </span>
                            ) : item.result.context_fit?.selected_context_status === 'MEDIUM' ? (
                              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                🟡 Cần cân nhắc
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                🔴 Không khuyến khích
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 3. Cultural Preservation */}
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 uppercase font-bold block mb-1">
                            🏮 BẢO TỒN VĂN HÓA
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                              status === 'SAFE'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : status === 'CAUTION'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{status}</span>
                          </span>
                        </div>

                        {/* 4. Remix Level */}
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 uppercase font-bold block mb-1">
                            ✂️ CẤP ĐỘ BIẾN HÓA
                          </span>
                          <div className="text-[11px] text-stone-700 font-medium">
                            {isRemixed ? (
                              <span className="text-purple-700 font-semibold">
                                ✨ Contemporary ({scissors?.length || 'Biến tấu'})
                              </span>
                            ) : (
                              <span className="text-emerald-700 font-semibold">
                                🏮 Bản nguyên bản
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectLookToWear(item);
                          onClose();
                        }}
                        className="w-full py-2 rounded-xl bg-stone-900 hover:bg-[#B84A39] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                      >
                        Chọn Look Này
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-100/90 px-6 py-3.5 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
          <span>Tiệm May Ký Ức • Tính năng So Sánh Đa Chiều</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium cursor-pointer"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
