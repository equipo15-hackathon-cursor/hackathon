'use client';

import { useState, useCallback } from 'react';
import { Answer, QuizState } from '@/types/question';
import { getTotalSteps, getQuestionByStep, questions } from '@/data/questions';

// Función para comparar respuestas
const compareAnswers = (
  userAnswer: string | string[],
  correctAnswer: string | string[]
): boolean => {
  if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
    // Para respuestas múltiples, deben tener la misma longitud y los mismos valores
    if (userAnswer.length !== correctAnswer.length) return false;
    const sortedUser = [...userAnswer].sort();
    const sortedCorrect = [...correctAnswer].sort();
    return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
  }
  
  if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
    // Comparación case-insensitive y sin espacios extra
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }
  
  return false;
};

export function useQuiz() {
  const totalSteps = getTotalSteps();
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: {},
    isCompleted: false,
    score: 0,
    totalQuestions: totalSteps,
  });

  const updateAnswer = useCallback((questionId: string, value: Answer['value']) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = compareAnswers(value, question.correctAnswer);

    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: { questionId, value, isCorrect },
      },
    }));
  }, []);

  const goToNextStep = useCallback(() => {
    setQuizState((prev) => {
      if (prev.currentStep < totalSteps) {
        return {
          ...prev,
          currentStep: prev.currentStep + 1,
        };
      }
      return prev;
    });
  }, [totalSteps]);

  const goToPreviousStep = useCallback(() => {
    setQuizState((prev) => {
      if (prev.currentStep > 1) {
        return {
          ...prev,
          currentStep: prev.currentStep - 1,
        };
      }
      return prev;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setQuizState((prev) => ({
        ...prev,
        currentStep: step,
      }));
    }
  }, [totalSteps]);

  const canGoToNextStep = useCallback(() => {
    const currentQuestion = getQuestionByStep(quizState.currentStep);
    if (!currentQuestion) return false;
    
    if (!currentQuestion.required) return true;
    
    const answer = quizState.answers[currentQuestion.id];
    if (!answer) return false;
    
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer.value) && answer.value.length > 0;
    }
    
    return answer.value !== '' && answer.value !== null && answer.value !== undefined;
  }, [quizState]);

  const completeQuiz = useCallback(() => {
    setQuizState((prev) => {
      // Calcular el puntaje
      let score = 0;
      Object.values(prev.answers).forEach((answer) => {
        if (answer.isCorrect) {
          score++;
        }
      });

      return {
        ...prev,
        isCompleted: true,
        score,
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentStep: 1,
      answers: {},
      isCompleted: false,
      score: 0,
      totalQuestions: totalSteps,
    });
  }, [totalSteps]);

  return {
    quizState,
    totalSteps,
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    canGoToNextStep,
    completeQuiz,
    resetQuiz,
  };
}

