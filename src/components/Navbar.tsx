import React from 'react';
import { AppScreen } from '../types';
import { Sparkles, Scissors, BookOpen, BookmarkCheck, ArrowLeft, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  isMemoryOrderMode: boolean;
  onExitMemoryOrder?: () => void;
  hasSavedLookbook?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isMemoryOrderMode,
  onExitMemoryOrder,
  hasSavedLookbook = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          {/* Vietnamese lacquer seal emblem */}
          <div className="w-11 h-11 rounded-xl bg-[#B84A39] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 border border-[#9A3525]">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-wide text-[#1F1F24]">
                TIỆM MAY KÝ ỨC
              </span>
              <span className="hidden md:inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#B84A39]/10 text-[#B84A39] border border-[#B84A39]/20">
                AI Cultural Stylist
              </span>
            </div>
            <p className="text-xs text-stone-500 font-normal tracking-wide hidden sm:block">
              Chạm ký ức. Phối chất riêng. Giữ nét Việt.
            </p>
          </div>
        </button>

        {/* Center Mode status badge if in Memory Order */}
        {isMemoryOrderMode && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C29B38]/15 border border-[#C29B38]/30 text-stone-800 text-xs sm:text-sm font-medium animate-pulse">
            <HeartHandshake className="w-4 h-4 text-[#A87F1F]" />
            <span className="font-semibold text-[#8B6712]">Đơn hàng của Mai:</span>
            <span className="hidden md:inline text-stone-600">Quạt giấy của bà</span>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {currentScreen !== 'HOME' && (
            <button
              onClick={() => onNavigate('HOME')}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Về Trang Chủ</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('STYLING_STUDIO')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'STYLING_STUDIO'
                ? 'bg-[#1F1F24] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Phối Đồ</span>
          </button>

          {hasSavedLookbook && (
            <button
              onClick={() => onNavigate('LOOKBOOK')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentScreen === 'LOOKBOOK'
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Lookbook</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
