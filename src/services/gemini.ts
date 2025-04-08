import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(API_KEY)

export const models = {
  basic: genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }),
  instructive: genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }),
  explanatory: genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
}

export async function generateResponse(prompt: string, variant: 'basic' | 'instructive' | 'explanatory') {
  try {
    const model = models[variant]
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating response:', error)
    throw error
  }
}

export const prompts = {
  basic: (query: string) => `Provide basic instructions for: ${query}`,
  instructive: (query: string) => `Provide detailed instructions with relevant links for: ${query}. Include step-by-step guidance.`,
  explanatory: (query: string) => `Provide comprehensive instructions for: ${query}. Include:
- Detailed step-by-step guidance
- Multiple alternative approaches
- Relevant links and resources
- Common pitfalls and how to avoid them
- Best practices and tips
- Examples where applicable`
} 