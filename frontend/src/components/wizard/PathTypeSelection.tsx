import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { useConfigStore } from '../../store/useConfigStore';

export function PathTypeSelection() {
  const { clientName, setClientName, path, setPath } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Choose Your Learning Path Type
        </h2>
        <p className="text-lg text-neutral-charcoal">
          This determines how the rest of your L&D program will be structured
        </p>
      </div>

      {/* Client Name Input */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card
          selected={path?.type === 'certification'}
          onClick={() => setPath({ type: 'certification' })}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setPath({ type: 'certification' });
            }
          }}
          aria-pressed={path?.type === 'certification'}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Certification-Based</span>
              {path?.type === 'certification' && (
                <span className="text-primary text-2xl">✓</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-charcoal font-medium">
              Structured learning pathways with industry-recognized certifications and credentials
            </p>
          </CardContent>
        </Card>

        <Card
          selected={path?.type === 'tailored'}
          onClick={() => setPath({ type: 'tailored' })}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setPath({ type: 'tailored' });
            }
          }}
          aria-pressed={path?.type === 'tailored'}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tailored Programs</span>
              {path?.type === 'tailored' && (
                <span className="text-primary text-2xl">✓</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-charcoal font-medium">
              Custom-designed programs aligned to specific organizational needs and goals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
