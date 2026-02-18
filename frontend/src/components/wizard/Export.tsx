import { useState } from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { Card, CardContent } from '../ui';
import { Button } from '../ui';
import { generateExecutiveSummary } from '../../lib/gemini';
import { downloadPDF } from '../../lib/pdf/generatePDF';
import type { PricingTier } from '../../types';

const PRICING_TIERS = [
  {
    id: 'base-ops' as PricingTier,
    name: 'Base Ops - Operational Foundation',
    price: 4000,
    idealFor: 'Small-to-mid GCCs (50-150 employees)',
    bestWhen: 'Operational support for onboarding and vendor management without full L&D infrastructure',
    keyBenefit: 'Cost-effective foundation for essential L&D operations',
  },
  {
    id: 'base-plus' as PricingTier,
    name: 'Base+ - Full-Service Learning',
    price: 7500,
    idealFor: 'Growing GCCs (150-300 employees)',
    bestWhen: 'Complete learning operations including content library, LMS platform, and regular training delivery',
    keyBenefit: 'Comprehensive L&D solution with shared resources and proven content',
  },
  {
    id: 'enterprise' as PricingTier,
    name: 'Enterprise - Embedded Partnership',
    price: 10500,
    idealFor: 'Large/strategic GCCs (300+ employees)',
    bestWhen: 'Dedicated L&D team functioning as extension of your organization with full customization',
    keyBenefit: 'Strategic partnership with embedded team, custom solutions, and maximum delivery capacity',
  },
];

export function Export() {
  const config = useConfigStore();
  const [executiveSummary, setExecutiveSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(
    config.pricing?.type === 'tier' ? config.pricing.tier : null
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

  const handleTierSelect = (tierId: PricingTier) => {
    const tier = PRICING_TIERS.find(t => t.id === tierId);
    if (tier) {
      setSelectedTier(tierId);
      config.setPricing({
        type: 'tier',
        tier: tierId,
        name: tier.name,
        amount: tier.price,
      });
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
        <h3 className="text-2xl font-bold text-secondary-dark">Which Tier Is Right for Your GCC?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTier === tier.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'border-neutral-light-gray'
              }`}
              onClick={() => handleTierSelect(tier.id)}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-secondary-dark text-sm leading-tight">{tier.name}</h4>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-primary font-semibold">Ideal for: </span>
                    <span className="text-neutral-charcoal">{tier.idealFor}</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Best when you need: </span>
                    <span className="text-neutral-charcoal">{tier.bestWhen}</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Key benefit: </span>
                    <span className="text-neutral-charcoal">{tier.keyBenefit}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-light-gray">
                  <p className="text-2xl font-bold text-neutral-charcoal">
                    ${tier.price.toLocaleString('en-US')} <span className="text-sm font-normal">/ month</span>
                  </p>
                </div>

                {selectedTier === tier.id && (
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
