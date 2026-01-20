import type { ConfigurationState } from '../types';

/**
 * Generate executive summary by calling the secure backend API
 * The Gemini API key is stored securely on the server, not in the frontend
 */
export async function generateExecutiveSummary(config: ConfigurationState): Promise<string> {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  try {
    console.log('Calling backend to generate executive summary...');

    const response = await fetch(`${API_URL}/generate-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate executive summary');
    }

    const data = await response.json();

    if (!data.summary) {
      throw new Error('No summary generated');
    }

    console.log('Successfully generated summary');
    return data.summary;
  } catch (error) {
    console.error('Error generating executive summary:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate executive summary. Please ensure the backend server is running.');
  }
}
