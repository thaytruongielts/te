
import React from 'react';
import { Question } from '../types';
import { BookmarkIcon } from './icons';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer: string | undefined;
  onAnswerChange: (questionId: number, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, userAnswer, onAnswerChange }) => {
  const { id, type, questionText, instruction, passage, options, image } = question;

  const renderInput = () => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
      case 'TRUE_FALSE':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {options?.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerChange(id, option.text)}
                className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                  userAnswer === option.text
                    ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                    : 'bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="font-medium text-slate-700" dangerouslySetInnerHTML={{ __html: option.text }}></span>
              </button>
            ))}
          </div>
        );
      case 'FILL_IN_THE_BLANK_WRITE_IN':
        return (
          <div className="mt-4 flex items-center gap-4">
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => onAnswerChange(id, e.target.value)}
              className="flex-grow p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your answer"
            />
            <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 font-semibold" disabled>Check</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id={`question-${id}`} className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center">
                {questionNumber}
            </div>
            {instruction && <p className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-md">{instruction}</p>}
        </div>
        <button className="text-slate-400 hover:text-blue-500">
            <BookmarkIcon className="w-6 h-6"/>
        </button>
      </div>

      <div className="mt-4 pl-0">
        {passage && (
            <div className="prose prose-slate max-w-none bg-slate-50 p-4 rounded-md mb-4 border border-slate-200">
              <p className="whitespace-pre-wrap">{passage}</p>
            </div>
        )}
        {image && <img src={image} alt="Question context" className="my-4 rounded-md max-w-sm mx-auto" />}

        <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: questionText }}></p>
        
        {renderInput()}
      </div>
    </div>
  );
};

export default QuestionCard;
