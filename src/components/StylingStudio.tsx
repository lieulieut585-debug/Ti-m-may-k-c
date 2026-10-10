import React, { useState } from 'react';
import {
  StylingSelection,
  OccasionType,
  ContextGroupId,
  VietPhucId,
  PersonalStyleType,
  StyleDnaType,
  ColorMoodType,
  AccessoryType,
  ColorSwatch,
  AvatarProfile,
  RemixScissorsState,
  RemixHistoryItem
} from '../types';
import {
  CULTURAL_GARMENTS,
  COLOR_MOOD_PALETTES,
  SAMPLE_MEMORY_ORDER,
  CONTEXT_GROUPS,
  STYLE_DNA_ITEMS,
  DEFAULT_REMIX_SCISSORS
} from '../data/culturalKnowledge';
import { GarmentIllustration } from './GarmentIllustration';
import { TryOnAvatarControl } from './TryOnAvatarControl';
import { RemixScissorsPanel } from './RemixScissorsPanel';
import {
  Sparkles,
  Scissors,
  Check,
  Info,
  Calendar,
  Palette,
  Watch,
  User,
  HeartHandshake,
  AlertCircle,
  Sliders,
  Dna
} from 'lucide-react';

interface StylingStudioProps {
  initialSelection: StylingSelection;
  isMemoryOrderMode: boolean;
  onSubmitStyling: (selection: StylingSelection) => void;
  isLoading: boolean;
  onCancelMemoryOrder?: () => void;
}

const GARMENTS: { id: VietPhucId; name: string; desc: string }[] = [
  { id: 'ao_ngu_than', name: 'Áo Ngũ Thân', desc: 'Tay chẽn, năm thân chuẩn mực' },
  { id: 'ao_tac', name: 'Áo Tấc', desc: 'Tay thụng lễ phục trang nghiêm' },
  { id: 'ao_nhat_binh', name: 'Áo Nhật Bình', desc: 'Cổ chữ nhật quý phái' },
  { id: 'ao_dai', name: 'Áo dài', desc: 'Tà áo thanh tân thướt tha' }
];

const COLOR_MOODS: { id: ColorMoodType; label: string; toneDesc: string; hexSample: string }[] = [
  { id: 'Neutral', label: 'Neutral', toneDesc: 'Mộc, trắng ngà, tro gốm', hexSample: '#DED6CB' },
  { id: 'Warm', label: 'Warm', toneDesc: 'Chu sa, hoàng yến, đất nung', hexSample: '#B84A39' },
  { id: 'Cool', label: 'Cool', toneDesc: 'Chàm, men ngọc, lam khói', hexSample: '#2E5266' },
  { id: 'Pastel', label: 'Pastel', toneDesc: 'Hồng sen non, cốm nhạt, hoa cà', hexSample: '#E8A598' },
  { id: 'Dark', label: 'Dark', toneDesc: 'Sơn mài đen, huyết dụ, đồng cổ', hexSample: '#1C1D21' }
];

const ACCESSORIES: AccessoryType[] = [
  'Quần dài',
  'Chân váy dài',
  'Sneakers',
  'Loafers',
  'Boots',
  'Túi',
  'Trang sức',
  'Khăn',
  'Quạt',
  'Phụ kiện tóc'
];

export const StylingStudio: React.FC<StylingStudioProps> = ({
  initialSelection,
  isMemoryOrderMode,
  onSubmitStyling,
  isLoading,
  onCancelMemoryOrder
}) => {
  const [selection, setSelection] = useState<StylingSelection>({
    ...initialSelection,
    contextGroup: initialSelection.contextGroup || 'CAMPUS',
    styleDna: initialSelection.styleDna || ['Viet Contemporary', 'Minimal'],
    styleMixer: initialSelection.styleMixer !== undefined ? initialSelection.styleMixer : 45,
    avatarProfile: initialSelection.avatarProfile || {
      gender: 'female',
      skinTone: 'light',
      bodyShape: 'regular'
    },
    remixScissors: initialSelection.remixScissors || DEFAULT_REMIX_SCISSORS
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isBeforeView, setIsBeforeView] = useState<boolean>(false);
  const [remixHistory, setRemixHistory] = useState<RemixHistoryItem[]>([
    {
      id: 'init',
      label: 'Nguyên bản',
      timestamp: Date.now(),
      scissors: DEFAULT_REMIX_SCISSORS
    }
  ]);

  const currentGarment = CULTURAL_GARMENTS[selection.vietPhucId];
  const currentPalette: ColorSwatch[] = COLOR_MOOD_PALETTES[selection.colorMood] || [];

  // Handle Style DNA toggle (Up to 2 selections)
  const handleToggleStyleDna = (dna: StyleDnaType) => {
    setSelection((prev) => {
      const current = prev.styleDna || [];
      if (current.includes(dna)) {
        return { ...prev, styleDna: current.filter((d) => d !== dna) };
      } else {
        if (current.length >= 2) {
          // Replace second or take last 2
          return { ...prev, styleDna: [current[1], dna] };
        } else {
          return { ...prev, styleDna: [...current, dna] };
        }
      }
    });
  };

  // Handle Context selection
  const handleSelectContext = (contextId: ContextGroupId) => {
    const contextMap: Record<ContextGroupId, OccasionType> = {
      CAMPUS: 'Kỷ yếu',
      SOCIAL: 'Concert',
      FORMAL: 'Lễ hội',
      CULTURAL: 'Sự kiện văn hóa',
      CONTENT: 'Đi chơi / Café'
    };
    setSelection((prev) => ({
      ...prev,
      contextGroup: contextId,
      occasion: contextMap[contextId] || 'Sự kiện văn hóa'
    }));
  };

  // Handle Scissors change
  const handleChangeScissors = (updatedScissors: RemixScissorsState, stepLabel?: string) => {
    setSelection((prev) => ({ ...prev, remixScissors: updatedScissors }));
    setIsBeforeView(false);

    if (stepLabel) {
      setRemixHistory((prev) => [
        ...prev.slice(-4), // keep last 5 steps
        {
          id: Math.random().toString(36).substring(2, 7),
          label: stepLabel,
          timestamp: Date.now(),
          scissors: updatedScissors
        }
      ]);
    }
  };

  // Handle Restore History
  const handleRestoreHistory = (idx: number) => {
    const item = remixHistory[idx];
    if (item) {
      setSelection((prev) => ({ ...prev, remixScissors: item.scissors }));
      setIsBeforeView(false);
    }
  };

  // Handle Reset to Original
  const handleResetToOriginal = () => {
    setSelection((prev) => ({
      ...prev,
      remixScissors: DEFAULT_REMIX_SCISSORS,
      styleMixer: 20
    }));
    setIsBeforeView(false);
    setRemixHistory([
      {
        id: 'reset',
        label: 'Nguyên bản',
        timestamp: Date.now(),
        scissors: DEFAULT_REMIX_SCISSORS
      }
    ]);
  };

  const getStyleMixerLabel = (val: number) => {
    if (val <= 25) return '20% Gần nguyên bản';
    if (val <= 60) return '50% Contemporary';
    if (val <= 85) return '80% Fashion Remix';
    return '100% Experimental';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Memory Order Mode Banner if active */}
      {isMemoryOrderMode && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-base">
                  ĐƠN HÀNG KÝ ỨC: {SAMPLE_MEMORY_ORDER.customerName}
                </span>
                <span className="text-[11px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Tân sinh viên
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                <span className="font-medium text-stone-800">Yêu cầu: </span>
                {SAMPLE_MEMORY_ORDER.situation}
              </p>
              <p className="text-xs text-amber-900 font-medium mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  Kỉ vật cần phối: <strong>{SAMPLE_MEMORY_ORDER.memoryObject}</strong> (Nhớ chọn Quạt trong phụ kiện!)
                </span>
              </p>
            </div>
          </div>
          {onCancelMemoryOrder && (
            <button
              onClick={onCancelMemoryOrder}
              className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 shrink-0 cursor-pointer"
            >
              Quay lại chế độ tự phối
            </button>
          )}
        </div>
      )}

      {/* Main Studio Title & Stepper Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Phòng Thiết Kế • Tiệm May Ký Ức
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              THỬ TRÊN BẠN – BIẾN HÓA KÉO REMIX – KIỂM TRA VĂN HÓA CÙNG ANH CẢ
            </p>
          </div>
          <div className="text-xs text-stone-400 font-mono tracking-wide">
            BƯỚC {activeStep} / 4
          </div>
        </div>

        {/* Step Navigation Pill Strip */}
        <div className="grid grid-cols-4 gap-2 p-1.5 bg-stone-200/60 rounded-xl max-w-xl">
          {[
            { step: 1, label: '📍 Bối Cảnh' },
            { step: 2, label: '👘 Việt Phục' },
            { step: 3, label: '🧬 Style DNA' },
            { step: 4, label: '🎨 Tông Màu' },
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`py-1.5 sm:py-2 text-center rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Three Column Responsive Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Selections (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* STEP 1: CHỌN BỐI CẢNH (5 Nhóm không gian & hoạt động) */}
          <div
            className={`bg-white/85 backdrop-blur-xs rounded-2xl p-5 border transition-all ${
              activeStep === 1 ? 'border-[#B84A39] shadow-sm ring-1 ring-[#B84A39]/30' : 'border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B84A39]" />
                STEP 1 — 📍 CHỌN BỐI CẢNH (CONTEXT SELECTION)
              </label>
              <span className="text-xs font-semibold text-[#B84A39] bg-[#B84A39]/10 px-2.5 py-0.5 rounded-full">
                {selection.contextGroup}
              </span>
            </div>
            <div className="space-y-2">
              {CONTEXT_GROUPS.map((ctx) => {
                const isSelected = selection.contextGroup === ctx.id;
                return (
                  <button
                    key={ctx.id}
                    type="button"
                    onClick={() => {
                      handleSelectContext(ctx.id);
                      setActiveStep(2);
                    }}
                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1F1F24] text-white border-[#1F1F24] shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs sm:text-sm">{ctx.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className={`text-[11px] mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                      {ctx.description}
                    </div>
                    <div className={`text-[10px] mt-0.5 italic ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                      Hoạt động: {ctx.spaceAndActivity}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: VIỆT PHỤC KHỞI ĐẦU */}
          <div
            className={`bg-white/85 backdrop-blur-xs rounded-2xl p-5 border transition-all ${
              activeStep === 2 ? 'border-[#B84A39] shadow-sm ring-1 ring-[#B84A39]/30' : 'border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#B84A39]" />
                STEP 2 — 👘 CHỌN VIỆT PHỤC KHỞI ĐẦU
              </label>
              <span className="text-xs font-semibold text-[#B84A39] bg-[#B84A39]/10 px-2.5 py-0.5 rounded-full">
                {currentGarment.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GARMENTS.map((g) => {
                const isSelected = selection.vietPhucId === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setSelection((p) => ({ ...p, vietPhucId: g.id }));
                      setActiveStep(3);
                    }}
                    className={`p-3 rounded-xl text-left transition-all cursor-pointer border relative ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm">{g.name}</div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {g.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: STYLE DNA & STYLE MIXER SLIDER */}
          <div
            className={`bg-white/85 backdrop-blur-xs rounded-2xl p-5 border transition-all ${
              activeStep === 3 ? 'border-[#B84A39] shadow-sm ring-1 ring-[#B84A39]/30' : 'border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <Dna className="w-4 h-4 text-[#B84A39]" />
                STEP 3 — 🧬 STYLE DNA (CHỌN TỐI ĐA 2)
              </label>
              <span className="text-xs text-stone-500 font-mono">
                {selection.styleDna.length}/2
              </span>
            </div>

            <p className="text-[11px] text-stone-500 mb-3">
              Định hình cá tính thẩm mỹ Gen Z giao thoa cùng tà áo truyền thống
            </p>

            {/* Style DNA Grid */}
            <div className="grid grid-cols-2 gap-2">
              {STYLE_DNA_ITEMS.map((item) => {
                const isSelected = selection.styleDna.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleStyleDna(item.id)}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#B84A39] text-white border-[#B84A39] shadow-2xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">
                        {item.icon} {item.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* STYLE MIXER SLIDER */}
            <div className="mt-5 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] uppercase font-bold text-stone-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#B84A39]" />
                  🎛️ STYLE MIXER
                </span>
                <span className="text-xs font-bold text-[#B84A39] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {getStyleMixerLabel(selection.styleMixer)}
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={selection.styleMixer}
                onChange={(e) =>
                  setSelection((p) => ({ ...p, styleMixer: Number(e.target.value) }))
                }
                className="w-full accent-[#B84A39] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span>TRUYỀN THỐNG (0%)</span>
                <span>GEN Z EXPERIMENTAL (100%)</span>
              </div>

              <div className="mt-2 p-2.5 bg-stone-100 rounded-xl text-[10px] text-stone-500 leading-snug">
                💡 <em>Ghi chú:</em> Thanh này thể hiện mức độ phá cách về styling, không đồng nghĩa với đúng/sai văn hóa.
              </div>
            </div>
          </div>

          {/* STEP 4: COLOR MOOD */}
          <div
            className={`bg-white/85 backdrop-blur-xs rounded-2xl p-5 border transition-all ${
              activeStep === 4 ? 'border-[#B84A39] shadow-sm ring-1 ring-[#B84A39]/30' : 'border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#B84A39]" />
                STEP 4 — COLOR MOOD
              </label>
              <span className="text-xs font-semibold text-[#B84A39] bg-[#B84A39]/10 px-2.5 py-0.5 rounded-full">
                {selection.colorMood}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COLOR_MOODS.map((cm) => {
                const isSelected = selection.colorMood === cm.id;
                return (
                  <button
                    key={cm.id}
                    type="button"
                    onClick={() => setSelection((p) => ({ ...p, colorMood: cm.id }))}
                    className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1F1F24] text-white border-[#1F1F24] shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-xs"
                      style={{ backgroundColor: cm.hexSample }}
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-xs">{cm.label}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                        {cm.toneDesc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: TRY-ON + VISUAL CANVAS + REMIX SCISSORS (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-[#E8E1D5] shadow-sm flex flex-col items-center sticky top-24">
          {/* A. THỬ TRÊN BẠN CONTROL PANEL */}
          <TryOnAvatarControl
            avatarProfile={
              selection.avatarProfile || {
                gender: 'female',
                skinTone: 'light',
                bodyShape: 'regular'
              }
            }
            onChangeAvatar={(updated) =>
              setSelection((prev) => ({ ...prev, avatarProfile: updated }))
            }
          />

          {/* B. GARMENT ILLUSTRATION WITH CHARACTER & BEFORE/AFTER */}
          <GarmentIllustration
            garmentId={selection.vietPhucId}
            palette={currentPalette}
            colorMood={selection.colorMood}
            accessories={selection.accessories}
            avatarProfile={selection.avatarProfile}
            remixScissors={selection.remixScissors}
            isBeforeView={isBeforeView}
            onToggleBeforeAfter={(val) => setIsBeforeView(val)}
            className="w-full"
          />

          {/* C. CÂY KÉO REMIX INTERACTIVE CONTROL PANEL */}
          <RemixScissorsPanel
            scissors={selection.remixScissors || DEFAULT_REMIX_SCISSORS}
            onChangeScissors={handleChangeScissors}
            history={remixHistory}
            onRestoreHistory={handleRestoreHistory}
            onResetToOriginal={handleResetToOriginal}
          />

          {/* PRIMARY CTA: ĐỂ ANH CẢ XEM THỬ */}
          <div className="w-full mt-5">
            <button
              type="button"
              onClick={() => onSubmitStyling(selection)}
              disabled={isLoading}
              className="w-full group relative overflow-hidden bg-[#B84A39] hover:bg-[#A33827] text-white rounded-2xl py-4 px-6 text-center shadow-md hover:shadow-lg transition-all duration-300 font-serif font-bold text-base sm:text-lg tracking-wide uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-[#963020]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Anh Cả đang soi xét kỹ...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFE27D] transition-transform group-hover:rotate-12" />
                  <span>ĐỂ ANH CẢ XEM THỬ</span>
                </div>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-400 mt-2 font-normal">
              Gemini AI Stylist sẽ đánh giá thẩm mỹ, guardrail văn hóa và mở Mảnh Ghép Ký Ức.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Stylist & Cultural Advisory (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-5">
          {/* ANH CẢ Avatar & Live Persona Card */}
          <div className="bg-gradient-to-br from-[#FAF5EE] to-[#F2EDE4] rounded-2xl p-5 border border-[#E8E1D5] shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#1F1F24] text-white flex items-center justify-center font-serif text-lg font-bold border-2 border-[#D4AF37] shadow-xs">
                A.C
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  ANH CẢ
                  <span className="text-[10px] font-sans font-semibold bg-[#2A7B68] text-white px-1.5 py-0.2 rounded-full">
                    AI Stylist
                  </span>
                </h3>
                <p className="text-[11px] text-stone-500">
                  Cố vấn văn hóa • Di sản & Gen Z
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80 text-xs text-stone-700 leading-relaxed italic relative">
              <span className="text-xl font-serif text-[#B84A39] absolute -top-2 left-2">“</span>
              <p className="pl-3">
                Cứ mạnh dạn dùng Kéo Remix nhé! Bạn muốn cắt ngắn thành Cropped phối Chân váy xếp ly đi Campus? Cứ thử đi! Mình sẽ giúp bạn nhận diện đâu là nét nguyên bản cần giữ, và đâu là phiên bản sáng tạo đương đại.
              </p>
            </div>
          </div>

          {/* Cultural Knowledge Glimpse for currently selected garment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-stone-900 font-serif font-bold text-xs uppercase tracking-wide">
              <Info className="w-4 h-4 text-[#C29B38]" />
              <span>Ghi Chú Văn Hóa: {currentGarment.name}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              {currentGarment.shortDescription}
            </p>

            <div className="space-y-2 border-t border-stone-100 pt-3 text-[11px]">
              <div>
                <span className="font-semibold text-stone-800">Cốt lõi giữ lại: </span>
                <span className="text-stone-600">{currentGarment.giu_lai[0]}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-800">Tự do biến tấu: </span>
                <span className="text-stone-600">{currentGarment.co_the_remix[0]}</span>
              </div>
            </div>
          </div>

          {/* Responsible AI Notice */}
          <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-[11px] text-stone-500 space-y-1.5">
            <div className="font-semibold text-stone-700 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#B84A39]" />
              <span>Quy Tắc Responsible AI:</span>
            </div>
            <p>
              Phân biệt tuyệt đối giữa <strong>Trang phục truyền thống nguyên bản</strong> và <strong>Contemporary Reinterpretation</strong>. Không quy chụp bản cách tân là sai, nhưng cũng không gọi bản cắt ngắn là y phục truyền thống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
