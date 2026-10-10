export type AppScreen =
  | 'HOME'
  | 'STYLING_STUDIO'
  | 'AI_RESULT'
  | 'MEMORY_CARD'
  | 'CULTURAL_CHECK'
  | 'LOOKBOOK'
  | 'MEMORY_ORDER';

export type ContextGroupId = 'CAMPUS' | 'SOCIAL' | 'FORMAL' | 'CULTURAL' | 'CONTENT';

export interface ContextGroupInfo {
  id: ContextGroupId;
  label: string;
  icon: string;
  description: string;
  spaceAndActivity: string;
}

export type OccasionType =
  | 'Kỷ yếu'
  | 'Concert'
  | 'Lễ hội'
  | 'Đi chơi / Café'
  | 'Sự kiện văn hóa'
  | 'Khác';

export type VietPhucId =
  | 'ao_ngu_than'
  | 'ao_tac'
  | 'ao_nhat_binh'
  | 'ao_dai';

export type StyleDnaType =
  | 'Coquette'
  | 'Streetwear'
  | 'Minimal'
  | 'Y2K'
  | 'Art kid'
  | 'Soft girl'
  | 'Edgy'
  | 'Clean girl'
  | 'Maximalist'
  | 'Viet Contemporary';

export type PersonalStyleType =
  | 'Minimal'
  | 'Street'
  | 'Elegant'
  | 'Cute'
  | 'Vintage'
  | 'Creative';

export type ColorMoodType =
  | 'Neutral'
  | 'Warm'
  | 'Cool'
  | 'Pastel'
  | 'Dark';

export type AccessoryType =
  | 'Quần dài'
  | 'Chân váy dài'
  | 'Sneakers'
  | 'Loafers'
  | 'Boots'
  | 'Túi'
  | 'Trang sức'
  | 'Khăn'
  | 'Quạt'
  | 'Phụ kiện tóc';

export interface AvatarProfile {
  gender: 'female' | 'male' | 'neutral';
  skinTone: 'light' | 'natural' | 'warm';
  bodyShape: 'slim' | 'regular' | 'curvy';
  photoUrl?: string;
  customPhotoName?: string;
}

export interface RemixScissorsState {
  silhouette: 'Giữ nguyên' | 'Cropped' | 'Oversized' | 'Fitted' | 'Layered' | 'Asymmetric';
  length: 'Full length (Nguyên bản)' | 'Midi' | 'Cropped (Lửng hiện đại)' | 'Layer ngắn';
  colorRemix: 'Giữ màu truyền thống' | 'Monochrome' | 'Pastel' | 'Contrast' | 'Color blocking' | 'Gen Z palette';
  bottomRemix: 'Quần dài truyền thống' | 'Chân váy dài' | 'Pleated skirt (Chân váy xếp ly)' | 'Wide-leg pants' | 'Jeans';
  layerRemix: 'Không layer' | 'Khoác ngoài (Outer jacket)' | 'Áo trong (Inner top)' | 'Phối 4 tà / Layer lụa';
  accessoryRemix: string[];
}

export interface RemixHistoryItem {
  id: string;
  label: string;
  timestamp: number;
  scissors: RemixScissorsState;
}

export interface StylingSelection {
  occasion: OccasionType;
  contextGroup?: ContextGroupId;
  vietPhucId: VietPhucId;
  personalStyle: PersonalStyleType;
  styleDna: StyleDnaType[];
  styleMixer: number; // 0 (Truyền thống) to 100 (Gen Z Experimental)
  colorMood: ColorMoodType;
  accessories: AccessoryType[];
  avatarProfile?: AvatarProfile;
  remixScissors?: RemixScissorsState;
}

export type CulturalCheckStatus = 'SAFE' | 'CAUTION' | 'REVIEW';

export interface CulturalCheckResult {
  status: CulturalCheckStatus;
  reason: string;
  suggestion: string;
  relevant_characteristic?: string;
  problematic_selection?: string;
  recommended_replacement?: string;
}

export interface ContextFitMatrix {
  campus: 'HIGH' | 'MEDIUM' | 'LOW';
  social_concert: 'HIGH' | 'MEDIUM' | 'LOW';
  formal_wedding: 'HIGH' | 'MEDIUM' | 'LOW';
  cultural_event: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ContextFitEvaluation {
  selected_context_status: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  multi_context_matrix: ContextFitMatrix;
}

export interface MemoryCardData {
  title: string;
  story: string;
  cultural_context?: string;
  key_characteristics?: string[];
  giu_lai?: string[];
  co_the_remix?: string[];
  sources?: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role?: string;
}

export interface MemoryOrderResult {
  satisfied: boolean;
  scoreExplanation: string;
  mentorFeedback: string;
}

export interface GeminiStylistResponse {
  look_name: string;
  reinterpretation_type?: 'TRADITIONAL_STYLING' | 'CONTEMPORARY_REMIX';
  outfit_recommendation: string;
  style_dna?: string[];
  remix_level?: string;
  remix_changes?: {
    silhouette?: string;
    length?: string;
    bottom?: string;
    layer?: string;
    accessories?: string;
    color?: string;
  };
  what_is_preserved?: string[];
  what_is_remixed?: string[];
  context_fit?: ContextFitEvaluation;
  styling_reason: string;
  color_palette: ColorSwatch[];
  accessories: string[];
  cultural_note: string;
  cultural_check: CulturalCheckResult;
  memory_card: MemoryCardData;
  mentor_message: string;
  memory_order_result?: MemoryOrderResult;
}

export interface SavedLookItem {
  id: string;
  selection: StylingSelection;
  result: GeminiStylistResponse;
  savedAt: number;
}

export interface CulturalKnowledgeBaseItem {
  id: VietPhucId;
  name: string;
  historical_context: string;
  key_characteristics: string[];
  appropriate_contexts: string[];
  remixable_elements: string[];
  sensitive_elements: string[];
  avoid_combinations: string[];
  sources: string[];
}

export interface CulturalGarmentItem {
  id: VietPhucId;
  name: string;
  vietnameseName: string;
  period: string;
  historical_context: string;
  key_characteristics: string[];
  appropriate_contexts: string[];
  remixable_elements: string[];
  sensitive_elements: string[];
  avoid_combinations: string[];
  sources: string[];
  giu_lai: string[];
  co_the_remix: string[];
  shortDescription: string;
  tagline: string;
  defaultPalette: ColorSwatch[];
}

export interface MemoryOrderBrief {
  customerName: string;
  profile: string;
  situation: string;
  memoryObject: string;
  idealGarments: VietPhucId[];
  requiredAccessory: AccessoryType;
  advice: string;
}
