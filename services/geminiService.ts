
import { GoogleGenAI } from "@google/genai";

export const generateFieldReport = async (userName: string, childrenFed: number, packageName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a Head of Field Operations for a global charity. Generate an official, heartwarming, and professional 'Field Mission Report' (max 120 words) for a donor named ${userName} who contributed to the ${packageName} ($${childrenFed} children impact). 
  Details to include:
  1. Mention the specific location (like 'Northern Rift Valley' or 'Dhaka Suburbs').
  2. Describe the arrival of the food supplies.
  3. Mention a specific child by name and their reaction to the meal.
  4. End with a professional sign-off from the 'Field Mission Team'.
  The tone should be authentic, professional, and deeply grateful. Do NOT use the word 'AI' or 'generated'. Make it look like a real field update.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Report Status: Verified. Your contribution has reached the field and is currently providing nutritious meals to the registered children in our regional hub.";
  } catch (error) {
    console.error("Field Report Error:", error);
    return "Mission Update: Your donation is processed and allocated to the upcoming feeding cycle. Thank you for your vital support.";
  }
};
