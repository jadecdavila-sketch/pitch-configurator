import { Button } from '../ui';
import { ProgressStepper } from '../wizard/ProgressStepper';
import { WIZARD_STEPS } from '../../lib/data';

interface WizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export function WizardLayout({ children, currentStep, onNext, onBack, canProceed }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-light-gray">
      <header className="bg-secondary-dark text-white py-8 px-8 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">L&DaaS Pitch Configurator</h1>
          <p className="text-white/90 mt-2 text-base font-medium">Build your customized learning & development proposal</p>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <ProgressStepper steps={WIZARD_STEPS} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 min-h-[500px]">{children}</div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={currentStep === 0}
            aria-label="Go to previous step"
          >
            ← Back
          </Button>

          <Button
            size="lg"
            onClick={onNext}
            disabled={!canProceed || currentStep === WIZARD_STEPS.length - 1}
            aria-label="Go to next step"
          >
            Next →
          </Button>
        </div>
      </main>
    </div>
  );
}
