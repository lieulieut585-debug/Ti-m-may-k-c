import React, { useState } from 'react';
import {
  VietPhucId,
  ColorMoodType,
  ColorSwatch,
  AvatarProfile,
  RemixScissorsState,
} from '../types';
import { CULTURAL_GARMENTS, DEFAULT_REMIX_SCISSORS } from '../data/culturalKnowledge';
import { Eye, Sparkles, User, Image as ImageIcon } from 'lucide-react';

interface GarmentIllustrationProps {
  garmentId: VietPhucId;
  palette: ColorSwatch[];
  colorMood?: ColorMoodType;
  accessories?: string[];
  avatarProfile?: AvatarProfile;
  remixScissors?: RemixScissorsState;
  isBeforeView?: boolean;
  onToggleBeforeAfter?: (isBefore: boolean) => void;
  className?: string;
  showDetails?: boolean;
}

export const GarmentIllustration: React.FC<GarmentIllustrationProps> = ({
  garmentId,
  palette,
  accessories = [],
  avatarProfile,
  remixScissors = DEFAULT_REMIX_SCISSORS,
  isBeforeView: externalIsBeforeView,
  onToggleBeforeAfter,
  className = '',
  showDetails = true,
}) => {
  const [internalIsBefore, setInternalIsBefore] = useState(false);

  const isBefore = externalIsBeforeView !== undefined ? externalIsBeforeView : internalIsBefore;

  const handleToggle = (val: boolean) => {
    if (onToggleBeforeAfter) {
      onToggleBeforeAfter(val);
    } else {
      setInternalIsBefore(val);
    }
  };

  const garment = CULTURAL_GARMENTS[garmentId] || CULTURAL_GARMENTS.ao_ngu_than;

  // Active styles based on whether we are in "Before" (Strictly Original) or "After" (Remix)
  const scissors = isBefore ? DEFAULT_REMIX_SCISSORS : remixScissors;

  // Colors
  const primaryColor = palette[0]?.hex || '#2C4A5E';
  const secondaryColor = palette[1]?.hex || '#EAE5D9';
  const accentColor = palette[2]?.hex || '#B84A39';
  const highlightColor = palette[3]?.hex || '#D4AF37';

  // Skin tone
  const skinToneHex =
    avatarProfile?.skinTone === 'light'
      ? '#FDE5D4'
      : avatarProfile?.skinTone === 'warm'
      ? '#C68B59'
      : '#E2B188';

  // Hair color
  const hairColor = '#1F1A17';

  // Check if current look is considered Contemporary Reinterpretation
  const isRemixed =
    !isBefore &&
    (scissors.length !== 'Full length (Nguyên bản)' ||
      scissors.silhouette !== 'Giữ nguyên' ||
      scissors.bottomRemix !== 'Quần dài truyền thống' ||
      scissors.layerRemix !== 'Không layer' ||
      scissors.colorRemix !== 'Giữ màu truyền thống');

  // Height of garment hem depending on length scissor
  const isCroppedHem = scissors.length === 'Cropped (Lửng hiện đại)' || scissors.silhouette === 'Cropped';
  const isMidiHem = scissors.length === 'Midi';
  const isLayerNgan = scissors.length === 'Layer ngắn';

  // Bottom type
  const isPleatedSkirt = scissors.bottomRemix === 'Pleated skirt (Chân váy xếp ly)';
  const isJeans = scissors.bottomRemix === 'Jeans';
  const isWideLeg = scissors.bottomRemix === 'Wide-leg pants';
  const isChânVáyDài = scissors.bottomRemix === 'Chân váy dài';

  // Footwear
  const allAccessories = [...accessories, ...(scissors.accessoryRemix || [])];
  const hasBoots = allAccessories.includes('Boots');
  const hasSneakers = allAccessories.includes('Sneakers');
  const hasQuat = allAccessories.includes('Quạt');
  const hasKinh = allAccessories.includes('Kính');
  const hasTui = allAccessories.includes('Túi') || allAccessories.includes('Túi mini');

  // SVG Render with illustrated character model
  const renderCharacterAndOutfit = () => {
    // Hem Y-coordinates:
    // Full: ~350, Midi: ~270, Cropped: ~200, Layer ngắn: ~180
    const hemY = isCroppedHem ? 200 : isLayerNgan ? 185 : isMidiHem ? 270 : 355;
    const bodyScaleX = avatarProfile?.bodyShape === 'curvy' ? 1.08 : avatarProfile?.bodyShape === 'slim' ? 0.94 : 1;

    return (
      <svg
        viewBox="0 0 320 460"
        className="w-full h-full drop-shadow-md select-none transition-all duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="primaryFabric" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E2824" />
            <stop offset="100%" stopColor="#14110F" />
          </linearGradient>
        </defs>

        {/* 1. CHARACTER MODEL BASE (Legs, Shoes, Head, Arms) */}
        {/* Legs / Lower Body */}
        {/* Render Shoes */}
        {hasBoots ? (
          <g id="boots">
            <rect x="115" y="410" width="30" height="35" rx="5" fill="#1C1D21" stroke="#333" strokeWidth="1.5" />
            <rect x="175" y="410" width="30" height="35" rx="5" fill="#1C1D21" stroke="#333" strokeWidth="1.5" />
            <path d="M110 435 L148 435 L148 446 L108 446 Z" fill="#2E2F33" />
            <path d="M172 435 L210 435 L210 446 L170 446 Z" fill="#2E2F33" />
          </g>
        ) : hasSneakers ? (
          <g id="sneakers">
            <rect x="114" y="420" width="32" height="25" rx="6" fill="#F8F8F8" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="174" y="420" width="32" height="25" rx="6" fill="#F8F8F8" stroke="#D1D5DB" strokeWidth="1.5" />
            <path d="M112 438 L148 438 L148 445 L110 445 Z" fill="#E5E7EB" />
            <path d="M172 438 L208 438 L208 445 L170 445 Z" fill="#E5E7EB" />
            <circle cx="122" cy="427" r="1.5" fill="#B84A39" />
            <circle cx="182" cy="427" r="1.5" fill="#B84A39" />
          </g>
        ) : (
          /* Classic Loafers / Guốc mộc */
          <g id="loafers">
            <ellipse cx="130" cy="432" rx="16" ry="8" fill="#3E2723" stroke="#1A120B" strokeWidth="1.2" />
            <ellipse cx="190" cy="432" rx="16" ry="8" fill="#3E2723" stroke="#1A120B" strokeWidth="1.2" />
          </g>
        )}

        {/* Lower Garment (Pants / Skirt) */}
        {isPleatedSkirt ? (
          /* Contemporary Pleated Skirt (Chân váy xếp ly) */
          <g id="pleatedSkirt">
            <path
              d="M120 200 L200 200 L225 365 L95 365 Z"
              fill={secondaryColor}
              stroke="#2E2E2E"
              strokeWidth="1.5"
            />
            {/* Pleat lines */}
            {[105, 120, 135, 150, 165, 180, 195, 210].map((x, i) => (
              <line key={i} x1={x - 5} y1="200" x2={x} y2="365" stroke="#111" strokeOpacity="0.25" strokeWidth="1.2" />
            ))}
            {/* Visible legs under skirt */}
            <rect x="122" y="365" width="16" height="52" rx="4" fill={skinToneHex} />
            <rect x="182" y="365" width="16" height="52" rx="4" fill={skinToneHex} />
          </g>
        ) : isJeans ? (
          /* Wide Jeans */
          <g id="jeans">
            <path
              d="M120 195 L200 195 L215 425 L175 425 L163 260 L157 260 L145 425 L105 425 Z"
              fill="#4A6572"
              stroke="#263238"
              strokeWidth="1.5"
            />
            <line x1="160" y1="200" x2="160" y2="255" stroke="#37474F" strokeWidth="1.5" />
          </g>
        ) : isWideLeg || isChânVáyDài ? (
          /* Chân váy dài / Wide-leg pants */
          <g id="wideSkirtOrPants">
            <path
              d="M118 190 L202 190 L228 425 L92 425 Z"
              fill={secondaryColor}
              stroke="#2D2D2D"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
          </g>
        ) : (
          /* Traditional White Silk Trousers (Quần lụa dài truyền thống) */
          <g id="traditionalTrousers">
            <path
              d="M125 190 L195 190 L208 425 L175 425 L163 270 L157 270 L145 425 L112 425 Z"
              fill={secondaryColor}
              stroke="#2D2D2D"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
          </g>
        )}

        {/* 2. CHARACTER HEAD, HAIR & FACE */}
        <g id="headAndFace">
          {/* Neck */}
          <rect x="148" y="60" width="24" height="30" rx="4" fill={skinToneHex} />

          {/* Head */}
          <ellipse cx="160" cy="52" rx="18" ry="22" fill={skinToneHex} />

          {/* Hair based on Avatar gender */}
          {avatarProfile?.gender === 'female' ? (
            <g id="femaleHair">
              {/* Top hair bun & side tresses */}
              <circle cx="160" cy="24" r="12" fill="url(#hairGrad)" />
              <path
                d="M140 50 Q142 30 160 30 Q178 30 180 50 Q175 40 160 40 Q145 40 140 50 Z"
                fill="url(#hairGrad)"
              />
              <path d="M141 45 C138 60 140 75 143 85" stroke="#1F1A17" strokeWidth="2.5" fill="none" />
              <path d="M179 45 C182 60 180 75 177 85" stroke="#1F1A17" strokeWidth="2.5" fill="none" />
              {/* Hair hairpin trâm cài */}
              <line x1="168" y1="22" x2="182" y2="16" stroke={highlightColor} strokeWidth="2" />
              <circle cx="182" cy="16" r="2.5" fill="#B84A39" />
            </g>
          ) : avatarProfile?.gender === 'male' ? (
            <g id="maleHair">
              {/* Male hair búi củ hành / slick modern undercut */}
              <circle cx="160" cy="26" r="8" fill="url(#hairGrad)" />
              <path
                d="M141 50 Q142 33 160 33 Q178 33 179 50 Q170 38 160 38 Q150 38 141 50 Z"
                fill="url(#hairGrad)"
              />
            </g>
          ) : (
            <g id="neutralHair">
              {/* Sleek neutral styling */}
              <path
                d="M140 52 Q143 32 160 32 Q177 32 180 52 Q175 39 160 39 Q145 39 140 52 Z"
                fill="url(#hairGrad)"
              />
              <path d="M142 50 C140 68 144 80 145 88" stroke="#1F1A17" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* Simple facial features (Eyes & smile) */}
          <circle cx="154" cy="52" r="1.5" fill="#2D2825" />
          <circle cx="166" cy="52" r="1.5" fill="#2D2825" />
          <path d="M157 58 Q160 60 163 58" stroke="#2D2825" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Eyeglasses if selected */}
          {hasKinh && (
            <g id="glasses">
              <circle cx="154" cy="52" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="none" />
              <circle cx="166" cy="52" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="none" />
              <line x1="158.5" y1="52" x2="161.5" y2="52" stroke="#D4AF37" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* 3. VIỆT PHỤC GARMENT BODY RENDER */}
        <g id="garmentBody" transform={`scale(${bodyScaleX}, 1)`} style={{ transformOrigin: '160px 0' }}>
          {garmentId === 'ao_ngu_than' && (
            <g id="aoNguThanRender">
              {/* Tay áo chẽn */}
              <path d="M118 90 L55 180 L80 195 L126 120 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.2" />
              <path d="M202 90 L265 180 L240 195 L194 120 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.2" />

              {/* Thân áo 5 thân với độ dài thích ứng (Full / Cropped / Midi) */}
              <path
                d={`M120 86 L200 86 L212 180 L220 ${hemY} L100 ${hemY} L108 180 Z`}
                fill="url(#primaryFabric)"
                stroke="#1F1F1F"
                strokeWidth="1.5"
              />

              {/* Đường cài khuy bên hữu */}
              <path
                d={`M165 88 Q178 120 185 155 Q195 200 205 ${hemY}`}
                stroke="#1F1F1F"
                strokeWidth="1.5"
                opacity="0.75"
              />

              {/* 5 Hạt cúc cài (Ngũ thường) */}
              <circle cx="160" cy="90" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              <circle cx="168" cy="108" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              <circle cx="178" cy="130" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              <circle cx="188" cy="158" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              {!isCroppedHem && (
                <circle cx="198" cy="195" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              )}

              {/* Cổ áo đứng vuông vắn */}
              <path d="M142 66 L178 66 L178 88 L142 88 Z" fill={primaryColor} stroke="#1A1A1A" strokeWidth="1.5" />
              <path d="M144 70 L176 70" stroke={highlightColor} strokeWidth="1.5" strokeOpacity="0.8" />
            </g>
          )}

          {garmentId === 'ao_tac' && (
            <g id="aoTacRender">
              {/* Tay thụng rộng buông dài */}
              <path d="M110 92 L25 180 L32 295 L95 265 L115 135 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.5" />
              <path d="M210 92 L295 180 L288 295 L225 265 L205 135 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.5" />
              <path d="M25 180 L32 295" stroke={highlightColor} strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M295 180 L288 295" stroke={highlightColor} strokeWidth="2.5" strokeOpacity="0.8" />

              {/* Thân áo rộng thụng */}
              <path
                d={`M115 86 L205 86 L225 190 L235 ${hemY} L85 ${hemY} L95 190 Z`}
                fill="url(#primaryFabric)"
                stroke="#1F1F1F"
                strokeWidth="1.5"
              />

              {/* Cổ đứng */}
              <path d="M140 66 L180 66 L180 88 L140 88 Z" fill={primaryColor} stroke="#1A1A1A" strokeWidth="1.5" />
              <path d="M142 70 L178 70" stroke={highlightColor} strokeWidth="1.5" />

              {/* Khuy cài hữu */}
              <circle cx="160" cy="88" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              <circle cx="170" cy="110" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
              <circle cx="182" cy="136" r="3" fill={highlightColor} stroke="#222" strokeWidth="0.8" />
            </g>
          )}

          {garmentId === 'ao_nhat_binh' && (
            <g id="aoNhatBinhRender">
              {/* Tay áo đối xứng */}
              <path d="M110 92 L40 170 L75 195 L120 125 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.5" />
              <path d="M210 92 L280 170 L245 195 L200 125 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.5" />

              {/* Dải ngũ sắc gấu tay */}
              <rect x="42" y="172" width="28" height="3" transform="rotate(30 42 172)" fill="#2A7B68" />
              <rect x="44" y="175" width="28" height="3" transform="rotate(30 44 175)" fill="#D4AF37" />
              <rect x="46" y="178" width="28" height="3" transform="rotate(30 46 178)" fill="#B84A39" />
              <rect x="250" y="188" width="28" height="3" transform="rotate(-30 250 188)" fill="#2A7B68" />
              <rect x="252" y="185" width="28" height="3" transform="rotate(-30 252 185)" fill="#D4AF37" />
              <rect x="254" y="182" width="28" height="3" transform="rotate(-30 254 182)" fill="#B84A39" />

              {/* Thân áo đối khâm xẻ trước ngực */}
              <path
                d={`M115 86 L205 86 L220 180 L225 ${hemY} L95 ${hemY} L100 180 Z`}
                fill="url(#primaryFabric)"
                stroke="#1F1F1F"
                strokeWidth="1.5"
              />

              {/* Dải cổ chữ nhật to bản trước ngực (Cổ Nhật Bình) */}
              <rect x="135" y="78" width="50" height="56" fill={highlightColor} stroke="#1A1A1A" strokeWidth="1.5" rx="2" />
              <rect x="145" y="85" width="30" height="48" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="1" />

              {/* Hai dải viền chữ nhật chạy dài đối khâm */}
              <rect x="146" y="134" width="13" height={hemY - 134} fill={highlightColor} stroke="#1A1A1A" strokeWidth="1" />
              <rect x="161" y="134" width="13" height={hemY - 134} fill={highlightColor} stroke="#1A1A1A" strokeWidth="1" />

              {/* Nút ngọc giữ vạt áo */}
              <circle cx="160" cy="142" r="4" fill="#F8F8F8" stroke="#8E2818" strokeWidth="1.2" />
              {hemY > 210 && (
                <circle cx="160" cy="188" r="4" fill="#F8F8F8" stroke="#8E2818" strokeWidth="1.2" />
              )}
            </g>
          )}

          {garmentId === 'ao_dai' && (
            <g id="aoDaiRender">
              {/* Tay raglan */}
              <path d="M125 86 L60 190 L80 200 L135 120 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.2" />
              <path d="M195 86 L260 190 L240 200 L185 120 Z" fill="url(#primaryFabric)" stroke="#1F1F1F" strokeWidth="1.2" />

              {/* Thân áo dài ôm eo xẻ tà */}
              <path
                d={`M132 82 Q160 85 188 82 L185 135 Q170 165 174 195 L198 ${hemY} Q160 ${hemY + 10} 122 ${hemY} L146 195 Q150 165 135 135 Z`}
                fill="url(#primaryFabric)"
                stroke="#1F1F1F"
                strokeWidth="1.5"
              />

              {/* Cổ áo thanh thoát */}
              <path d="M146 62 L174 62 L172 82 L148 82 Z" fill={primaryColor} stroke="#1F1F1F" strokeWidth="1.5" />
              <path d="M148 66 L172 66" stroke={highlightColor} strokeWidth="1" />

              {/* Cúc bấm chéo */}
              <path d="M160 82 Q174 95 185 115" stroke={highlightColor} strokeWidth="1.5" strokeDasharray="2 2" />
            </g>
          )}
        </g>

        {/* 4. ACCESSORIES HELD BY HANDS */}
        {hasQuat && (
          <g id="heldFan" transform="translate(65, 175)">
            {/* Paper folding fan */}
            <path d="M0 25 L35 0 C45 15 45 35 35 50 Z" fill="#E8D8C3" stroke="#8D6E63" strokeWidth="1.5" />
            <line x1="0" y1="25" x2="35" y2="0" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="0" y1="25" x2="40" y2="25" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="0" y1="25" x2="35" y2="50" stroke="#5D4037" strokeWidth="1.5" />
            <circle cx="0" cy="25" r="2.5" fill="#D32F2F" />
          </g>
        )}

        {hasTui && (
          <g id="crossbodyBag" transform="translate(210, 190)">
            <rect x="0" y="0" width="28" height="24" rx="4" fill="#2C2C2C" stroke="#111" strokeWidth="1.2" />
            <path d="M-40 -105 Q-15 -45 5 5" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <circle cx="14" cy="10" r="2" fill={highlightColor} />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* TOP HEADER: BEFORE / AFTER TOGGLE SWITCH */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-2">
        <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-xl shadow-2xs">
          <button
            type="button"
            onClick={() => handleToggle(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isBefore
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>👁️ Bản Nguyên Bản (Before)</span>
          </button>
          <button
            type="button"
            onClick={() => handleToggle(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isBefore
                ? 'bg-[#B84A39] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>✨ Bản Remix (After)</span>
          </button>
        </div>

        {/* User photo badge if uploaded */}
        {avatarProfile?.photoUrl && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-stone-200 rounded-full text-[11px] text-stone-700 shadow-2xs">
            <img
              src={avatarProfile.photoUrl}
              alt="Avatar"
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="truncate max-w-[80px] font-medium">
              {avatarProfile.customPhotoName || 'Ảnh của bạn'}
            </span>
          </div>
        )}
      </div>

      {/* CLASSIFICATION BADGE (MANDATORY REQUIREMENT) */}
      <div className="w-full flex justify-center mb-2 px-2">
        {isRemixed ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-500/15 border border-purple-400/40 text-purple-900 text-xs font-semibold shadow-2xs animate-fadeIn text-center">
            <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
            <span>
              ✨ Contemporary Reinterpretation (Phiên bản sáng tạo lấy cảm hứng từ {garment.name})
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-2xs animate-fadeIn text-center">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span>🏮 Trang phục truyền thống nguyên bản ({garment.name})</span>
          </div>
        )}
      </div>

      {/* CHARACTER ON CANVAS */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] flex items-center justify-center py-2 bg-gradient-to-b from-stone-100/40 via-stone-50/60 to-stone-100/40 rounded-3xl border border-stone-200/60">
        {renderCharacterAndOutfit()}
      </div>

      {/* Palette swatches under visual */}
      {showDetails && palette.length > 0 && (
        <div className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-2 bg-stone-100/80 backdrop-blur-xs rounded-xl border border-stone-200">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mr-1">
            Bảng màu:
          </span>
          {palette.slice(0, 4).map((swatch, i) => (
            <div key={i} className="group relative flex items-center">
              <div
                className="w-5 h-5 rounded-full border border-stone-300 shadow-2xs transition-transform duration-200 group-hover:scale-125"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block whitespace-nowrap bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded shadow z-20">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
