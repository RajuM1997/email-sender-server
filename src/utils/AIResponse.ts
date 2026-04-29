import { GoogleGenAI } from "@google/genai";
import config from "../config";

const ai = new GoogleGenAI({
  apiKey: config.google_api_key as string,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeResponse(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Reply professionally to a customer asking for pricing.",
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

(async () => {
  const reply = await AIService.makeResponse();
  console.log(reply);
})();
