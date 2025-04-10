import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function generateResponse(query: string, type: string = 'basic'): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  let prompt = ''

  switch (type) {
    case 'basic':
      prompt = `Provide simple, straightforward steps for: ${query}. Keep it concise and clear.`
      break
    case 'instructive':
      prompt = `Provide detailed instructions for: ${query}. Include relevant links and resources where applicable. Format the response with markdown links.`
      break
    case 'explanatory':
      prompt = `Provide a comprehensive guide for: ${query}. Include:
1. Detailed step-by-step instructions
2. Pros and cons for each major step
3. Relevant links and resources
4. Common pitfalls and how to avoid them
5. Best practices and tips

Format the response with markdown, including:
- Headers for each section
- Bullet points for pros and cons
- Links to resources
- Code blocks where applicable`
      break
    default:
      prompt = `Provide instructions for: ${query}`
  }

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
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