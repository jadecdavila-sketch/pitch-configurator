import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ConfigurationState } from '../types';

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

try {
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    console.log('Gemini API initialized successfully');
  } else {
    console.warn('No Gemini API key found');
  }
} catch (error) {
  console.error('Failed to initialize Gemini API:', error);
}

export async function generateExecutiveSummary(config: ConfigurationState): Promise<string> {
  if (!genAI || !API_KEY) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  // Use Gemini 2.0 Flash (Gemini 1.5 models have been retired as of 2025)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `
You are an expert L&D consultant creating an executive summary for a customized Learning & Development proposal for a Global Capability Center (GCC).

Based on the following configuration, write a compelling executive summary (3-4 paragraphs, approximately 250-300 words):

**Client Configuration:**
- Client Name: ${config.clientName || 'the client'}
- Stage: ${config.stage?.name} - ${config.stage?.description}
- Strategic Ambition: ${config.ambition?.name}
- Learning Path Type: ${config.path?.type === 'certification' ? 'Certification-Based' : 'Tailored Programs'}
- Facilitation Model: ${config.facilitation}
- Delivery Modality: ${config.modality}

**Selected Training Recipes (${config.recipes.length}):**
${config.recipes.map(r => `- ${r.name}: ${r.description}`).join('\n')}

**Selected Case Studies (${config.caseTiles.length}):**
${config.caseTiles.map(c => `- ${c.title}: ${c.metric}`).join('\n')}

Write an executive summary that:
1. Opens with the strategic context and the client's current stage
2. Articulates the strategic ambition and how this L&D approach supports it
3. Highlights the selected training recipes and their expected impact
4. References the proven results from case studies
5. Concludes with the delivery approach and next steps

${config.clientName ? `IMPORTANT: When referring to the client, use "${config.clientName}" instead of placeholders like "[GCC Name]" or generic terms.` : ''}

Use a professional, consultative tone. Focus on business outcomes and strategic value. Make it compelling and actionable.

IMPORTANT: Output ONLY the executive summary paragraphs. Do NOT include any preamble text like "Here's an executive summary..." or headings like "Executive Summary:". Start directly with the content.
`;

  try {
    console.log('Generating content with Gemini API...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No summary generated');
    }

    console.log('Successfully generated summary');
    return text;
  } catch (error) {
    console.error('Error generating executive summary:', error);
    // Provide more detailed error information
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('Failed to generate executive summary. Please check console for details.');
  }
}
