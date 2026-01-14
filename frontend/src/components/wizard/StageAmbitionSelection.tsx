import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { STAGES, AMBITIONS } from '../../lib/data';
import { useConfigStore } from '../../store/useConfigStore';

export function StageAmbitionSelection() {
  const { clientName, setClientName, stage, setStage, ambition, setAmbition } = useConfigStore();

  return (
    <div className="space-y-12">
      {/* Client Name Input */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary-dark mb-3">
            Client Information
          </h2>
          <p className="text-lg text-neutral-charcoal">
            Enter the client details to get started
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <label htmlFor="clientName" className="block text-sm font-bold text-secondary-dark mb-2">
            Client Name
          </label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full px-4 py-3 border-2 border-neutral-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stage Selection */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary-dark mb-3">
            Select GCC Maturity Stage
          </h2>
          <p className="text-lg text-neutral-charcoal">
            Choose the stage that best describes your client's current position
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STAGES.map((stageOption) => (
            <Card
              key={stageOption.id}
              selected={stage?.id === stageOption.id}
              onClick={() => setStage(stageOption)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setStage(stageOption);
                }
              }}
              aria-pressed={stage?.id === stageOption.id}
            >
              <CardHeader>
                <CardTitle>{stageOption.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-charcoal font-medium">{stageOption.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ambition Selection */}
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
