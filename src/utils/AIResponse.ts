import { GoogleGenAI } from "@google/genai";
import config from "../config";

const ai = new GoogleGenAI({
  apiKey: config.google_api_key as string,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeResponse(retries = 3, emailContent: string) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Read the customer email and return ONLY valid JSON:

{
  "subject": "",
  "content": "",
  "senderEmail": "support@mycompany.com",
  "senderName": "Raju"
}

Rules:
- Return one email reply only
- content should be ready to send
- No markdown
- No explanations
- JSON only

Customer email:
${emailContent}
`,
      });

      return response.text;
    } catch (error: any) {
      if (error?.status === 503 && i < retries - 1) {
        await sleep(2000 * (i + 1)); // exponential-ish backoff
        continue;
      }

      throw error;
    }
  }
}

export const AIService = {
  makeResponse,
};
