'use client';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  canGoNext,
  onPrevious,
  onNext,
  onComplete,
  isLastStep = false,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;

  return (
    <div className="flex justify-between items-center gap-4 mt-8">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          isFirstStep
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Anterior
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all ${
              step === currentStep
                ? 'bg-blue-500 w-8'
                : step < currentStep
                ? 'bg-blue-300 dark:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {isLastStep ? (
        <button
          onClick={onComplete}
          disabled={!canGoNext}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            canGoNext
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          Finalizar
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            canGoNext
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          Siguiente
        </button>
      )}
    </div>
  );
}

