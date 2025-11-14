'use client';

import { Answer } from '@/types/question';
import { questions } from '@/data/questions';

interface QuizResultsProps {
  answers: Record<string, Answer>;
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

export default function QuizResults({ answers, score, totalQuestions, onReset }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getAnswerDisplay = (questionId: string): string => {
    const answer = answers[questionId];
    if (!answer) return 'Sin respuesta';

    if (Array.isArray(answer.value)) {
      return answer.value.join(', ');
    }

    return String(answer.value);
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return '¡Excelente trabajo!';
    if (percentage >= 80) return '¡Muy bien hecho!';
    if (percentage >= 60) return 'Buen intento';
    return 'Sigue practicando';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 w-full max-w-3xl">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
          percentage >= 80 
            ? 'bg-green-100 dark:bg-green-900/30' 
            : percentage >= 60
            ? 'bg-yellow-100 dark:bg-yellow-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          <span className={`text-3xl font-bold ${getScoreColor()}`}>
            {percentage}%
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {getScoreMessage()}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Puntuación: {score} de {totalQuestions} preguntas correctas
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question) => {
          const answer = answers[question.id];
          const isCorrect = answer?.isCorrect ?? false;
          
          return (
            <div
              key={question.id}
              className={`border-l-4 rounded p-4 ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {question.step}. {question.title}
                </h3>
                {isCorrect ? (
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <span className={`text-sm font-medium ${
                    isCorrect 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    Tu respuesta: {getAnswerDisplay(question.id)}
                  </span>
                </div>
                {!isCorrect && (
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Respuesta correcta: {Array.isArray(question.correctAnswer) 
                        ? question.correctAnswer.join(', ') 
                        : question.correctAnswer}
                    </span>
                  </div>
                )}
                {question.explanation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {question.explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Comenzar de Nuevo
        </button>
      </div>
    </div>
  );
}

