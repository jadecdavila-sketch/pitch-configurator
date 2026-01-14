import { useState } from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { Card, CardContent } from '../ui';
import { Button } from '../ui';
import { generateExecutiveSummary } from '../../lib/gemini';
import { exportToPPTX } from '../../lib/pptx';

export function Export() {
  const config = useConfigStore();
  const [executiveSummary, setExecutiveSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const summary = await generateExecutiveSummary(config);
      setExecutiveSummary(summary);
      config.setNarrative(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPPTX = async () => {
    setIsExporting(true);
    try {
      await exportToPPTX(config, executiveSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export PowerPoint');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Your L&D Pitch Configuration
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Review your selections and export your customized proposal
        </p>
      </div>

      {/* Configuration Summary */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary-dark">Configuration Summary</h3>

        <div className="bg-neutral-light-gray/50 rounded-lg p-6 space-y-3">
          {/* Basic Config */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-neutral-charcoal/70 font-medium">Stage:</span>
              <span className="ml-2 text-neutral-charcoal font-bold">{config.stage?.name || 'Not selected'}</span>
            </div>
            <div>
              <span className="text-neutral-charcoal/70 font-medium">Ambition:</span>
              <span className="ml-2 text-neutral-charcoal font-bold">{config.ambition?.name || 'Not selected'}</span>
            </div>
            <div>
              <span className="text-neutral-charcoal/70 font-medium">Path:</span>
              <span className="ml-2 text-neutral-charcoal font-bold">
                {config.path?.type === 'certification' ? 'Certification' : 'Tailored'}
              </span>
            </div>
            <div>
              <span className="text-neutral-charcoal/70 font-medium">Facilitation:</span>
              <span className="ml-2 text-neutral-charcoal font-bold capitalize">{config.facilitation}</span>
            </div>
            <div>
              <span className="text-neutral-charcoal/70 font-medium">Modality:</span>
              <span className="ml-2 text-neutral-charcoal font-bold capitalize">{config.modality}</span>
            </div>
          </div>

          {/* Selected Recipes */}
          <div className="pt-3 border-t border-neutral-light-gray">
            <p className="text-sm font-bold text-neutral-charcoal mb-2">
              Training Recipes ({config.recipes.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {config.recipes.map((recipe) => (
                <span
                  key={recipe.id}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {recipe.name}
                </span>
              ))}
            </div>
          </div>

          {/* Selected Case Studies */}
          {config.caseTiles.length > 0 && (
            <div className="pt-3 border-t border-neutral-light-gray">
              <p className="text-sm font-bold text-neutral-charcoal mb-2">
                Case Studies ({config.caseTiles.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {config.caseTiles.map((caseTile) => (
                  <span
                    key={caseTile.id}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium"
                  >
                    {caseTile.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary-dark">AI-Generated Executive Summary</h3>

        {!executiveSummary ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-neutral-charcoal mb-6">
                Generate an AI-powered executive summary based on your selections
              </p>
              <Button
                onClick={handleGenerateSummary}
                disabled={isGenerating}
                size="lg"
              >
                {isGenerating ? 'Generating...' : '✨ Generate Executive Summary'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <div className="prose max-w-none">
                <div className="text-neutral-charcoal whitespace-pre-wrap leading-relaxed font-medium">
                  {executiveSummary}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-light-gray">
                <Button
                  variant="outline"
                  onClick={handleGenerateSummary}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Regenerating...' : '🔄 Regenerate Summary'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <div className="bg-warning/10 border-2 border-warning rounded-lg p-4">
            <p className="text-neutral-charcoal font-medium">⚠️ {error}</p>
          </div>
        )}
      </div>

      {/* Export Actions */}
      <div className="flex justify-center gap-4 pt-8 border-t-2 border-neutral-light-gray">
        <Button
          size="lg"
          onClick={handleExportPPTX}
          disabled={isExporting || !executiveSummary}
          className="min-w-[200px]"
        >
          {isExporting ? 'Exporting...' : '📊 Export to PowerPoint'}
        </Button>
      </div>
    </div>
  );
}
