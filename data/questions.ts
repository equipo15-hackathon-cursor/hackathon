import { Question } from '@/types/question';

export const questions: Question[] = [
  {
    id: '1',
    step: 1,
    title: '¿Cuál es la capital de España?',
    description: 'Selecciona la respuesta correcta',
    type: 'single',
    required: true,
    options: [
      { id: 'barcelona', label: 'Barcelona', value: 'barcelona' },
      { id: 'madrid', label: 'Madrid', value: 'madrid' },
      { id: 'valencia', label: 'Valencia', value: 'valencia' },
      { id: 'sevilla', label: 'Sevilla', value: 'sevilla' },
    ],
    correctAnswer: 'madrid',
    explanation: 'Madrid es la capital y ciudad más poblada de España.',
  },
  {
    id: '2',
    step: 2,
    title: '¿Cuál de estos lenguajes es de programación?',
    description: 'Selecciona todas las opciones correctas',
    type: 'multiple',
    required: true,
    options: [
      { id: 'javascript', label: 'JavaScript', value: 'javascript' },
      { id: 'html', label: 'HTML', value: 'html' },
      { id: 'python', label: 'Python', value: 'python' },
      { id: 'css', label: 'CSS', value: 'css' },
    ],
    correctAnswer: ['javascript', 'python'],
    explanation: 'JavaScript y Python son lenguajes de programación. HTML y CSS son lenguajes de marcado y estilos respectivamente.',
  },
  {
    id: '3',
    step: 3,
    title: '¿En qué año se fundó Google?',
    description: 'Escribe el año correcto',
    type: 'text',
    required: true,
    placeholder: 'Ej: 1998',
    correctAnswer: '1998',
    explanation: 'Google fue fundado en 1998 por Larry Page y Sergey Brin.',
  },
  {
    id: '4',
    step: 4,
    title: '¿Cuál es el planeta más grande del sistema solar?',
    description: 'Selecciona la respuesta correcta',
    type: 'single',
    required: true,
    options: [
      { id: 'tierra', label: 'Tierra', value: 'tierra' },
      { id: 'marte', label: 'Marte', value: 'marte' },
      { id: 'jupiter', label: 'Júpiter', value: 'jupiter' },
      { id: 'saturno', label: 'Saturno', value: 'saturno' },
    ],
    correctAnswer: 'jupiter',
    explanation: 'Júpiter es el planeta más grande del sistema solar.',
  },
  {
    id: '5',
    step: 5,
    title: '¿Cuáles son números primos?',
    description: 'Selecciona todos los números primos',
    type: 'multiple',
    required: true,
    options: [
      { id: '2', label: '2', value: '2' },
      { id: '4', label: '4', value: '4' },
      { id: '7', label: '7', value: '7' },
      { id: '9', label: '9', value: '9' },
      { id: '11', label: '11', value: '11' },
    ],
    correctAnswer: ['2', '7', '11'],
    explanation: 'Los números primos son aquellos que solo son divisibles por 1 y por sí mismos: 2, 7 y 11.',
  },
];

export const getQuestionByStep = (step: number): Question | undefined => {
  return questions.find((q) => q.step === step);
};

export const getTotalSteps = (): number => {
  return questions.length;
};

