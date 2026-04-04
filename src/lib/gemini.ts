import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenAI({ apiKey });

export const generateSEO = async (productName: string, description: string) => {
  const prompt = `Generate an optimized SEO title (max 60 chars) and meta description (max 160 chars) for a baby care product named "${productName}". Description: ${description}. Return in JSON format with keys: title, description.`;
  
  const response = await genAI.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateProductDescription = async (productName: string, attributes: any) => {
  const prompt = `Write an engaging 150-200 word product description for a baby care product named "${productName}" with these attributes: ${JSON.stringify(attributes)}. Include key features as bullet points.`;
  
  const response = await genAI.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};
