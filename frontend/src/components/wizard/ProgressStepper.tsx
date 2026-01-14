interface Step {
  id: number;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full mb-8 relative">
      {/* Connecting lines - rendered first so they're behind */}
      <div className="absolute top-5 left-0 right-0 flex items-center px-5">
        {steps.slice(0, -1).map((step, index) => (
          <div
            key={`line-${step.id}`}
            className={`h-1 flex-1 transition-colors ${
              index < currentStep ? 'bg-primary' : 'bg-neutral-light-gray'
            }`}
          />
        ))}
      </div>
      {/* Step circles and labels */}
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                index < currentStep
                  ? 'bg-primary text-white'
                  : index === currentStep
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-neutral-light-gray text-neutral-charcoal'
              }`}
            >
              {index < currentStep ? '✓' : step.id}
            </div>
            <span
              className={`mt-2 text-sm font-semibold whitespace-nowrap ${
                index <= currentStep ? 'text-neutral-charcoal' : 'text-neutral-charcoal/60'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
