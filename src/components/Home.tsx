import React from 'react';
import { Sparkles, HeartHandshake, ArrowRight, ShieldCheck, BookOpen, Compass, Layers } from 'lucide-react';
import { CULTURAL_GARMENTS } from '../data/culturalKnowledge';
import { VietPhucId } from '../types';

interface HomeProps {
  onStartSelfStyling: () => void;
  onStartMemoryOrder: () => void;
  onSelectGarmentDirect?: (garmentId: VietPhucId) => void;
}

export const Home: React.FC<HomeProps> = ({
  onStartSelfStyling,
  onStartMemoryOrder,
  onSelectGarmentDirect,
}) => {
  const garments = Object.values(CULTURAL_GARMENTS);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Hero Section */}
      <div className="relative text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-10">
        {/* Subtle decorative heritage badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B84A39]/10 border border-[#B84A39]/20 text-[#B84A39] text-xs font-semibold tracking-widest uppercase mb-6 shadow-xs animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#B84A39] animate-ping" />
          <span>AI Cultural Stylist Studio • Giới Trẻ & Di Sản</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1F1F24] leading-[1.15] mb-5">
          TIỆM MAY KÝ ỨC
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#8E3224] tracking-wide mb-4">
          “Chạm ký ức. Phối chất riêng. Giữ nét Việt.”
        </p>

        {/* Supporting statement */}
        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed mb-10">
          Remix tự do — nhưng không đánh mất cái làm nên Việt phục.
        </p>

        {/* Action Buttons: TỰ PHỐI CHO MÌNH is visually dominant */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 max-w-xl mx-auto">
          {/* Primary Dominant Button: TỰ PHỐI CHO MÌNH */}
          <button
            onClick={onStartSelfStyling}
            className="flex-1 group relative overflow-hidden bg-[#B84A39] hover:bg-[#A33827] text-white rounded-2xl p-5 sm:p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-[#963020]"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-wide uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFE27D]" />
                TỰ PHỐI CHO MÌNH
              </span>
              <ArrowRight className="w-5 h-5 text-white/80 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-white/90 text-xs sm:text-sm font-light leading-snug">
              Phối một look Việt phục cho chính bạn.
            </p>
            <div className="mt-3 inline-flex items-center text-[11px] font-medium text-[#FFE27D] tracking-wider uppercase">
              Bắt đầu sáng tạo ngay →
            </div>
          </button>

          {/* Secondary Button: ĐƠN HÀNG KÝ ỨC */}
          <button
            onClick={onStartMemoryOrder}
            className="flex-1 group bg-[#F2EDE4] hover:bg-[#E8E1D5] text-[#222] rounded-2xl p-5 sm:p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 border border-[#DED5C7] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide uppercase text-stone-800 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#B84A39]" />
                ĐƠN HÀNG KÝ ỨC
              </span>
              <ArrowRight className="w-4 h-4 text-stone-500 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-stone-600 text-xs sm:text-sm font-normal leading-snug">
              Giải một bài toán phối đồ và khám phá câu chuyện phía sau.
            </p>
            <div className="mt-3 inline-flex items-center text-[11px] font-medium text-stone-500 tracking-wider uppercase">
              Thử thách khách hàng Mai →
            </div>
          </button>
        </div>
      </div>

      {/* Heritage Garments Quick Discovery Showcase */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1F24]">
              Bốn Dáng Việt Phục Tiêu Biểu
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Mỗi dáng áo mang một câu chuyện văn hóa nguyên bản từ các nguồn sử liệu đáng tin cậy.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs text-[#B84A39] font-medium bg-[#B84A39]/10 px-3 py-1 rounded-full">
            Dữ liệu văn hóa chuẩn xác
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {garments.map((g) => (
            <div
              key={g.id}
              onClick={() => {
                if (onSelectGarmentDirect) {
                  onSelectGarmentDirect(g.id);
                } else {
                  onStartSelfStyling();
                }
              }}
              className="group bg-white/80 hover:bg-white rounded-2xl p-5 border border-[#E8E1D5] hover:border-[#B84A39]/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 font-medium mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#B84A39]">
                    {g.period.split('(')[0]}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#B84A39]/30 group-hover:bg-[#B84A39] transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#B84A39] transition-colors mb-1">
                  {g.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {g.shortDescription}
                </p>
              </div>

              <div>
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs font-medium text-stone-700">
                  <span className="text-[11px] text-stone-500">Chọn phối dáng này</span>
                  <span className="text-[#B84A39] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principle Footer Strip */}
      <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A7B68]" />
            <span>Cultural Guardrail 3 Cấp Độ</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C29B38]" />
            <span>Mảnh Ghép Ký Ức Lịch Sử</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#B84A39]" />
            <span>Lookbook Đương Đại</span>
          </div>
        </div>
        <div className="text-stone-400">
          Tiệm May Ký Ức © 2026 • Giữ nét Việt, phối chất riêng
        </div>
      </div>
    </div>
  );
};
