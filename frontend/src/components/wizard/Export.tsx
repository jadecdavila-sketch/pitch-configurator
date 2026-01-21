import { useState } from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { Card, CardContent } from '../ui';
import { Button } from '../ui';
import { generateExecutiveSummary } from '../../lib/gemini';
import { downloadPDF } from '../../lib/pdf/generatePDF';

export function Export() {
  const config = useConfigStore();
  const [executiveSummary, setExecutiveSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricingType, setPricingType] = useState<'fixed' | 'per-head' | null>(config.pricing?.type || null);
  const [fixedAmount, setFixedAmount] = useState<string>(
    config.pricing?.type === 'fixed' ? String(Math.round(config.pricing.amount * 100) / 100) : ''
  );
  const [pricePerHead, setPricePerHead] = useState<string>(
    config.pricing?.type === 'per-head' ? String(Math.round(config.pricing.pricePerHead * 100) / 100) : ''
  );
  const [minimumEmployees, setMinimumEmployees] = useState<string>(
    config.pricing?.type === 'per-head' ? String(config.pricing.minimumEmployees) : ''
  );

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

  const handleExportPDF = async () => {
    if (!executiveSummary) return;

    setIsExporting(true);
    setError(null);
    try {
      await downloadPDF(config, executiveSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePricingTypeChange = (type: 'fixed' | 'per-head' | null) => {
    setPricingType(type);
    if (!type) {
      config.setPricing(null);
      setFixedAmount('');
      setPricePerHead('');
      setMinimumEmployees('');
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

      {/* Pricing Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary-dark">Pricing</h3>

        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-charcoal">Select pricing model:</p>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingType"
                    value="fixed"
                    checked={pricingType === 'fixed'}
                    onChange={() => handlePricingTypeChange('fixed')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-neutral-charcoal">Fixed Price</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingType"
                    value="per-head"
                    checked={pricingType === 'per-head'}
                    onChange={() => handlePricingTypeChange('per-head')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-neutral-charcoal">Price Per Head</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingType"
                    value="none"
                    checked={pricingType === null}
                    onChange={() => handlePricingTypeChange(null)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-neutral-charcoal">No Pricing</span>
                </label>
              </div>
            </div>

            {pricingType === 'fixed' && (
              <div className="pt-4 border-t border-neutral-light-gray">
                <label className="block">
                  <span className="text-sm font-medium text-neutral-charcoal mb-2 block">
                    Fixed Amount ($)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={fixedAmount}
                    onChange={(e) => {
                      setFixedAmount(e.target.value);
                      if (e.target.value) {
                        const amount = Math.round(parseFloat(e.target.value) * 100) / 100;
                        config.setPricing({
                          type: 'fixed',
                          amount,
                        });
                      }
                    }}
                    placeholder="Enter fixed price"
                    className="w-full px-4 py-2 border-2 border-neutral-light-gray rounded-lg focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
            )}

            {pricingType === 'per-head' && (
              <div className="pt-4 border-t border-neutral-light-gray space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-neutral-charcoal mb-2 block">
                    Price Per Employee ($)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={pricePerHead}
                    onChange={(e) => {
                      setPricePerHead(e.target.value);
                      if (e.target.value && minimumEmployees) {
                        const price = Math.round(parseFloat(e.target.value) * 100) / 100;
                        config.setPricing({
                          type: 'per-head',
                          pricePerHead: price,
                          minimumEmployees: parseInt(minimumEmployees, 10),
                        });
                      }
                    }}
                    placeholder="Enter price per employee"
                    className="w-full px-4 py-2 border-2 border-neutral-light-gray rounded-lg focus:border-primary focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-neutral-charcoal mb-2 block">
                    Minimum Number of Employees
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={minimumEmployees}
                    onChange={(e) => {
                      setMinimumEmployees(e.target.value);
                      if (e.target.value && pricePerHead) {
                        const price = Math.round(parseFloat(pricePerHead) * 100) / 100;
                        config.setPricing({
                          type: 'per-head',
                          pricePerHead: price,
                          minimumEmployees: parseInt(e.target.value, 10),
                        });
                      }
                    }}
                    placeholder="Enter minimum employees"
                    className="w-full px-4 py-2 border-2 border-neutral-light-gray rounded-lg focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
            )}

            {config.pricing && (
              <div className="pt-4 border-t border-neutral-light-gray bg-primary/5 rounded-lg p-4">
                <p className="text-sm font-bold text-neutral-charcoal mb-1">Current Pricing:</p>
                {config.pricing.type === 'fixed' ? (
                  <p className="text-lg font-bold text-primary">
                    ${config.pricing.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                ) : (
                  <p className="text-lg font-bold text-primary">
                    ${config.pricing.pricePerHead.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per employee
                    <span className="text-sm font-medium text-neutral-charcoal ml-2">
                      (minimum {config.pricing.minimumEmployees} employees)
                    </span>
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
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
          onClick={handleExportPDF}
          disabled={isExporting || !executiveSummary}
          className="min-w-[200px]"
        >
          {isExporting ? 'Exporting...' : '📄 Export to PDF'}
        </Button>
      </div>
    </div>
  );
}
