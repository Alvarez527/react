export type QuestionList = Question[]; // o Array<Question>

export type Question = {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number; // índice de la respuesta correcta en el arreglo `answers`
  userSelectedAnswer?: number; // índice de la respuesta seleccionada por el usuario
  isCorrectUserAnswer?: boolean; // indica si la respuesta del usuario es correcta
};
