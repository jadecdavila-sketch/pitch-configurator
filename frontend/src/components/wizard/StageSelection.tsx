import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { STAGES } from '../../lib/data';
import { useConfigStore } from '../../store/useConfigStore';

export function StageSelection() {
  const { stage, setStage } = useConfigStore();

  return (
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
  );
}
