
import React, { useState, useMemo } from 'react';
import { Question } from '../types';
import QuestionCard from './QuestionCard';

interface QuizScreenProps {
  questions: Question[];
  onSubmit: (answers: { [key: number]: string }) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progressPercentage = useMemo(() => (answeredCount / questions.length) * 100, [answeredCount, questions.length]);

  return (
    <div className="space-y-8">
      <div className="sticky top-[73px] bg-slate-50 py-4 z-10">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-700">Progress</span>
            <span className="text-sm font-medium text-blue-700">{answeredCount} of {questions.length} answered</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          questionNumber={index + 1}
          userAnswer={answers[question.id]}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <div className="flex justify-center pt-8">
        <button
          onClick={() => onSubmit(answers)}
          className="w-full sm:w-auto rounded-md bg-green-600 px-16 py-4 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-transform transform hover:scale-105"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
