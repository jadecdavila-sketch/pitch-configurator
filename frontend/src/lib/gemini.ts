import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ConfigurationState } from '../types';

/**
 * Generate executive summary using Gemini API directly from frontend
 * API key is set via VITE_GEMINI_API_KEY environment variable at build time
 */
export async function generateExecutiveSummary(config: ConfigurationState): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Build the prompt
  const clientName = config.clientName || 'the client';
  const stage = config.stage || { name: '', description: '' };
  const ambition = config.ambition || { name: '' };
  const path = config.path || { type: 'tailored' };
  const facilitation = config.facilitation || '';
  const modality = config.modality || '';
  const recipes = config.recipes || [];
  const caseTiles = config.caseTiles || [];

  const recipesText = recipes.map(r => `- ${r.name}: ${r.description}`).join('\n');
  const caseTilesText = caseTiles.map(c => `- ${c.title}: ${c.metric}`).join('\n');
  const pathType = path.type === 'certification' ? 'Certification-Based' : 'Tailored Programs';

  const prompt = `
You are an expert L&D consultant creating an executive summary for a customized Learning & Development proposal for a Global Capability Center (GCC).

Based on the following configuration, write a compelling executive summary (3-4 paragraphs, approximately 250-300 words):

**Client Configuration:**
- Client Name: ${clientName}
- Stage: ${stage.name} - ${stage.description}
- Strategic Ambition: ${ambition.name}
- Learning Path Type: ${pathType}
- Facilitation Model: ${facilitation}
- Delivery Modality: ${modality}

**Selected Training Recipes (${recipes.length}):**
${recipesText}

**Selected Case Studies (${caseTiles.length}):**
${caseTilesText}

Write an executive summary that:
1. Opens with the strategic context and the client's current stage
2. Articulates the strategic ambition and how this L&D approach supports it
3. Highlights the selected training recipes and their expected impact
4. References the proven results from case studies
5. Concludes with the delivery approach and next steps

${clientName && clientName !== 'the client' ? `IMPORTANT: When referring to the client, use "${clientName}" instead of placeholders like "[GCC Name]" or generic terms.` : ''}

Use a professional, consultative tone. Focus on business outcomes and strategic value. Make it compelling and actionable.

IMPORTANT: Output ONLY the executive summary paragraphs. Do NOT include any preamble text like "Here's an executive summary..." or headings like "Executive Summary:". Start directly with the content.
`;

  try {
    console.log('Generating executive summary with Gemini API...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No summary generated');
    }

    console.log('Successfully generated executive summary');
    return text;
  } catch (error) {
    console.error('Error generating executive summary:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
    throw new Error('Failed to generate executive summary');
  }
}
