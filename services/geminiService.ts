import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key must be provided via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (history: { role: string; text: string }[], newMessage: string) => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt context
    const systemInstruction = `
      You are an AI assistant for Zheer Barazan's portfolio website. 
      Zheer is a Senior Software Engineer specializing in React, TypeScript, and AI integrations.
      
      Your goal is to answer questions about Zheer's experience, skills, and availability based on typical portfolio information.
      
      Key Info about Zheer:
      - Role: Senior Software Engineer
      - Experience: 5+ Years
      - Stack: React, Node.js, Python, Tailwind, Gemini API, AWS.
      - Rate: Starts at $100/hr.
      - Availability: Open for contract and full-time roles.
      
      Tone: Professional, concise, and slightly witty.
      Keep answers short (under 50 words unless asked for detail).
    `;

    // Format history for the API if needed, but for simple generateContent we often just concatenate or use chat
    // Here we will use a simple generateContent with the history as context for simplicity in this demo wrapper
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later or email Zheer directly.";
  }
};