import React, { useState } from 'react';
import {
  GeminiStylistResponse,
  StylingSelection,
  VietPhucId,
  CulturalCheckStatus,
  SavedLookItem,
  RemixScissorsState
} from '../types';
import { CULTURAL_GARMENTS, DEFAULT_REMIX_SCISSORS } from '../data/culturalKnowledge';
import { GarmentIllustration } from './GarmentIllustration';
import { RemixScissorsPanel } from './RemixScissorsPanel';
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  BookmarkCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Info,
  Scale,
  Bookmark,
  Check,
  Wand2,
  ThumbsUp,
  Scissors
} from 'lucide-react';

interface AiResultViewProps {
  result: GeminiStylistResponse;
  selection: StylingSelection;
  isMemoryOrderMode: boolean;
  onOpenMemoryCard: () => void;
  onOpenCulturalCheck: () => void;
  onOpenLookbook: () => void;
  onBackToStudio: () => void;
  onQuickRemixSubmit: (updatedSelection: StylingSelection) => void;
  onApplySaferSuggestion: (updatedSelection: StylingSelection) => void;
  savedLooks: SavedLookItem[];
  onSaveToCompare: (look: SavedLookItem) => void;
  onOpenCompareModal: () => void;
}

export const AiResultView: React.FC<AiResultViewProps> = ({
  result,
  selection,
  isMemoryOrderMode,
  onOpenMemoryCard,
  onOpenCulturalCheck,
  onOpenLookbook,
  onBackToStudio,
  onQuickRemixSubmit,
  onApplySaferSuggestion,
  savedLooks,
  onSaveToCompare,
  onOpenCompareModal,
}) => {
  const [showQuickRemix, setShowQuickRemix] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isBeforeView, setIsBeforeView] = useState(false);

  const garment = CULTURAL_GARMENTS[selection.vietPhucId] || CULTURAL_GARMENTS.ao_ngu_than;
  const status: CulturalCheckStatus = result.cultural_check?.status || 'SAFE';
  const isContemporary = result.reinterpretation_type === 'CONTEMPORARY_REMIX';

  const styleDnaTags = result.style_dna?.length
    ? result.style_dna
    : selection.styleDna?.length
    ? selection.styleDna
    : [selection.personalStyle];

  const handleSaveLook = () => {
    const newItem: SavedLookItem = {
      id: Math.random().toString(36).substring(2, 9),
      selection,
      result,
      savedAt: Date.now(),
    };
    onSaveToCompare(newItem);
    setIsSaved(true);
  };

  const handleApplySafer = () => {
    // Keeps shoes/accessories but restores full length & traditional pants
    const saferSelection: StylingSelection = {
      ...selection,
      remixScissors: {
        ...(selection.remixScissors || DEFAULT_REMIX_SCISSORS),
        length: 'Full length (Nguyên bản)',
        silhouette: 'Giữ nguyên',
        bottomRemix: 'Quần dài truyền thống',
      },
    };
    onApplySaferSuggestion(saferSelection);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'SAFE':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SAFE • Vượt qua Cultural Check</span>
          </div>
        );
      case 'CAUTION':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>CAUTION • Cần cân nhắc bối cảnh</span>
          </div>
        );
      case 'REVIEW':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold border border-rose-300">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>REVIEW • Có điểm cần xem lại</span>
          </div>
        );
    }
  };

  const getFitBadge = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (level) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
            🟢 Rất phù hợp
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
            🟡 Cần cân nhắc
          </span>
        );
      case 'LOW':
        return (
          <span className="inline-flex items-center text-[11px] font-semibold text-rose-800 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200">
            🔴 Không khuyến khích
          </span>
        );
    }
  };

  const matrix = result.context_fit?.multi_context_matrix || {
    campus: 'HIGH',
    social_concert: 'HIGH',
    formal_wedding: 'MEDIUM',
    cultural_event: 'HIGH',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      {/* Memory Order Result Banner if in Memory Order mode */}
      {isMemoryOrderMode && result.memory_order_result && (
        <div
          className={`mb-8 p-5 rounded-2xl border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            result.memory_order_result.satisfied
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                result.memory_order_result.satisfied
                  ? 'bg-emerald-200 text-emerald-800'
                  : 'bg-amber-200 text-amber-800'
              }`}
            >
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg">
                  {result.memory_order_result.satisfied
                    ? 'CUSTOMER SATISFIED • Khách hàng Mai Hài Lòng!'
                    : 'NEEDS ADJUSTMENT • Cần Điều Chỉnh Cho Mai'}
                </span>
              </div>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                {result.memory_order_result.scoreExplanation}
              </p>
              <p className="text-xs font-semibold mt-1">
                Lời nhắn của Anh Cả: {result.memory_order_result.mentorFeedback}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {!result.memory_order_result.satisfied && (
              <button
                type="button"
                onClick={onBackToStudio}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-800 text-white hover:bg-amber-900 transition-colors cursor-pointer shadow-xs"
              >
                Chỉnh phụ kiện cho Mai
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Editorial Look Card */}
      <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-lg overflow-hidden">
        {/* Top Header bar with status & Look Name & Compare Actions */}
        <div className="bg-stone-900 text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-stone-400">
              <span>EDITORIAL LOOK CARD</span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">
                {isContemporary ? 'CONTEMPORARY REINTERPRETATION' : 'TRADITIONAL STYLING'}
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100 mt-1">
              {result.look_name}
            </h1>
          </div>

          {/* Action buttons: Save to Compare & Status badge */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleSaveLook}
              disabled={isSaved || savedLooks.length >= 3}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isSaved
                  ? 'bg-emerald-800 text-white border-emerald-700'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Đã lưu vào khay' : '📌 Lưu vào khay So Sánh'}</span>
            </button>

            {savedLooks.length > 0 && (
              <button
                type="button"
                onClick={onOpenCompareModal}
                className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>⚖️ SO SÁNH ({savedLooks.length}/3)</span>
              </button>
            )}

            {getStatusBadge()}
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* LEFT: Large Outfit Preview + Character Model + Hashtags (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between bg-stone-50/80 rounded-2xl p-5 border border-stone-200/80">
            {/* 1. Large OUTFIT PREVIEW WITH CHARACTER & BEFORE/AFTER */}
            <div className="w-full">
              <GarmentIllustration
                garmentId={selection.vietPhucId}
                palette={result.color_palette}
                colorMood={selection.colorMood}
                accessories={result.accessories}
                avatarProfile={selection.avatarProfile}
                remixScissors={selection.remixScissors}
                isBeforeView={isBeforeView}
                onToggleBeforeAfter={(val) => setIsBeforeView(val)}
                className="w-full"
              />
            </div>

            {/* HASHTAGS PILLS */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-3 border-t border-stone-200/80 w-full text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-semibold">
                #{selection.vietPhucId.replace('_', '')}
              </span>
              {styleDnaTags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-[#B84A39]/10 text-[#B84A39] font-semibold">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold">
                #{isContemporary ? 'VietContemporary' : 'TraditionalHeritage'}
              </span>
            </div>

            {/* QUICK REMIX TOGGLE BUTTON */}
            <div className="w-full mt-4">
              <button
                type="button"
                onClick={() => setShowQuickRemix(!showQuickRemix)}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Scissors className="w-3.5 h-3.5 text-[#B84A39]" />
                <span>{showQuickRemix ? 'Đóng Bảng Remix Nhanh' : '✂️ REMIX AGAIN (Chỉnh Nhanh Phom Dáng)'}</span>
              </button>
            </div>

            {/* INLINE QUICK REMIX PANEL */}
            {showQuickRemix && (
              <div className="w-full mt-3">
                <RemixScissorsPanel
                  scissors={selection.remixScissors || DEFAULT_REMIX_SCISSORS}
                  onChangeScissors={(updated) => {
                    const updatedSel = { ...selection, remixScissors: updated };
                    onQuickRemixSubmit(updatedSel);
                  }}
                  history={[]}
                  onRestoreHistory={() => {}}
                  onResetToOriginal={() => {
                    const origSel = { ...selection, remixScissors: DEFAULT_REMIX_SCISSORS };
                    onQuickRemixSubmit(origSel);
                  }}
                />
              </div>
            )}
          </div>

          {/* RIGHT: Detailed Editorial Breakdown & Stylist Feedback (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* 4. KHỐI CULTURAL CHECK & LỜI NHẮN ANH CẢ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F2EDE4] border border-[#E8E1D5] relative shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif text-xs font-bold border border-[#D4AF37]">
                    A.C
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      ANH CẢ NHẬN XÉT
                      <span className="text-[10px] font-sans font-semibold bg-[#2A7B68] text-white px-1.5 py-0.2 rounded-full">
                        AI Stylist
                      </span>
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed italic pl-3 border-l-2 border-[#B84A39] mb-3">
                  “{result.mentor_message}”
                </p>

                {/* Cultural Check Explanatory Distinction */}
                <div className="p-3 bg-white/90 rounded-xl border border-stone-200/80 text-xs text-stone-700 space-y-1">
                  <div className="font-semibold text-stone-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#B84A39]" />
                    <span>Đánh giá Cultural Guardrail:</span>
                  </div>
                  <p>{result.cultural_check?.reason}</p>
                  <p className="text-stone-500 italic mt-1">{result.cultural_check?.suggestion}</p>
                </div>

                {/* INTERACTIVE BUTTONS UNDER ANH CẢ'S MESSAGE */}
                <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-stone-200/60">
                  <button
                    type="button"
                    onClick={() => onOpenCulturalCheck()}
                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>👍 Giữ bản Remix này</span>
                  </button>

                  {status !== 'SAFE' && (
                    <button
                      type="button"
                      onClick={handleApplySafer}
                      className="px-3 py-1.5 rounded-lg bg-[#B84A39] hover:bg-[#A33827] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-amber-200" />
                      <span>🪄 Thử gợi ý an toàn hơn của Anh Cả</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 2. KHỐI "WHAT DID YOU REMIX?" (2 CỘT RÕ RÀNG) */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-400 block mb-2">
                  ✂️ WHAT DID YOU REMIX? (ĐỐI CHIẾU THAY ĐỔI)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* CỘT 1: GIỮ LẠI (FACT) */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                    <span className="font-serif font-bold text-xs text-emerald-900 block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      🏮 GIỮ LẠI (YẾU TỐ NHẬN DIỆN GỐC)
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-700">
                      {(result.what_is_preserved || [
                        `Cấu trúc cổ áo và hàng cúc đặc trưng của ${garment.name} (FACT)`,
                        `Độ đoan trang của y phục truyền thống Việt`
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CỘT 2: ĐÃ BIẾN HÓA (REMIX) */}
                  <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-xl">
                    <span className="font-serif font-bold text-xs text-purple-900 block mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      ✨ ĐÃ BIẾN HÓA (CONTEMPORARY)
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-700">
                      {(result.what_is_remixed || [
                        `Chiều dài tà áo: ${selection.remixScissors?.length || 'Biến tấu'}`,
                        `Trang phục dưới: ${selection.remixScissors?.bottomRemix || 'Quần dài'}`,
                        `Phong cách: ${styleDnaTags.join(', ')}`
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-700 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. KHỐI "TARGET CONTEXT FIT" (ĐỘ HỢP HOÀN CẢNH) */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-400">
                    🎯 CONTEXT FIT (ĐỘ HỢP HOÀN CẢNH)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-stone-500 font-medium">Bối cảnh đã chọn:</span>
                    {getFitBadge(result.context_fit?.selected_context_status || 'HIGH')}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed mb-3">
                  {result.context_fit?.reason || result.styling_reason}
                </p>

                {/* BẢNG ĐỐI CHIẾU NHANH 4 HOÀN CẢNH */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-center">
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-medium block">🎓 Campus</span>
                    <div className="mt-1">{getFitBadge(matrix.campus)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-medium block">🎉 Concert / Social</span>
                    <div className="mt-1">{getFitBadge(matrix.social_concert)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-medium block">💐 Đám cưới / Formal</span>
                    <div className="mt-1">{getFitBadge(matrix.formal_wedding)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-medium block">🏮 Lễ hội văn hóa</span>
                    <div className="mt-1">{getFitBadge(matrix.cultural_event)}</div>
                  </div>
                </div>
              </div>

              {/* OUTFIT & PALETTE QUICK TAGS */}
              <div className="text-xs text-stone-600 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-800">Phụ kiện:</span>
                {result.accessories.length > 0 ? (
                  result.accessories.map((acc, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border">
                      {acc}
                    </span>
                  ))
                ) : (
                  <span>Tối giản</span>
                )}
              </div>
            </div>

            {/* BUTTON GROUP: CHẠM KÝ ỨC, CULTURAL CHECK, LOOKBOOK */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* BUTTON: CHẠM KÝ ỨC */}
                <button
                  type="button"
                  onClick={onOpenMemoryCard}
                  className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2A7B68] hover:bg-[#236757] text-white font-serif font-bold text-sm tracking-wide shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-200 transition-transform group-hover:scale-110" />
                  <span>CHẠM KÝ ỨC</span>
                </button>

                {/* BUTTON: CULTURAL CHECK */}
                <button
                  type="button"
                  onClick={onOpenCulturalCheck}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-serif font-bold text-sm tracking-wide border transition-all cursor-pointer ${
                    status === 'REVIEW'
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-400/30 animate-pulse'
                      : status === 'CAUTION'
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CULTURAL CHECK ({status})</span>
                </button>
              </div>

              {/* Secondary Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={onBackToStudio}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Quay lại phòng thiết kế</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenLookbook}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#B84A39] hover:bg-[#A33827] text-white font-serif font-semibold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4 text-[#FFE27D]" />
                  <span>HOÀN THÀNH & XUẤT LOOKBOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
