import { useState } from 'react';
import { WizardLayout } from './components/layout/WizardLayout';
import { StageAmbitionSelection } from './components/wizard/StageAmbitionSelection';
import { RecipeSelection } from './components/wizard/RecipeSelection';
import { CaseStudySelection } from './components/wizard/CaseStudySelection';
import { PathAndDelivery } from './components/wizard/PathAndDelivery';
import { Export } from './components/wizard/Export';
import { useConfigStore } from './store/useConfigStore';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const { stage, ambition, recipes } = useConfigStore();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return stage !== null && ambition !== null;
      case 1:
        return recipes.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StageAmbitionSelection />;
      case 1:
        return <RecipeSelection />;
      case 2:
        return <CaseStudySelection />;
      case 3:
        return <PathAndDelivery />;
      case 4:
        return <Export />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-secondary-dark">
              Step {currentStep + 1} - Coming Soon
            </h2>
          </div>
        );
    }
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed()}
    >
      {renderStep()}
    </WizardLayout>
  );
}

export default App;
