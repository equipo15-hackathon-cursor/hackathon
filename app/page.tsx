'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { getQuestionByStep } from '@/data/questions';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import StepNavigation from '@/components/StepNavigation';
import QuizResults from '@/components/QuizResults';

export default function Home() {
  const {
    quizState,
    totalSteps,
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    canGoToNextStep,
    completeQuiz,
    resetQuiz,
  } = useQuiz();

  const currentQuestion = getQuestionByStep(quizState.currentStep);
  const isLastStep = quizState.currentStep === totalSteps;
  const currentAnswer = currentQuestion
    ? quizState.answers[currentQuestion.id]
    : undefined;

  if (quizState.isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black py-12 px-4">
        <QuizResults 
          answers={quizState.answers} 
          score={quizState.score}
          totalQuestions={quizState.totalQuestions}
          onReset={resetQuiz} 
        />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No se encontró la pregunta
          </h1>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Reiniciar
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (value: any) => {
    if (currentQuestion) {
      updateAnswer(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      completeQuiz();
    } else {
      goToNextStep();
    }
  };

  const handleComplete = () => {
    completeQuiz();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="w-full max-w-3xl">
        <ProgressBar currentStep={quizState.currentStep} totalSteps={totalSteps} />
        
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
        />

        <StepNavigation
          currentStep={quizState.currentStep}
          totalSteps={totalSteps}
          canGoNext={canGoToNextStep()}
          onPrevious={goToPreviousStep}
          onNext={handleNext}
          onComplete={handleComplete}
          isLastStep={isLastStep}
        />
      </div>
    </div>
  );
}
