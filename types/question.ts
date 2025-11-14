export type QuestionType = 'single' | 'multiple' | 'text';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  step: number;
  title: string;
  description?: string;
  type: QuestionType;
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string; // Para tipo 'text'
  correctAnswer: string | string[]; // Respuesta correcta
  explanation?: string; // Explicación de por qué es correcta/incorrecta
}

export interface Answer {
  questionId: string;
  value: string | string[];
  isCorrect?: boolean; // Si la respuesta es correcta o no
}

export interface QuizState {
  currentStep: number;
  answers: Record<string, Answer>;
  isCompleted: boolean;
  score: number; // Puntuación total
  totalQuestions: number;
}

