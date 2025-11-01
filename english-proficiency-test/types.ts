
export type QuestionType = 'MULTIPLE_CHOICE' | 'FILL_IN_THE_BLANK_WRITE_IN' | 'TRUE_FALSE';

export interface Option {
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  instruction?: string;
  passage?: string;
  options?: Option[];
  answer: string;
  image?: string;
}

export interface UserAnswer {
  questionId: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
