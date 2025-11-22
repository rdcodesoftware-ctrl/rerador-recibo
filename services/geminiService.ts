import { GoogleGenAI, Type } from "@google/genai";
import { ReceiptData, AIGeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConfirmationMessage = async (data: ReceiptData): Promise<AIGeneratedContent> => {
  try {
    const prompt = `
      Crie uma mensagem curta, educada e profissional para ser enviada por WhatsApp ou E-mail junto com o comprovante de recibo.
      
      Dados do Recibo:
      - Pagador: ${data.payerName}
      - Valor: ${data.amount}
      - Referente a: ${data.referenceMonth} - ${data.description}
      - Emissor: ${data.issuerName}

      A mensagem deve agradecer o pagamento e informar que o recibo segue em anexo.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "Um assunto curto para email" },
            message: { type: Type.STRING, description: "A mensagem de corpo do texto" },
          },
          required: ["subject", "message"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIGeneratedContent;
    }
    
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Error generating message:", error);
    return {
      subject: "Envio de Recibo",
      message: `Olá ${data.payerName}, segue em anexo o recibo referente a ${data.referenceMonth}. Obrigado pelo pagamento.`
    };
  }
};