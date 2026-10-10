import { StylingSelection, GeminiStylistResponse } from '../types';

export interface EvaluateLookParams {
  selection: StylingSelection;
  mode: 'SELF' | 'MEMORY_ORDER';
  memoryOrderContext?: any;
}

export async function requestStylistEvaluation(
  params: EvaluateLookParams
): Promise<GeminiStylistResponse> {
  const response = await fetch('/api/stylist/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      occasion: params.selection.occasion,
      contextGroup: params.selection.contextGroup,
      vietPhucId: params.selection.vietPhucId,
      personalStyle: params.selection.personalStyle,
      styleDna: params.selection.styleDna,
      styleMixer: params.selection.styleMixer,
      colorMood: params.selection.colorMood,
      accessories: params.selection.accessories,
      remixScissors: params.selection.remixScissors,
      avatarProfile: params.selection.avatarProfile,
      mode: params.mode,
      memoryOrderContext: params.memoryOrderContext,
    }),
  });

  if (!response.ok) {
    throw new Error('NETWORK_ERROR');
  }

  const data = await response.json();
  if (!data || !data.look_name) {
    throw new Error('MALFORMED_RESPONSE');
  }

  return data as GeminiStylistResponse;
}
