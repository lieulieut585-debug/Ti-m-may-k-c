import {
  CulturalGarmentItem,
  VietPhucId,
  StylingSelection,
  CulturalCheckResult,
  CulturalKnowledgeBaseItem,
  ContextGroupInfo,
  StyleDnaType,
  RemixScissorsState
} from '../types';

export const CULTURAL_KNOWLEDGE_BASE: CulturalKnowledgeBaseItem[] = [
  {
    id: "ao_ngu_than",
    name: "Áo Ngũ Thân",
    historical_context:
      "Kiểu áo truyền thống gắn với lịch sử trang phục Việt Nam, đặc biệt phổ biến từ thời Nguyễn. Áo được cấu tạo từ năm thân vải ghép lại, mặc kèm quần dài hai ống.",
    key_characteristics: [
      "Cấu trúc năm thân áo (bốn thân ngoài và một thân con bên trong)",
      "Cổ đứng, cài năm khuy dọc từ cổ sang phía nách phải",
      "Tay áo chẽn (vừa vặn) và tà áo xẻ hai bên hông",
      "Theo truyền thống được mặc đồng bộ cùng quần dài"
    ],
    appropriate_contexts: [
      "Kỷ yếu",
      "Concert",
      "Lễ hội",
      "Đi chơi / Café",
      "Sự kiện văn hóa"
    ],
    remixable_elements: [
      "Bảng màu hiện đại (Neutral, Pastel, Cool, Warm, Dark)",
      "Phụ kiện cá nhân (Sneakers, Loafers, Boots, Túi, Kính, Quạt, Phụ kiện tóc)",
      "Phong cách phối (Minimal, Street, Vintage, Elegant, Creative)"
    ],
    sensitive_elements: [
      "Cấu trúc năm thân, cổ đứng và hàng khuy cài bên phải là các yếu tố nhận diện cốt lõi của áo ngũ thân",
      "Phần trang phục mặc kèm bên dưới (quần dài hoặc chân váy dài) ảnh hưởng trực tiếp đến phom dáng tổng thể và mức độ trang nhã theo từng dịp"
    ],
    avoid_combinations: [
      "Làm mất cấu trúc năm thân, cổ đứng hoặc đổi chiều cài khuy sang bên trái (làm thay đổi đặc trưng nhận diện cơ bản của trang phục)",
      "Bỏ hoàn toàn trang phục mặc kèm bên dưới (quần dài/chân váy dài) trong các bối cảnh lễ hội truyền thống hoặc sự kiện văn hóa trang trọng"
    ],
    sources: [
      "Bảo tàng Lịch sử Quốc gia — Tư liệu về Áo ngũ thân và Y phục thời Nguyễn"
    ]
  },
  {
    id: "ao_tac",
    name: "Áo Tấc",
    historical_context:
      "Một dạng lễ phục thuộc hệ thống áo ngũ thân truyền thống, nổi bật với phần tay áo rộng và dài (tay thụng), thường xuất hiện trong các dịp lễ nghi hoặc sự kiện trang trọng.",
    key_characteristics: [
      "Cấu trúc năm thân và năm khuy cài bên phải tương tự áo ngũ thân",
      "Ống tay áo rộng và dài (tay thụng)",
      "Phom áo rộng, tạo vẻ trang nghiêm, chững chạc",
      "Mặc kết hợp cùng quần dài"
    ],
    appropriate_contexts: ["Lễ hội", "Kỷ yếu", "Sự kiện văn hóa"],
    remixable_elements: [
      "Phối màu sắc giữa áo và phụ kiện",
      "Kết hợp giày hiện đại (Loafers, Sneakers tối giản, Boots) hoặc quạt cầm tay"
    ],
    sensitive_elements: [
      "Đặc trưng ống tay rộng và dài có thể gây bất tiện trong các hoạt động di chuyển nhiều hoặc không gian chật hẹp",
      "Tính chất lễ phục của áo cần được cân nhắc khi đặt vào các bối cảnh quá đời thường"
    ],
    avoid_combinations: [
      "Thu hẹp ống tay áo (vì sẽ biến thành áo ngũ thân tay chẽn, làm mất đặc trưng nhận diện của áo tấc)",
      "Thiếu trang phục quần dài/chân váy dài đi kèm làm mất tỷ lệ phom dáng lễ phục"
    ],
    sources: [
      "Bảo tàng Lịch sử Quốc gia — Tư liệu về Y phục thời Nguyễn"
    ]
  },
  {
    id: "ao_nhat_binh",
    name: "Áo Nhật Bình",
    historical_context:
      "Trang phục có nguồn gốc từ cung đình triều Nguyễn, về sau được biết đến rộng rãi như một dạng lễ phục truyền thống mang tính thẩm mỹ và trang trí cao.",
    key_characteristics: [
      "Cổ áo to bản hình chữ nhật trước ngực (cổ Nhật Bình)",
      "Thân áo xẻ phía trước (đối khâm), tay áo rộng",
      "Thường được mặc khoác ngoài lớp trang phục bên trong và kết hợp cùng quần hoặc váy dài"
    ],
    appropriate_contexts: ["Kỷ yếu", "Lễ hội", "Sự kiện văn hóa", "Concert"],
    remixable_elements: [
      "Kết hợp cùng chân váy dài hoặc quần dài theo bảng màu hiện đại",
      "Phối cùng phụ kiện tóc, trang sức, túi nhỏ, quạt hoặc giày hiện đại"
    ],
    sensitive_elements: [
      "Phần cổ hình chữ nhật và cấu trúc xẻ tà phía trước là đặc trưng nhận diện quan trọng nhất",
      "Do thiết kế xẻ phía trước, cần lưu ý lớp trang phục mặc kèm để đảm bảo sự chỉn chu trong từng bối cảnh"
    ],
    avoid_combinations: [
      "Thay đổi hoặc che khuất hoàn toàn phần cổ chữ nhật đặc trưng",
      "Mặc trong các sự kiện trang trọng mà thiếu lớp trang phục bên dưới (quần dài/chân váy dài)"
    ],
    sources: [
      "Bảo tàng Lịch sử Quốc gia — Sưu tập trang phục cung đình triều Nguyễn"
    ]
  },
  {
    id: "ao_dai",
    name: "Áo dài",
    historical_context:
      "Trang phục gắn liền với văn hóa Việt Nam qua nhiều thời kỳ, có sự kế thừa từ trang phục truyền thống và liên tục tiếp biến với kỹ thuật cắt may hiện đại từ thế kỷ XX đến nay.",
    key_characteristics: [
      "Thân áo dài, xẻ tà hai bên từ phần hông xuống",
      "Mặc kết hợp cùng quần dài ống rộng hoặc chân váy dài tùy theo biến thể hiện đại"
    ],
    appropriate_contexts: [
      "Kỷ yếu",
      "Concert",
      "Lễ hội",
      "Đi chơi / Café",
      "Sự kiện văn hóa",
      "Khác"
    ],
    remixable_elements: [
      "Độ dài tà áo, bảng màu, chất liệu và phong cách cá nhân (Minimal, Street, Vintage, Cute, Elegant, Creative)",
      "Kết hợp linh hoạt với Sneakers, Loafers, Boots, Túi, Khăn, Quạt, Trang sức"
    ],
    sensitive_elements: [
      "Sự cân đối giữa phần tà áo xẻ hai bên và trang phục mặc kèm bên dưới (quần dài/chân váy dài)",
      "Mức độ trang trọng của bối cảnh (như lễ hội truyền thống hay sự kiện văn hóa)"
    ],
    avoid_combinations: [
      "Bỏ hoàn toàn quần dài hoặc chân váy dài đi kèm khi mặc áo dài xẻ tà truyền thống"
    ],
    sources: [
      "Bảo tàng Lịch sử Quốc gia — Tư liệu về lịch sử và sự biến đổi của Áo dài Việt Nam"
    ]
  }
];

// Map from verified CULTURAL_KNOWLEDGE_BASE with UI metadata
const GARMENT_UI_METADATA: Record<VietPhucId, {
  period: string;
  tagline: string;
  defaultPalette: { name: string; hex: string; role: string }[];
}> = {
  ao_ngu_than: {
    period: 'Thời Nguyễn (Thế kỷ 18 - 20)',
    tagline: 'Gọn gàng, chuẩn mực, gắn liền đời sống thường nhật người Việt',
    defaultPalette: [
      { name: 'Xanh Chàm Lam Điền', hex: '#2C4A5E', role: 'Thân áo chính' },
      { name: 'Mộc Trắng Ngà', hex: '#EAE5D9', role: 'Quần dài lụa' },
      { name: 'Nâu Trầm Cổ Điển', hex: '#5A3E2B', role: 'Phụ kiện da' }
    ]
  },
  ao_tac: {
    period: 'Triều Nguyễn (Thế kỷ 19 - 20)',
    tagline: 'Lễ phục trang nghiêm, tà áo thong dong khoan thai',
    defaultPalette: [
      { name: 'Đỏ Cinnabar Hoàng Cung', hex: '#A83232', role: 'Thân áo' },
      { name: 'Vàng Hoàng Yến', hex: '#D4A034', role: 'Viền họa tiết' },
      { name: 'Trắng Sữa Ngà', hex: '#F4EFE6', role: 'Quần đi kèm' }
    ]
  },
  ao_nhat_binh: {
    period: 'Cung đình Triều Nguyễn (1807 - 1945)',
    tagline: 'Tinh hoa quý phái của bậc mệnh phụ và hoàng thất',
    defaultPalette: [
      { name: 'Tím Cung Đình Huế', hex: '#58305A', role: 'Thân áo chính' },
      { name: 'Vàng Kim Đế Vương', hex: '#D4AF37', role: 'Viền cổ chữ nhật' },
      { name: 'Xanh Ngọc Phỉ Thúy', hex: '#2A7B68', role: 'Dải ngũ hành tay áo' }
    ]
  },
  ao_dai: {
    period: 'Thế kỷ XX đến Đương Đại',
    tagline: 'Quốc phục thanh lịch, uyển chuyển biến hóa cùng thời đại',
    defaultPalette: [
      { name: 'Trắng Hoa Nhài Tinh Khôi', hex: '#F9F8F5', role: 'Tà áo chính' },
      { name: 'Hồng Phấn Ánh Đào', hex: '#E8A598', role: 'Họa tiết hoặc quần' },
      { name: 'Xanh Lá Non', hex: '#688B58', role: 'Điểm xuyết phụ kiện' }
    ]
  }
};

// Build CULTURAL_GARMENTS dictionary maintaining backward-compatible interface
export const CULTURAL_GARMENTS: Record<VietPhucId, CulturalGarmentItem> = CULTURAL_KNOWLEDGE_BASE.reduce(
  (acc, item) => {
    const meta = GARMENT_UI_METADATA[item.id] || {
      period: 'Truyền thống Việt Nam',
      tagline: item.name,
      defaultPalette: [
        { name: 'Chàm Đậm', hex: '#2C4A5E', role: 'Chính' },
        { name: 'Trắng Ngà', hex: '#EAE5D9', role: 'Phối' }
      ]
    };

    acc[item.id] = {
      id: item.id,
      name: item.name,
      vietnameseName: item.name,
      period: meta.period,
      tagline: meta.tagline,
      shortDescription: item.historical_context,
      historical_context: item.historical_context,
      key_characteristics: item.key_characteristics,
      appropriate_contexts: item.appropriate_contexts,
      remixable_elements: item.remixable_elements,
      sensitive_elements: item.sensitive_elements,
      avoid_combinations: item.avoid_combinations,
      sources: item.sources,
      giu_lai: item.key_characteristics.slice(0, 3),
      co_the_remix: item.remixable_elements,
      defaultPalette: meta.defaultPalette
    };
    return acc;
  },
  {} as Record<VietPhucId, CulturalGarmentItem>
);

export const COLOR_MOOD_PALETTES = {
  Neutral: [
    { name: 'Mộc Trắng Ngà', hex: '#F5EFEB', role: 'Chủ đạo' },
    { name: 'Tro Gốm Nung', hex: '#8C827A', role: 'Phối màu' },
    { name: 'Mực Nho Đậm', hex: '#2A2C2E', role: 'Điểm nhấn' },
    { name: 'Lụa Mộc Tự Nhiên', hex: '#DED6CB', role: 'Nền' }
  ],
  Warm: [
    { name: 'Đỏ Chu Sa Cinnabar', hex: '#B84A39', role: 'Chủ đạo' },
    { name: 'Vàng Đất Phù Sa', hex: '#D99B43', role: 'Phối màu' },
    { name: 'Nâu Trầm Trầm Tích', hex: '#5E3829', role: 'Điểm nhấn' },
    { name: 'Cam Quế Ánh Dương', hex: '#E27D50', role: 'Chi tiết' }
  ],
  Cool: [
    { name: 'Xanh Lam Điền', hex: '#2E5266', role: 'Chủ đạo' },
    { name: 'Xanh Men Ngọc Celadon', hex: '#6E9887', role: 'Phối màu' },
    { name: 'Lam Khói Sương', hex: '#A3B1B8', role: 'Nền' },
    { name: 'Chàm Đêm Thẳm', hex: '#1C2833', role: 'Điểm nhấn' }
  ],
  Pastel: [
    { name: 'Hồng Cánh Sen Non', hex: '#F2C6C2', role: 'Chủ đạo' },
    { name: 'Xanh Cốm Trà Sớm', hex: '#CDE0C9', role: 'Phối màu' },
    { name: 'Vàng Mơ Dịu Dàng', hex: '#FCE6B7', role: 'Điểm nhấn' },
    { name: 'Tím Hoa Cà Thoang Thoảng', hex: '#DBCBD8', role: 'Chi tiết' }
  ],
  Dark: [
    { name: 'Đen Tuyển Sơn Mài', hex: '#1C1D21', role: 'Chủ đạo' },
    { name: 'Đỏ Rượu Huyết Dụ', hex: '#6B1D2F', role: 'Phối màu' },
    { name: 'Đồng Cổ Ánh Kim', hex: '#9E783B', role: 'Điểm nhấn' },
    { name: 'Xám Khói Đêm', hex: '#3B3E45', role: 'Nền' }
  ]
};

export const CONTEXT_GROUPS: ContextGroupInfo[] = [
  {
    id: 'CAMPUS',
    label: '🎓 CAMPUS',
    icon: '🎓',
    description: 'Đi học, Thuyết trình, Hoạt động CLB',
    spaceAndActivity: 'Không gian giảng đường, thuyết trình nhóm, sự kiện Đoàn Hội năng động'
  },
  {
    id: 'SOCIAL',
    label: '🎉 SOCIAL',
    icon: '🎉',
    description: 'Đi chơi, Đi concert, Café, Hẹn bạn bè',
    spaceAndActivity: 'Quán cà phê, concert âm nhạc, dạo phố cuối tuần, check-in không gian mở'
  },
  {
    id: 'FORMAL',
    label: '💐 FORMAL',
    icon: '💐',
    description: 'Đám cưới, Sự kiện trang trọng, Tiệc',
    spaceAndActivity: 'Lễ cưới, tiệc ngoại giao, lễ tri ân, sự kiện kỷ niệm trang trọng'
  },
  {
    id: 'CULTURAL',
    label: '🏮 CULTURAL',
    icon: '🏮',
    description: 'Lễ hội, Sự kiện văn hóa, Tham quan di tích',
    spaceAndActivity: 'Không gian đền đài di sản, lễ hội truyền thống, ngày hội văn hóa dân tộc'
  },
  {
    id: 'CONTENT',
    label: '📸 CONTENT',
    icon: '📸',
    description: 'Chụp lookbook, Quay TikTok, Làm fashion content',
    spaceAndActivity: 'Studio nghệ thuật, sáng tạo video TikTok, chụp ảnh concept thời trang'
  }
];

export const STYLE_DNA_ITEMS: { id: StyleDnaType; label: string; desc: string; icon: string }[] = [
  { id: 'Coquette', label: 'Coquette', desc: 'Ren, nơ, nữ tính, bay bổng', icon: '🎀' },
  { id: 'Streetwear', label: 'Streetwear', desc: 'Bụi bặm, phóng khoáng, nhịp phố', icon: '🧢' },
  { id: 'Minimal', label: 'Minimal', desc: 'Tối giản, đường cắt gãy gọn, đơn sắc', icon: '🖤' },
  { id: 'Y2K', label: 'Y2K', desc: 'Táo bạo, ánh kim metallic, hoài niệm 2000s', icon: '✨' },
  { id: 'Art kid', label: 'Art kid', desc: 'Sáng tạo đa sắc, hoa văn nghệ thuật', icon: '🎨' },
  { id: 'Soft girl', label: 'Soft girl', desc: 'Dịu dàng, tông pastel, mơ màng', icon: '🌿' },
  { id: 'Edgy', label: 'Edgy', desc: 'Góc cạnh, tương phản mạnh, cá tính', icon: '🔥' },
  { id: 'Clean girl', label: 'Clean girl', desc: 'Thanh lịch, tự nhiên, chỉn chu', icon: '🤍' },
  { id: 'Maximalist', label: 'Maximalist', desc: 'Đa tầng lớp, nhiều phụ kiện, rực rỡ', icon: '🪩' },
  { id: 'Viet Contemporary', label: 'Viet Contemporary', desc: 'Giao thoa nét Việt xưa và đồ họa hiện đại', icon: '🏮' }
];

export const DEFAULT_REMIX_SCISSORS: RemixScissorsState = {
  silhouette: 'Giữ nguyên',
  length: 'Full length (Nguyên bản)',
  colorRemix: 'Giữ màu truyền thống',
  bottomRemix: 'Quần dài truyền thống',
  layerRemix: 'Không layer',
  accessoryRemix: []
};

// Responsible AI Rule verification helper based on verified cultural knowledge base
export function evaluateCulturalGuardrail(selection: StylingSelection): CulturalCheckResult {
  const garment = CULTURAL_GARMENTS[selection.vietPhucId];
  if (!garment) {
    return {
      status: 'SAFE',
      reason: 'Trang phục nằm trong danh mục cơ bản an toàn.',
      suggestion: 'Tự tin diện look với sự tôn trọng nét văn hóa.'
    };
  }

  const { accessories, personalStyle, occasion, contextGroup, vietPhucId, remixScissors, styleMixer } = selection;
  const scissors = remixScissors || DEFAULT_REMIX_SCISSORS;
  const isCropped = scissors.length === 'Cropped (Lửng hiện đại)' || scissors.length === 'Layer ngắn' || scissors.silhouette === 'Cropped';
  const isPleatedSkirt = scissors.bottomRemix === 'Pleated skirt (Chân váy xếp ly)';
  const isJeans = scissors.bottomRemix === 'Jeans';
  const effectiveContext = contextGroup || (occasion === 'Kỷ yếu' ? 'CAMPUS' : occasion === 'Concert' || occasion === 'Đi chơi / Café' ? 'SOCIAL' : occasion === 'Lễ hội' || occasion === 'Sự kiện văn hóa' ? 'CULTURAL' : 'CAMPUS');

  // Scenario: Cropped silhouette or Pleated skirt reinterpretation
  if (isCropped || isPleatedSkirt || isJeans) {
    if (effectiveContext === 'CULTURAL' || effectiveContext === 'FORMAL') {
      return {
        status: 'CAUTION',
        reason: `Phiên bản này là Contemporary Reinterpretation (biến tấu đương đại) lấy cảm hứng từ ${garment.name}. Do tà áo đã được cắt ngắn hoặc phối cùng ${scissors.bottomRemix}, look này rất cá tính nhưng cần cân nhắc kỹ khi diện vào các sự kiện lễ nghi truyền thống hoặc nghi thức tôn nghiêm.`,
        suggestion: 'Trong không gian trang trọng, bạn có thể chuyển về chiều dài Full length nguyên bản kết hợp quần dài, giữ nguyên phụ kiện hiện đại để vừa đúng mực vừa trẻ trung.',
        relevant_characteristic: 'Tỷ lệ tà áo buông quá gối và sự kín đáo chuẩn mực của y phục truyền thống.',
        problematic_selection: isCropped ? 'Cắt ngắn tà áo (Cropped)' : scissors.bottomRemix,
        recommended_replacement: 'Full length (Nguyên bản) + Quần dài'
      };
    } else {
      // In Campus, Social, Content: It is safe contemporary remix, but with clear notice
      return {
        status: 'SAFE',
        reason: `Phiên bản sáng tạo đương đại lấy cảm hứng từ ${garment.name} hoàn toàn phù hợp với bối cảnh ${effectiveContext}. Cấu trúc cổ áo và tinh thần đặc trưng vẫn được giữ lại làm điểm nhấn văn hóa độc đáo.`,
        suggestion: 'Bộ đồ thể hiện tinh thần "Remix tự do — nhưng không đánh mất cái làm nên Việt phục".'
      };
    }
  }

  // Scenario: Nhật Bình with heavy combat boots in Street style
  if (vietPhucId === 'ao_nhat_binh' && (accessories.includes('Boots') || scissors.accessoryRemix?.includes('Boots')) && (personalStyle === 'Street' || selection.styleDna?.includes('Streetwear') || selection.styleDna?.includes('Edgy'))) {
    return {
      status: 'REVIEW',
      reason: 'Cách phối này có nguy cơ làm mất đi sự trang nghiêm và tỷ lệ đặc trưng của áo Nhật Bình cung đình khi phối cùng Boots hầm hố phong cách Streetwear.',
      suggestion: 'Đổi từ Boots sang Loafers thanh lịch hoặc giày búp bê tối giản, giữ được nét hiện đại trẻ trung mà không lấn át cổ chữ nhật và thân áo đối khâm.',
      relevant_characteristic: 'Cổ áo hình chữ nhật to bản và cấu trúc đối khâm hoàng gia của áo Nhật Bình.',
      problematic_selection: 'Boots',
      recommended_replacement: 'Loafers'
    };
  }

  // Scenario: Áo Tấc (lễ phục) with running sneakers in formal settings
  if (vietPhucId === 'ao_tac' && (accessories.includes('Sneakers') || scissors.accessoryRemix?.includes('Sneakers')) && (effectiveContext === 'CULTURAL' || effectiveContext === 'FORMAL')) {
    return {
      status: 'CAUTION',
      reason: 'Áo Tấc là dạng lễ phục trang nghiêm với ống tay rộng và dài. Phối cùng Sneakers trong sự kiện văn hóa hoặc lễ hội có thể tạo cảm giác đối nghịch giữa tính nghi lễ và tính thể thao.',
      suggestion: 'Nếu cần di chuyển thoải mái, bạn có thể chọn giày Loafers da mềm hoặc slip-on tối giản màu trung tính để giữ vẻ khoan thai cho tà áo thụng.',
      relevant_characteristic: 'Tính chất lễ phục và đặc trưng ống tay thụng rộng dài của Áo Tấc.',
      problematic_selection: 'Sneakers',
      recommended_replacement: 'Loafers'
    };
  }

  // Scenario: Áo Tấc in active Social/Concert context
  if (vietPhucId === 'ao_tac' && effectiveContext === 'SOCIAL') {
    return {
      status: 'CAUTION',
      reason: 'Đặc trưng ống tay áo rộng và dài (tay thụng) của Áo Tấc có thể gây bất tiện trong các hoạt động di chuyển nhiều hoặc không gian chật hẹp như concert đông đúc.',
      suggestion: 'Cân nhắc chuyển sang Áo Ngũ Thân (tay chẽn gọn gàng) hoặc giữ ống tay Áo Tấc gọn gàng để thuận tiện tận hưởng âm nhạc.'
    };
  }

  // Default SAFE
  return {
    status: 'SAFE',
    reason: 'Look này đã vượt qua Cultural Check. Các yếu tố nhận diện cốt lõi của trang phục được giữ gìn nguyên vẹn theo tư liệu Bảo tàng Lịch sử Quốc gia.',
    suggestion: 'Bộ trang phục đáp ứng trọn vẹn tiêu chí "Remix tự do — nhưng không đánh mất cái làm nên Việt phục".'
  };
}

export const SAMPLE_MEMORY_ORDER = {
  customerName: 'Mai',
  profile: 'Sinh viên năm nhất Đại học Khoa học Xã hội & Nhân văn',
  situation: 'Mai chuẩn bị tham gia Ngày hội Văn hóa Học đường của trường. Bạn ấy muốn một look Việt phục vừa trẻ trung, thể hiện cá tính riêng của tân sinh viên, nhưng vẫn đảm bảo sự đoan trang, tôn trọng không khí sự kiện văn hóa trang trọng.',
  memoryObject: 'Chiếc quạt giấy cũ của bà (kỷ vật truyền đời với nét vẽ cành mai mộc mạc).',
  requiredAccessory: 'Quạt' as const,
  idealGarments: ['ao_ngu_than', 'ao_dai', 'ao_tac'] as VietPhucId[],
  advice: 'Đừng quên mang chiếc Quạt theo nhé! Đó là mảnh ghép ký ức quan trọng nhất mà Mai được bà trao tặng.'
};
