import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { CASE_TILES } from '../../lib/data';
import { useConfigStore } from '../../store/useConfigStore';
import type { CaseTile } from '../../types';

export function CaseStudySelection() {
  const { caseTiles, recipes, addCaseTile, removeCaseTile } = useConfigStore();

  const isCaseSelected = (caseId: string) => {
    return caseTiles.some(c => c.id === caseId);
  };

  const handleCaseToggle = (caseTile: CaseTile) => {
    if (isCaseSelected(caseTile.id)) {
      removeCaseTile(caseTile.id);
    } else {
      addCaseTile(caseTile);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      'monitor': '💻',
      'users': '👥',
      'rocket': '🚀',
      'target': '🎯',
      'book': '📚',
      'trending-up': '📈',
    };
    return icons[iconName] || '✨';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Select Case Studies
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Choose success stories to showcase the impact of your selected programs
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-lg">
          <span className="text-sm font-bold text-secondary-dark">
            {caseTiles.length} case {caseTiles.length === 1 ? 'study' : 'studies'} selected
          </span>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12 bg-warning/10 rounded-lg border-2 border-warning">
          <p className="text-neutral-charcoal font-medium mb-2">
            ⚠️ No recipes selected yet
          </p>
          <p className="text-neutral-charcoal/80 text-sm">
            Please go back and select training recipes first to see relevant case studies.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_TILES.map((caseTile) => {
            const selected = isCaseSelected(caseTile.id);

            return (
              <Card
                key={caseTile.id}
                selected={selected}
                onClick={() => handleCaseToggle(caseTile)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCaseToggle(caseTile);
                  }
                }}
                aria-pressed={selected}
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getIcon(caseTile.icon)}</span>
                      <span className="flex-1">{caseTile.title}</span>
                    </div>
                    {selected && (
                      <span className="ml-2 text-primary text-xl">✓</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-success/10 px-3 py-2 rounded-md">
                    <p className="text-success font-bold text-sm">
                      {caseTile.metric}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
