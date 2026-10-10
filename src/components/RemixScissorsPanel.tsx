import React, { useState } from 'react';
import { RemixScissorsState, RemixHistoryItem } from '../types';
import { Scissors, Sparkles, RotateCcw, ChevronDown, ChevronUp, History, Check } from 'lucide-react';
import { DEFAULT_REMIX_SCISSORS } from '../data/culturalKnowledge';

interface RemixScissorsPanelProps {
  scissors: RemixScissorsState;
  onChangeScissors: (updated: RemixScissorsState, stepLabel?: string) => void;
  history: RemixHistoryItem[];
  onRestoreHistory: (index: number) => void;
  onResetToOriginal: () => void;
}

const SILHOUETTES: RemixScissorsState['silhouette'][] = [
  'Giữ nguyên',
  'Cropped',
  'Oversized',
  'Fitted',
  'Layered',
  'Asymmetric',
];

const LENGTHS: RemixScissorsState['length'][] = [
  'Full length (Nguyên bản)',
  'Midi',
  'Cropped (Lửng hiện đại)',
  'Layer ngắn',
];

const COLOR_REMIXES: RemixScissorsState['colorRemix'][] = [
  'Giữ màu truyền thống',
  'Monochrome',
  'Pastel',
  'Contrast',
  'Color blocking',
  'Gen Z palette',
];

const BOTTOM_REMIXES: RemixScissorsState['bottomRemix'][] = [
  'Quần dài truyền thống',
  'Chân váy dài',
  'Pleated skirt (Chân váy xếp ly)',
  'Wide-leg pants',
  'Jeans',
];

const LAYER_REMIXES: RemixScissorsState['layerRemix'][] = [
  'Không layer',
  'Khoác ngoài (Outer jacket)',
  'Áo trong (Inner top)',
  'Phối 4 tà / Layer lụa',
];

const ACCESSORY_REMIXES = [
  'Túi mini',
  'Sneakers',
  'Loafers',
  'Boots',
  'Kính',
  'Phụ kiện tóc',
  'Belt',
  'Trang sức',
  'Quạt',
];

export const RemixScissorsPanel: React.FC<RemixScissorsPanelProps> = ({
  scissors,
  onChangeScissors,
  history,
  onRestoreHistory,
  onResetToOriginal,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleUpdate = (field: keyof RemixScissorsState, value: any, label: string) => {
    const updated = { ...scissors, [field]: value };
    onChangeScissors(updated, label);
  };

  const handleToggleAccessory = (acc: string) => {
    const current = scissors.accessoryRemix || [];
    const exists = current.includes(acc);
    const updated = exists ? current.filter((a) => a !== acc) : [...current, acc];
    handleUpdate('accessoryRemix', updated, exists ? `- ${acc}` : `+ ${acc}`);
  };

  return (
    <div className="w-full bg-white/95 rounded-2xl border border-stone-200 shadow-sm overflow-hidden mt-4">
      {/* Header bar / Toggle */}
      <div className="p-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#B84A39] flex items-center justify-center text-white">
            <Scissors className="w-4 h-4 -rotate-45" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-stone-100 flex items-center gap-1.5">
              ✂️ CÂY KÉO REMIX
              <span className="text-[10px] font-sans font-semibold bg-purple-600 text-white px-2 py-0.2 rounded-full">
                Interactive Styling
              </span>
            </h3>
            <p className="text-[10px] text-stone-300">
              Biến hóa trực tiếp phom dáng & tỷ lệ outfit trên người nhân vật
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetToOriginal}
            className="text-[11px] text-stone-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            title="Khôi phục nguyên bản"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Nguyên bản</span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-4 text-xs">
          {/* 1. SILHOUETTE */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
              ✂️ SILHOUETTE (PHOM DÁNG)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {SILHOUETTES.map((s) => {
                const isActive = scissors.silhouette === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleUpdate('silhouette', s, s)}
                    className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. LENGTH */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
              📏 LENGTH (CHIỀU DÀI TÀ ÁO)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {LENGTHS.map((l) => {
                const isActive = scissors.length === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => handleUpdate('length', l, l)}
                    className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-[#B84A39] text-white border-[#B84A39] shadow-2xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. BOTTOM REMIX */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block">
                👗 BOTTOM REMIX (TRANG PHỤC DƯỚI)
              </label>
              <span className="text-[10px] text-stone-400 italic">
                *Phối cùng ≠ thay đổi cấu trúc áo
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {BOTTOM_REMIXES.map((b) => {
                const isActive = scissors.bottomRemix === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleUpdate('bottomRemix', b, b)}
                    className={`p-1.5 rounded-lg text-[11px] font-medium border text-left transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. LAYER & COLOR REMIX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Layer */}
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
                🧥 LAYER REMIX
              </label>
              <select
                value={scissors.layerRemix}
                onChange={(e) => handleUpdate('layerRemix', e.target.value, e.target.value)}
                className="w-full p-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 text-[11px] font-medium cursor-pointer"
              >
                {LAYER_REMIXES.map((lr) => (
                  <option key={lr} value={lr}>
                    {lr}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Remix Mood */}
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
                🎨 COLOR REMIX MOOD
              </label>
              <select
                value={scissors.colorRemix}
                onChange={(e) => handleUpdate('colorRemix', e.target.value, e.target.value)}
                className="w-full p-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 text-[11px] font-medium cursor-pointer"
              >
                {COLOR_REMIXES.map((cr) => (
                  <option key={cr} value={cr}>
                    {cr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. ACCESSORY REMIX (Quick Toggle Pills) */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
              🧢 ACCESSORY REMIX (PHỤ KIỆN ĐƯƠNG ĐẠI)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ACCESSORY_REMIXES.map((acc) => {
                const isSelected = (scissors.accessoryRemix || []).includes(acc);
                return (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => handleToggleAccessory(acc)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-800 text-white border-amber-800 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{acc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. REMIX HISTORY BREADCRUMB */}
          {history.length > 0 && (
            <div className="pt-3 border-t border-stone-100">
              <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400 uppercase font-bold mb-1.5">
                <History className="w-3.5 h-3.5 text-stone-500" />
                <span>⏳ REMIX HISTORY (LỊCH SỬ BIẾN HÓA)</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                <button
                  type="button"
                  onClick={onResetToOriginal}
                  className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 hover:bg-stone-300 font-medium shrink-0 cursor-pointer"
                >
                  Original
                </button>
                {history.map((h, idx) => (
                  <React.Fragment key={h.id}>
                    <span className="text-stone-300 shrink-0">→</span>
                    <button
                      type="button"
                      onClick={() => onRestoreHistory(idx)}
                      className={`px-2 py-0.5 rounded font-medium shrink-0 cursor-pointer ${
                        idx === history.length - 1
                          ? 'bg-[#B84A39] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {h.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
