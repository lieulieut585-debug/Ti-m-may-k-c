import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { CULTURAL_GARMENTS, COLOR_MOOD_PALETTES, evaluateCulturalGuardrail, SAMPLE_MEMORY_ORDER } from './src/data/culturalKnowledge.ts';
import { StylingSelection, GeminiStylistResponse, VietPhucId } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function generateLocalFallbackResponse(
  selection: StylingSelection,
  isMemoryOrder: boolean
): GeminiStylistResponse {
  const garment = CULTURAL_GARMENTS[selection.vietPhucId] || CULTURAL_GARMENTS.ao_ngu_than;
  const guardrail = evaluateCulturalGuardrail(selection);
  const colorPalette = (COLOR_MOOD_PALETTES[selection.colorMood] || COLOR_MOOD_PALETTES.Neutral).slice(0, 4);

  const scissors = selection.remixScissors || {
    silhouette: 'Giữ nguyên',
    length: 'Full length (Nguyên bản)',
    colorRemix: 'Giữ màu truyền thống',
    bottomRemix: 'Quần dài truyền thống',
    layerRemix: 'Không layer',
    accessoryRemix: []
  };

  const isRemixed =
    scissors.length !== 'Full length (Nguyên bản)' ||
    scissors.silhouette !== 'Giữ nguyên' ||
    scissors.bottomRemix !== 'Quần dài truyền thống' ||
    (selection.styleMixer && selection.styleMixer > 40);

  const reinterpretationType: 'TRADITIONAL_STYLING' | 'CONTEMPORARY_REMIX' = isRemixed
    ? 'CONTEMPORARY_REMIX'
    : 'TRADITIONAL_STYLING';

  const styleDnaTags = selection.styleDna?.length
    ? selection.styleDna
    : [selection.personalStyle || 'Viet Contemporary'];

  let lookName = '';
  if (isRemixed) {
    lookName = `${garment.name} Re:${styleDnaTags[0]}`;
  } else {
    lookName = `${garment.name} • ${selection.personalStyle || 'Tao Nhã'} Bản Nguyên`;
  }

  // Multi-context matrix logic
  const isCroppedOrCasual =
    scissors.length === 'Cropped (Lửng hiện đại)' ||
    scissors.bottomRemix === 'Pleated skirt (Chân váy xếp ly)' ||
    scissors.bottomRemix === 'Jeans';

  const contextMatrix = {
    campus: (isCroppedOrCasual || selection.contextGroup === 'CAMPUS' ? 'HIGH' : 'HIGH') as 'HIGH' | 'MEDIUM' | 'LOW',
    social_concert: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    formal_wedding: (isCroppedOrCasual ? 'LOW' : 'HIGH') as 'HIGH' | 'MEDIUM' | 'LOW',
    cultural_event: (isCroppedOrCasual ? 'MEDIUM' : 'HIGH') as 'HIGH' | 'MEDIUM' | 'LOW'
  };

  const selectedContext = selection.contextGroup || 'CAMPUS';
  const selectedContextStatus =
    selectedContext === 'FORMAL' && isCroppedOrCasual
      ? 'LOW'
      : selectedContext === 'CULTURAL' && isCroppedOrCasual
      ? 'MEDIUM'
      : 'HIGH';

  let mentorMessage = '';
  if (guardrail.status === 'SAFE') {
    if (isRemixed) {
      mentorMessage = `Ồ, look remix này cực kỳ bắt mắt! Dù đã dùng kéo cắt ngắn tạo phom trẻ trung, phần cổ áo và phong thái của ${garment.name} vẫn là linh hồn nhận diện. Rất hợp cho ${selectedContext.toLowerCase()}!`;
    } else {
      mentorMessage = `Ồ, look này chuẩn chỉ đấy! Bản nguyên của ${garment.name} vẫn được tôn trọng vẹn nguyên, kết hợp phụ kiện thanh lịch có chất riêng. Duyệt ngay nhé!`;
    }
  } else if (guardrail.status === 'CAUTION') {
    mentorMessage = `Khoan khoan. Đây là một phiên bản sáng tạo đương đại lấy cảm hứng từ ${garment.name}. Look này rất chất cho ${selectedContext.toLowerCase()}, nhưng nếu bước vào lễ hội truyền thống nghiêm cẩn thì nên cân nhắc tà áo nguyên bản nhé.`;
  } else {
    mentorMessage = `Ê, dừng kim! Chi tiết này có nguy cơ lấn át cấu trúc nhận diện đặc thù của ${garment.name}. Mình đổi nhẹ phương án phối đồ này xem sao, vẫn ngầu mà cực kỳ tôn nét Việt!`;
  }

  // Memory order check
  let memoryOrderResult = undefined;
  if (isMemoryOrder) {
    const allAcc = [...selection.accessories, ...(scissors.accessoryRemix || [])];
    const hasFan = allAcc.includes('Quạt');
    const isAppropriate = guardrail.status !== 'REVIEW';
    const satisfied = hasFan && isAppropriate;
    memoryOrderResult = {
      satisfied,
      scoreExplanation: satisfied
        ? 'Bạn đã khéo léo lồng ghép "Chiếc quạt giấy cũ của bà" vào look đồ một cách tự nhiên, vừa đúng ngữ cảnh ngày hội vừa tôn vẻ thanh lịch của tân sinh viên.'
        : !hasFan
        ? 'Khoan nào! Đơn hàng của Mai cần có "Chiếc quạt giấy cũ của bà" làm vật kỷ niệm tâm điểm. Bạn hãy thêm Quạt vào danh sách phụ kiện nhé.'
        : 'Look đồ có ý tưởng tốt nhưng cần điều chỉnh để không làm lệch tính trang trọng trong Ngày hội Văn hóa học đường.',
      mentorFeedback: satisfied
        ? 'Anh Cả chấm Mai 10 điểm khi diện set này! Vừa ấm áp hoài niệm về người bà, vừa rạng rỡ phong thái sinh viên thế hệ mới.'
        : 'Hãy chỉnh lại một chút phụ kiện theo gợi ý của Anh Cả để làm khách hàng Mai hài lòng tuyệt đối nhé.'
    };
  }

  const memoryStories: Record<VietPhucId, { title: string; story: string }> = {
    ao_ngu_than: {
      title: 'Mảnh ghép: Bàn tay phụ mẫu & Ngũ thường',
      story: 'Năm thân áo tượng trưng cho tứ thân phụ mẫu (cha mẹ hai bên) ôm bọc lấy thân con nhỏ bên trong. 5 hạt cúc cài hữu nhắc nhở người mặc về Nhân, Lễ, Nghĩa, Trí, Tín - chuẩn mực sống hòa nhã, đĩnh đạc của người Việt suốt mấy trăm năm.'
    },
    ao_tac: {
      title: 'Mảnh ghép: Ống tay thụng & Bước chân từ tốn',
      story: 'Ống tay thụng rộng buông thõng mang theo cả sự điềm tĩnh và lễ độ. Khi chắp tay làm lễ, hai tay ẩn kín trong lòng tay áo, thể hiện sự khiêm cung, tôn kính đất trời và người đối diện trong mọi nghi tiết trọng đại.'
    },
    ao_nhat_binh: {
      title: 'Mảnh ghép: Dải cổ chữ nhật & Gấm hoa đối khâm',
      story: 'Khởi nguồn từ quy chế năm 1807 triều Gia Long, cổ áo hình chữ nhật viền hoa văn đối khâm cùng dải ngũ sắc gấu tay là biểu trưng quyền quý của bậc mệnh phụ. Trải qua thời gian, chiếc áo trở thành y phục cưới lưu giữ hạnh phúc gia đình truyền thống.'
    },
    ao_dai: {
      title: 'Mảnh ghép: Nhịp bước thanh tân qua thế kỷ',
      story: 'Từ chiếc áo ngũ thân xưa qua bàn tay cách tân của họa sĩ thời tân thời, hai tà áo buông mềm đã đồng hành cùng biết bao thế hệ nữ sinh và người Việt. Mỗi nhịp bước cùng tà áo dài là một nhịp thở tự hào về nét duyên dân tộc.'
    }
  };

  const whatIsPreserved = [
    `Cấu trúc cổ áo và hàng cúc/viền đặc trưng của ${garment.name} (FACT)`,
    `Tinh thần đoan trang, thanh lịch của y phục truyền thống Việt`
  ];

  const whatIsRemixed = [
    `Chiều dài tà áo: ${scissors.length}`,
    `Phom dáng tổng thể: ${scissors.silhouette}`,
    `Trang phục mặc kèm: ${scissors.bottomRemix}`,
    `Phong cách chủ đạo: ${styleDnaTags.join(', ')}`
  ];

  return {
    look_name: lookName,
    reinterpretation_type: reinterpretationType,
    outfit_recommendation: `${garment.name} phiên bản ${reinterpretationType === 'CONTEMPORARY_REMIX' ? 'Contemporary Reinterpretation' : 'truyền thống'}, tà áo ${scissors.length.toLowerCase()}, phối cùng ${scissors.bottomRemix} và phụ kiện ${selection.accessories.join(', ') || 'tối giản'}.`,
    style_dna: styleDnaTags,
    remix_level: `${selection.styleMixer || 45}% Experimental`,
    remix_changes: {
      silhouette: scissors.silhouette,
      length: scissors.length,
      bottom: scissors.bottomRemix,
      layer: scissors.layerRemix,
      accessories: (scissors.accessoryRemix || []).join(', ') || 'Cơ bản',
      color: scissors.colorRemix
    },
    what_is_preserved: whatIsPreserved,
    what_is_remixed: whatIsRemixed,
    context_fit: {
      selected_context_status: selectedContextStatus,
      reason: `Look này mang năng lượng ${styleDnaTags.join(' & ')}, ${selectedContextStatus === 'HIGH' ? 'rất hòa hợp với không khí' : selectedContextStatus === 'MEDIUM' ? 'cần lưu ý tính nghiêm túc của' : 'không khuyến khích diện trong'} bối cảnh ${selectedContext}.`,
      multi_context_matrix: contextMatrix
    },
    styling_reason: `Sự kết hợp giữa phom dáng ${garment.name} và phong cách ${styleDnaTags.join(' x ')} cho bối cảnh ${selectedContext} giúp bạn vừa tự do thể hiện cá tính thời trang mà vẫn giữ trọn linh hồn Việt phục.`,
    color_palette: colorPalette,
    accessories: selection.accessories,
    cultural_note: `FACT: ${garment.key_characteristics[0]} (Nguồn: ${garment.sources[0]}). RECOMMENDATION: Giữ vững đặc trưng nhận diện khi biến tấu phom dáng.`,
    cultural_check: guardrail,
    memory_card: {
      title: memoryStories[selection.vietPhucId]?.title || `Mảnh ghép ký ức ${garment.name}`,
      story: memoryStories[selection.vietPhucId]?.story || garment.shortDescription,
      cultural_context: garment.historical_context,
      key_characteristics: garment.key_characteristics,
      giu_lai: garment.giu_lai,
      co_the_remix: garment.co_the_remix,
      sources: garment.sources
    },
    mentor_message: mentorMessage,
    memory_order_result: memoryOrderResult
  };
}

// API endpoint for evaluating styling
app.post('/api/stylist/evaluate', async (req: Request, res: Response) => {
  try {
    const {
      occasion,
      contextGroup,
      vietPhucId,
      personalStyle,
      styleDna,
      styleMixer,
      colorMood,
      accessories,
      remixScissors,
      avatarProfile,
      mode,
      memoryOrderContext
    } = req.body;

    const selection: StylingSelection = {
      occasion: occasion || 'Sự kiện văn hóa',
      contextGroup: contextGroup || 'CAMPUS',
      vietPhucId: vietPhucId || 'ao_ngu_than',
      personalStyle: personalStyle || 'Elegant',
      styleDna: Array.isArray(styleDna) && styleDna.length ? styleDna : [personalStyle || 'Viet Contemporary'],
      styleMixer: typeof styleMixer === 'number' ? styleMixer : 45,
      colorMood: colorMood || 'Neutral',
      accessories: Array.isArray(accessories) ? accessories : [],
      remixScissors: remixScissors,
      avatarProfile: avatarProfile
    };

    const isMemoryOrder = mode === 'MEMORY_ORDER';
    const garment = CULTURAL_GARMENTS[selection.vietPhucId] || CULTURAL_GARMENTS.ao_ngu_than;
    const baseGuardrail = evaluateCulturalGuardrail(selection);

    // If no Gemini API key, use rich verified knowledge fallback
    if (!ai) {
      const fallbackResponse = generateLocalFallbackResponse(selection, isMemoryOrder);
      return res.json(fallbackResponse);
    }

    // Call Gemini API using modern @google/genai SDK
    const systemInstruction = `You are ANH CẢ, an AI Cultural Stylist inside "Tiệm May Ký Ức".
Your mission is to help users explore Vietnamese traditional clothing while preserving cultural accuracy and encouraging responsible creativity.

You have three roles:
1. AI Stylist (Tư vấn thời trang Gen Z, tinh tế, hiện đại)
2. Cultural Storyteller (Kể chuyện di sản gãy gọn, xúc động, chuẩn xác)
3. Cultural Guardrail (Bảo vệ giá trị cốt lõi của trang phục truyền thống)

PRINCIPLE:
"Remix tự do — nhưng không đánh mất cái làm nên Việt phục."

STRICT RESPONSIBLE AI RULES:
- Phân biệt tuyệt đối giữa "Trang phục truyền thống nguyên bản" (TRADITIONAL_STYLING) và "Contemporary reinterpretation inspired by Việt phục" (CONTEMPORARY_REMIX).
- Không bao giờ gọi phiên bản cắt ngắn (Cropped/Midi/Pleated Skirt) là cách mặc truyền thống, nhưng cũng không phán xét đó là "sai trái" nếu người dùng mặc trong bối cảnh Campus, Social, Content. Hãy cấp trạng thái CAUTION hoặc SAFE (tùy ngữ cảnh) và giải thích rõ ranh giới: giữ lại đặc trưng cốt lõi (cổ áo, cúc cài) vs biến đổi độ dài/phom dáng.
- Never invent historical facts. Never present a personal styling preference as a cultural fact.
- Clearly distinguish FACT (có nguồn từ Bảo tàng Lịch sử Quốc gia), RECOMMENDATION, REMIX, and CAUTION.
- If information is insufficient, explicitly say: "Thông tin hiện có chưa đủ cơ sở để mình kết luận."
- Do not shame the user. Never say "Bạn phối sai", instead say "Cách phối này có nguy cơ làm thay đổi đặc trưng [X] vì...".
- Cultural Check status must be strictly one of: SAFE, CAUTION, REVIEW.
- Return response strictly as a JSON object adhering to the schema. No markdown outside JSON.

KNOWLEDGE BASE (Bảo tàng Lịch sử Quốc gia):
Current Garment: ${garment.name} (${garment.vietnameseName})
Period: ${garment.period}
Historical Context: ${garment.historical_context}
Key Characteristics: ${garment.key_characteristics.join('; ')}
Appropriate Contexts: ${garment.appropriate_contexts.join('; ')}
Remixable Elements: ${garment.remixable_elements.join('; ')}
Sensitive Elements: ${garment.sensitive_elements.join('; ')}
Avoid Combinations: ${garment.avoid_combinations.join('; ')}
Sources: ${garment.sources.join('; ')}
`;

    const userPrompt = `Evaluate this user's Vietnamese traditional outfit styling:
- Bối cảnh (Context Group): ${req.body.contextGroup || selection.occasion}
- Dịp mặc (Occasion): ${selection.occasion}
- Việt phục (Garment): ${garment.name} (${selection.vietPhucId})
- Style DNA: ${(req.body.styleDna || [selection.personalStyle]).join(', ')}
- Style Mixer: ${req.body.styleMixer || 45}% Experimental
- Remix Scissors: Silhouette: ${req.body.remixScissors?.silhouette || 'Giữ nguyên'}, Length: ${req.body.remixScissors?.length || 'Full length'}, Bottom: ${req.body.remixScissors?.bottomRemix || 'Quần dài truyền thống'}, Layer: ${req.body.remixScissors?.layerRemix || 'Không layer'}, Phụ kiện: ${(req.body.remixScissors?.accessoryRemix || selection.accessories).join(', ')}
- Tông màu: ${selection.colorMood}
- Chế độ trải nghiệm: ${isMemoryOrder ? 'ĐƠN HÀNG KÝ ỨC (Khách hàng Mai, kỉ vật: Chiếc quạt giấy cũ của bà, sự kiện: Ngày hội văn hóa)' : 'TỰ PHỐI CHO MÌNH'}

Anh Cả hãy nhận xét với giọng điệu thân thiện, hóm hỉnh, am hiểu văn hóa sâu sắc, tôn trọng sự sáng tạo Gen Z nhưng kiên quyết bảo vệ đặc trưng cổ truyền.`;

    // Call Gemini API using modern @google/genai SDK with 7s timeout race
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            look_name: { type: Type.STRING },
            reinterpretation_type: { type: Type.STRING },
            outfit_recommendation: { type: Type.STRING },
            style_dna: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            remix_level: { type: Type.STRING },
            remix_changes: {
              type: Type.OBJECT,
              properties: {
                silhouette: { type: Type.STRING },
                length: { type: Type.STRING },
                bottom: { type: Type.STRING },
                layer: { type: Type.STRING },
                accessories: { type: Type.STRING },
                color: { type: Type.STRING }
              }
            },
            what_is_preserved: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            what_is_remixed: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            context_fit: {
              type: Type.OBJECT,
              properties: {
                selected_context_status: { type: Type.STRING },
                reason: { type: Type.STRING },
                multi_context_matrix: {
                  type: Type.OBJECT,
                  properties: {
                    campus: { type: Type.STRING },
                    social_concert: { type: Type.STRING },
                    formal_wedding: { type: Type.STRING },
                    cultural_event: { type: Type.STRING }
                  },
                  required: ['campus', 'social_concert', 'formal_wedding', 'cultural_event']
                }
              },
              required: ['selected_context_status', 'reason', 'multi_context_matrix']
            },
            styling_reason: { type: Type.STRING },
            color_palette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  role: { type: Type.STRING }
                },
                required: ['name', 'hex']
              }
            },
            accessories: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cultural_note: { type: Type.STRING },
            cultural_check: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                reason: { type: Type.STRING },
                suggestion: { type: Type.STRING },
                relevant_characteristic: { type: Type.STRING },
                problematic_selection: { type: Type.STRING },
                recommended_replacement: { type: Type.STRING }
              },
              required: ['status', 'reason', 'suggestion']
            },
            memory_card: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                story: { type: Type.STRING }
              },
              required: ['title', 'story']
            },
            mentor_message: { type: Type.STRING },
            memory_order_result: {
              type: Type.OBJECT,
              properties: {
                satisfied: { type: Type.BOOLEAN },
                scoreExplanation: { type: Type.STRING },
                mentorFeedback: { type: Type.STRING }
              }
            }
          },
          required: [
            'look_name',
            'outfit_recommendation',
            'styling_reason',
            'color_palette',
            'accessories',
            'cultural_note',
            'cultural_check',
            'memory_card',
            'mentor_message'
          ]
        }
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 7000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const rawText = response.text?.trim() || '';
    if (!rawText) {
      throw new Error('Empty response from Gemini');
    }

    const parsed = JSON.parse(rawText) as GeminiStylistResponse;

    // Normalize cultural check status
    if (parsed.cultural_check) {
      const st = String(parsed.cultural_check.status).toUpperCase();
      if (st === 'SAFE' || st === 'CAUTION' || st === 'REVIEW') {
        parsed.cultural_check.status = st as any;
      } else {
        parsed.cultural_check.status = baseGuardrail.status;
      }
    } else {
      parsed.cultural_check = baseGuardrail;
    }

    // Enrich memory card with verified sources & characteristics
    parsed.memory_card = {
      ...parsed.memory_card,
      cultural_context: garment.historical_context,
      key_characteristics: garment.key_characteristics,
      giu_lai: garment.giu_lai,
      co_the_remix: garment.co_the_remix,
      sources: garment.sources
    };

    // If Memory Order mode, ensure memory_order_result is populated
    if (isMemoryOrder && !parsed.memory_order_result) {
      const hasFan = selection.accessories.includes('Quạt');
      const isOk = parsed.cultural_check.status !== 'REVIEW';
      parsed.memory_order_result = {
        satisfied: hasFan && isOk,
        scoreExplanation: hasFan && isOk
          ? 'Look phối đồ rất tinh tế, giữ được chiếc quạt kỷ niệm của bà và hòa hợp không khí học đường.'
          : !hasFan
          ? 'Mai cần chiếc quạt giấy của bà để hoàn thành tâm nguyện kết nối ký ức.'
          : 'Cần điều chỉnh phụ kiện cho đúng mực văn hóa để Mai an tâm tỏa sáng.',
        mentorFeedback: 'Anh Cả đồng hành cùng bạn và Mai!'
      };
    }

    return res.json(parsed);
  } catch (error) {
    console.error('Error in /api/stylist/evaluate:', error);
    // Graceful fallback to verified structured knowledge base
    const fallbackResponse = generateLocalFallbackResponse(
      req.body || {
        occasion: 'Sự kiện văn hóa',
        vietPhucId: 'ao_ngu_than',
        personalStyle: 'Elegant',
        colorMood: 'Neutral',
        accessories: []
      },
      req.body?.mode === 'MEMORY_ORDER'
    );
    return res.json(fallbackResponse);
  }
});

// Setup Vite middlewares in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tiệm May Ký Ức server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
