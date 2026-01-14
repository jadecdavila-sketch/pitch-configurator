import type { ConfigurationState } from '../types';

/**
 * Export configuration to PowerPoint using the Flask backend API
 *
 * This sends the config to the Flask API which:
 * 1. Loads the PowerPoint template
 * 2. Removes unselected recipe slides
 * 3. Adds custom cover/summary slides at the beginning
 * 4. Returns the complete presentation file
 */
export async function exportToPPTX(
  config: ConfigurationState,
  executiveSummary: string | null
): Promise<void> {
  const API_URL = 'http://localhost:5001';

  try {
    // Call Flask API to generate PowerPoint
    const response = await fetch(`${API_URL}/generate-pptx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config,
        executiveSummary,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate PowerPoint');
    }

    // Get the file blob
    const blob = await response.blob();

    // Generate filename
    const fileName = `LD_Pitch_${config.stage?.id || 'config'}_${new Date().toISOString().split('T')[0]}.pptx`;

    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error exporting to PowerPoint:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to export PowerPoint presentation. Please ensure the backend server is running.');
  }
}
