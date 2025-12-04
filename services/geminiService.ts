import { GoogleGenAI } from "@google/genai";
import { AdviceType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdvice = async (type: AdviceType): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  
  let prompt = "";
  
  if (type === AdviceType.RECLUSE) {
    prompt = `
      당신은 따뜻하고 전문적인 심리 상담가입니다.
      '은둔형 외톨이'를 위해 사회로 다시 나갈 용기를 주는 따뜻하고 구체적인 조언을 한 문단(약 3-4문장)으로 작성해주세요.
      부담스럽지 않게, 아주 작은 시작(예: 편의점 가기, 온라인 댓글 달기 등)을 강조해주세요.
      말투는 매우 부드럽고 격려하는 한국어 경어체를 사용해주세요.
      결과물에는 인용부호나 마크다운 없이 텍스트만 출력하세요.
    `;
  } else {
    prompt = `
      당신은 청년들의 멘토입니다.
      '쉬었음 세대'(오랫동안 구직이나 교육 없이 쉰 청년들)를 위해 다시 활동을 시작할 수 있는 동기부여와 구체적인 팁을 한 문단(약 3-4문장)으로 작성해주세요.
      완벽하지 않아도 괜찮다는 위로와, 하루 10분 산책 같은 작은 루틴의 힘을 강조해주세요.
      말투는 긍정적이고 활기찬 한국어 경어체를 사용해주세요.
      결과물에는 인용부호나 마크다운 없이 텍스트만 출력하세요.
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "잠시 후 다시 시도해주세요. 응원의 메시지를 불러오지 못했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "네트워크 상태를 확인해주세요. 마음을 담은 메시지를 가져오는 데 실패했습니다.";
  }
};