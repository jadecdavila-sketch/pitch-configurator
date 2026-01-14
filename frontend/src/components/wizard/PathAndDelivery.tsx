import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { useConfigStore } from '../../store/useConfigStore';

export function PathAndDelivery() {
  const { facilitation, setFacilitation, modality, setModality } = useConfigStore();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Delivery Configuration
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Choose how the learning programs will be delivered and facilitated
        </p>
      </div>

      {/* Facilitation Model Selection */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary-dark">Facilitation Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            selected={facilitation === 'internal'}
            onClick={() => setFacilitation('internal')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFacilitation('internal');
              }
            }}
            aria-pressed={facilitation === 'internal'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Internal</span>
                {facilitation === 'internal' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Delivered by in-house L&D team and subject matter experts
              </p>
            </CardContent>
          </Card>

          <Card
            selected={facilitation === 'external'}
            onClick={() => setFacilitation('external')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFacilitation('external');
              }
            }}
            aria-pressed={facilitation === 'external'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>External</span>
                {facilitation === 'external' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Led by external consultants and industry experts
              </p>
            </CardContent>
          </Card>

          <Card
            selected={facilitation === 'mixed'}
            onClick={() => setFacilitation('mixed')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFacilitation('mixed');
              }
            }}
            aria-pressed={facilitation === 'mixed'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mixed</span>
                {facilitation === 'mixed' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Combination of internal and external facilitators
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modality Selection */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary-dark">Delivery Modality</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            selected={modality === 'digital'}
            onClick={() => setModality('digital')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setModality('digital');
              }
            }}
            aria-pressed={modality === 'digital'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>💻 Digital</span>
                {modality === 'digital' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Fully online, self-paced or live virtual sessions
              </p>
            </CardContent>
          </Card>

          <Card
            selected={modality === 'hybrid'}
            onClick={() => setModality('hybrid')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setModality('hybrid');
              }
            }}
            aria-pressed={modality === 'hybrid'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>🔄 Hybrid</span>
                {modality === 'hybrid' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Blend of digital content and in-person sessions
              </p>
            </CardContent>
          </Card>

          <Card
            selected={modality === 'in-person'}
            onClick={() => setModality('in-person')}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setModality('in-person');
              }
            }}
            aria-pressed={modality === 'in-person'}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>👥 In-Person</span>
                {modality === 'in-person' && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-charcoal font-medium text-sm">
                Face-to-face workshops and classroom training
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
