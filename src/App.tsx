import React, { useState } from 'react';
import {
  AppScreen,
  StylingSelection,
  GeminiStylistResponse,
  VietPhucId,
  SavedLookItem,
} from './types';
import { CULTURAL_GARMENTS, DEFAULT_REMIX_SCISSORS } from './data/culturalKnowledge';
import { requestStylistEvaluation } from './services/geminiService';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { StylingStudio } from './components/StylingStudio';
import { AiResultView } from './components/AiResultView';
import { MemoryCardModal } from './components/MemoryCardModal';
import { CulturalCheckModal } from './components/CulturalCheckModal';
import { LookbookModal } from './components/LookbookModal';
import { MemoryOrderModal } from './components/MemoryOrderModal';
import { CompareLooksModal } from './components/CompareLooksModal';
import { AlertCircle, RefreshCw } from 'lucide-react';

const DEFAULT_SELECTION: StylingSelection = {
  occasion: 'Kỷ yếu',
  contextGroup: 'CAMPUS',
  vietPhucId: 'ao_ngu_than',
  personalStyle: 'Elegant',
  styleDna: ['Viet Contemporary', 'Minimal'],
  styleMixer: 30,
  colorMood: 'Neutral',
  accessories: ['Quần dài', 'Loafers', 'Quạt'],
  avatarProfile: {
    gender: 'female',
    skinTone: 'light',
    bodyShape: 'regular',
  },
  remixScissors: DEFAULT_REMIX_SCISSORS,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('HOME');
  const [selection, setSelection] = useState<StylingSelection>(DEFAULT_SELECTION);
  const [isMemoryOrderMode, setIsMemoryOrderMode] = useState<boolean>(false);

  // Modals overlay states
  const [isMemoryCardOpen, setIsMemoryCardOpen] = useState<boolean>(false);
  const [isCulturalCheckOpen, setIsCulturalCheckOpen] = useState<boolean>(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState<boolean>(false);
  const [isMemoryOrderModalOpen, setIsMemoryOrderModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Saved Looks for Comparison (up to 3)
  const [savedLooks, setSavedLooks] = useState<SavedLookItem[]>([]);

  // API Call state
  const [aiResult, setAiResult] = useState<GeminiStylistResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // START SELF STYLING FLOW
  const handleStartSelfStyling = () => {
    setIsMemoryOrderMode(false);
    setCurrentScreen('STYLING_STUDIO');
  };

  // DIRECT GARMENT SELECT FROM HOME
  const handleSelectGarmentDirect = (garmentId: VietPhucId) => {
    setIsMemoryOrderMode(false);
    setSelection((prev) => ({ ...prev, vietPhucId: garmentId }));
    setCurrentScreen('STYLING_STUDIO');
  };

  // START MEMORY ORDER CHALLENGE FLOW
  const handleOpenMemoryOrderModal = () => {
    setIsMemoryOrderModalOpen(true);
  };

  const handleAcceptMemoryOrder = () => {
    setIsMemoryOrderMode(true);
    setSelection({
      occasion: 'Sự kiện văn hóa',
      contextGroup: 'CULTURAL',
      vietPhucId: 'ao_ngu_than',
      personalStyle: 'Cute',
      styleDna: ['Viet Contemporary', 'Soft girl'],
      styleMixer: 25,
      colorMood: 'Pastel',
      accessories: ['Quạt'], // Key item for Mai
      avatarProfile: {
        gender: 'female',
        skinTone: 'light',
        bodyShape: 'regular',
      },
      remixScissors: DEFAULT_REMIX_SCISSORS,
    });
    setCurrentScreen('STYLING_STUDIO');
  };

  // SUBMIT STYLING TO GEMINI AI STYLIST (ANH CẢ)
  const handleSubmitStyling = async (currentSel: StylingSelection) => {
    setSelection(currentSel);
    setIsLoading(true);
    setApiError(null);

    try {
      const evaluation = await requestStylistEvaluation({
        selection: currentSel,
        mode: isMemoryOrderMode ? 'MEMORY_ORDER' : 'SELF',
      });
      setAiResult(evaluation);
      setCurrentScreen('AI_RESULT');
    } catch (err: any) {
      console.error('Styling evaluation error:', err);
      setApiError('Anh Cả đang nghỉ lấy hơi. Bạn thử lại sau nhé.');
    } finally {
      setIsLoading(false);
    }
  };

  // "SỬA LOOK" ACTION: Updates selection and triggers quick re-evaluation
  const handleFixLook = async (updatedSelection: StylingSelection) => {
    setSelection(updatedSelection);
    await handleSubmitStyling(updatedSelection);
  };

  // Save to Compare (Up to 3)
  const handleSaveToCompare = (look: SavedLookItem) => {
    setSavedLooks((prev) => {
      if (prev.find((l) => l.result.look_name === look.result.look_name)) return prev;
      if (prev.length >= 3) {
        return [prev[1], prev[2], look];
      }
      return [...prev, look];
    });
  };

  const handleRemoveSavedLook = (id: string) => {
    setSavedLooks((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSelectLookToWear = (look: SavedLookItem) => {
    setSelection(look.selection);
    setAiResult(look.result);
    setCurrentScreen('AI_RESULT');
  };

  const currentGarmentData = CULTURAL_GARMENTS[selection.vietPhucId];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#232326]">
      {/* Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          if (screen === 'HOME') {
            setIsMemoryOrderMode(false);
          }
          if (screen === 'LOOKBOOK' && aiResult) {
            setIsLookbookOpen(true);
            return;
          }
          setCurrentScreen(screen);
        }}
        isMemoryOrderMode={isMemoryOrderMode}
        onExitMemoryOrder={() => setIsMemoryOrderMode(false)}
        hasSavedLookbook={!!aiResult}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {/* Error notification banner if API fails */}
        {apiError && (
          <div className="max-w-xl mx-auto my-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-between gap-3 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{apiError}</span>
            </div>
            <button
              onClick={() => handleSubmitStyling(selection)}
              className="px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thử lại</span>
            </button>
          </div>
        )}

        {/* SCREEN: HOME */}
        {currentScreen === 'HOME' && (
          <Home
            onStartSelfStyling={handleStartSelfStyling}
            onStartMemoryOrder={handleOpenMemoryOrderModal}
            onSelectGarmentDirect={handleSelectGarmentDirect}
          />
        )}

        {/* SCREEN: STYLING_STUDIO */}
        {currentScreen === 'STYLING_STUDIO' && (
          <StylingStudio
            initialSelection={selection}
            isMemoryOrderMode={isMemoryOrderMode}
            onSubmitStyling={handleSubmitStyling}
            isLoading={isLoading}
            onCancelMemoryOrder={() => setIsMemoryOrderMode(false)}
          />
        )}

        {/* SCREEN: AI_RESULT */}
        {currentScreen === 'AI_RESULT' && aiResult && (
          <AiResultView
            result={aiResult}
            selection={selection}
            isMemoryOrderMode={isMemoryOrderMode}
            onOpenMemoryCard={() => setIsMemoryCardOpen(true)}
            onOpenCulturalCheck={() => setIsCulturalCheckOpen(true)}
            onOpenLookbook={() => setIsLookbookOpen(true)}
            onBackToStudio={() => setCurrentScreen('STYLING_STUDIO')}
            onQuickRemixSubmit={handleSubmitStyling}
            onApplySaferSuggestion={handleFixLook}
            savedLooks={savedLooks}
            onSaveToCompare={handleSaveToCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
          />
        )}
      </main>

      {/* MODAL: MẢNH GHÉP KÝ ỨC */}
      {aiResult && (
        <MemoryCardModal
          isOpen={isMemoryCardOpen}
          onClose={() => setIsMemoryCardOpen(false)}
          memoryCard={aiResult.memory_card}
          garment={currentGarmentData}
          onProceedToCulturalCheck={() => setIsCulturalCheckOpen(true)}
        />
      )}

      {/* MODAL: CULTURAL CHECK */}
      {aiResult && (
        <CulturalCheckModal
          isOpen={isCulturalCheckOpen}
          onClose={() => setIsCulturalCheckOpen(false)}
          culturalCheck={aiResult.cultural_check}
          selection={selection}
          onFixLook={handleFixLook}
          onContinueToLookbook={() => setIsLookbookOpen(true)}
        />
      )}

      {/* MODAL: LOOKBOOK */}
      {aiResult && (
        <LookbookModal
          isOpen={isLookbookOpen}
          onClose={() => setIsLookbookOpen(false)}
          result={aiResult}
          selection={selection}
          onNewStyling={() => {
            setCurrentScreen('STYLING_STUDIO');
          }}
        />
      )}

      {/* MODAL: ĐƠN HÀNG KÝ ỨC BRIEF */}
      <MemoryOrderModal
        isOpen={isMemoryOrderModalOpen}
        onClose={() => setIsMemoryOrderModalOpen(false)}
        onAcceptChallenge={handleAcceptMemoryOrder}
      />

      {/* MODAL: COMPARE LOOKS (SO SÁNH CÁC LOOK) */}
      <CompareLooksModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        savedLooks={savedLooks}
        onRemoveLook={handleRemoveSavedLook}
        onSelectLookToWear={handleSelectLookToWear}
      />
    </div>
  );
}
