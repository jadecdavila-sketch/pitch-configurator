import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { AMBITIONS } from '../../lib/data';
import { useConfigStore } from '../../store/useConfigStore';

export function AmbitionSelection() {
  const { ambition, setAmbition } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Select Strategic Ambition
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Choose the long-term vision for your GCC's L&D function
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AMBITIONS.map((ambitionOption) => (
          <Card
            key={ambitionOption.id}
            selected={ambition?.id === ambitionOption.id}
            onClick={() => setAmbition(ambitionOption)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAmbition(ambitionOption);
              }
            }}
            aria-pressed={ambition?.id === ambitionOption.id}
          >
            <CardHeader>
              <CardTitle>{ambitionOption.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium">
                {getAmbitionDescription(ambitionOption.id)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getAmbitionDescription(id: string): string {
  const descriptions: Record<string, string> = {
    'capability-hub': 'Build a centralized hub for developing critical capabilities across the organization',
    'talent-differentiator': 'Create a competitive advantage through superior talent development and retention',
    'innovation-center': 'Establish the GCC as a center for learning innovation and thought leadership',
  };
  return descriptions[id] || '';
}
