'use client';

import { Question, Answer } from '@/types/question';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswerChange: (value: Answer['value']) => void;
}

export default function QuestionCard({ question, answer, onAnswerChange }: QuestionCardProps) {
  // Derive text value directly from answer prop when available
  // Use local state only for the current input value
  const getTextValue = () => {
    if (answer && question.type === 'text' && typeof answer.value === 'string') {
      return answer.value;
    }
    return '';
  };
  
  const [textValue, setTextValue] = useState<string>(getTextValue());
  
  // Use answer value if it exists, otherwise use local state
  const currentTextValue = answer && question.type === 'text' && typeof answer.value === 'string' 
    ? answer.value 
    : textValue;

  const handleTextChange = (value: string) => {
    setTextValue(value);
    onAnswerChange(value);
  };

  const handleSingleSelect = (value: string) => {
    onAnswerChange(value);
  };

  const handleMultipleSelect = (value: string) => {
    const currentValues = Array.isArray(answer?.value) ? answer.value : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onAnswerChange(newValues);
  };

  const isOptionSelected = (value: string): boolean => {
    if (question.type === 'single') {
      return answer?.value === value;
    }
    if (question.type === 'multiple') {
      return Array.isArray(answer?.value) && answer.value.includes(value);
    }
    return false;
  };

  const isCorrectAnswer = (value: string): boolean => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(value);
    }
    return question.correctAnswer === value;
  };

  const hasAnswered = answer !== undefined && answer.value !== '' && 
    (Array.isArray(answer.value) ? answer.value.length > 0 : true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            {question.description}
          </p>
        )}
        {question.required && (
          <span className="inline-block mt-2 text-sm text-red-500">* Requerido</span>
        )}
        
        {/* Feedback de respuesta */}
        {hasAnswered && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
            answer?.isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' 
              : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
          }`}>
            {answer?.isCorrect ? (
              <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div className="flex-1">
              <p className={`font-semibold ${
                answer?.isCorrect 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {answer?.isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              {question.explanation && (
                <p className={`text-sm mt-1 ${
                  answer?.isCorrect 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {question.explanation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {question.type === 'text' && (
          <div>
            <textarea
              value={currentTextValue}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={question.placeholder || 'Escribe tu respuesta aquí...'}
              disabled={hasAnswered}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none ${
                hasAnswered
                  ? answer?.isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              rows={4}
            />
            {hasAnswered && (
              <div className="mt-2 text-sm">
                <span className={`font-medium ${
                  answer?.isCorrect 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  Respuesta correcta: {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                </span>
              </div>
            )}
          </div>
        )}

        {question.type === 'single' && question.options && (
          <div className="space-y-3">
            {question.options.map((option) => {
              const selected = isOptionSelected(option.value);
              const isCorrect = isCorrectAnswer(option.value);
              const showFeedback = hasAnswered;
              
              let buttonClass = 'w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-between';
              
              if (showFeedback) {
                if (selected && isCorrect) {
                  buttonClass += ' border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300';
                } else if (selected && !isCorrect) {
                  buttonClass += ' border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300';
                } else if (!selected && isCorrect) {
                  buttonClass += ' border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400';
                } else {
                  buttonClass += ' border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400';
                }
              } else {
                buttonClass += selected
                  ? ' border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : ' border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500';
              }
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleSingleSelect(option.value)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <span>{option.label}</span>
                  {showFeedback && (
                    <span>
                      {isCorrect ? (
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : selected ? (
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'multiple' && question.options && (
          <div className="space-y-3">
            {question.options.map((option) => {
              const selected = isOptionSelected(option.value);
              const isCorrect = isCorrectAnswer(option.value);
              const showFeedback = hasAnswered;
              
              let buttonClass = 'w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-between';
              
              if (showFeedback) {
                if (isCorrect) {
                  buttonClass += selected
                    ? ' border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : ' border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400';
                } else if (selected && !isCorrect) {
                  buttonClass += ' border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300';
                } else {
                  buttonClass += ' border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400';
                }
              } else {
                buttonClass += selected
                  ? ' border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : ' border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500';
              }
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleMultipleSelect(option.value)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        selected
                          ? showFeedback && isCorrect
                            ? 'border-green-500 bg-green-500'
                            : showFeedback && !isCorrect
                            ? 'border-red-500 bg-red-500'
                            : 'border-blue-500 bg-blue-500'
                          : 'border-gray-400 dark:border-gray-500'
                      }`}
                    >
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    {option.label}
                  </div>
                  {showFeedback && isCorrect && (
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

