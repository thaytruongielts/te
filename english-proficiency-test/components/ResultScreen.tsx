
import React from 'react';
import { Question, UserAnswer } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ResultScreenProps {
  score: number;
  correctAnswersCount: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
  questions: Question[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, correctAnswersCount, totalQuestions, userAnswers, questions, onRestart }) => {
    const getQuestionById = (id: number) => questions.find(q => q.id === id);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Test Completed!</h2>
                <p className="text-slate-600 mt-2">Here's your result.</p>
                <div className="mt-6 flex justify-center items-center gap-8">
                    <div className="flex flex-col items-center">
                        <p className="text-5xl font-bold text-blue-600">{score.toFixed(2)}</p>
                        <p className="text-slate-500">Your Score (out of 10)</p>
                    </div>
                    <div className="border-l border-slate-200 h-16"></div>
                    <div className="flex flex-col items-center">
                        <p className="text-5xl font-bold text-green-600">{correctAnswersCount}</p>
                        <p className="text-slate-500">Correct Answers (out of {totalQuestions})</p>
                    </div>
                </div>
                <button
                    onClick={onRestart}
                    className="mt-8 rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                    Take Another Test
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Answer Review</h3>
                <div className="space-y-6">
                    {userAnswers.map(answer => {
                        const question = getQuestionById(answer.questionId);
                        if (!question) return null;
                        
                        return (
                            <div key={answer.questionId} className="border border-slate-200 p-4 rounded-lg">
                                <p className="font-semibold text-slate-700 mb-2">Question {answer.questionId}:</p>
                                <p className="text-slate-600 whitespace-pre-wrap mb-4" dangerouslySetInnerHTML={{ __html: question.questionText }}></p>
                                <div className={`flex items-start p-3 rounded-md ${answer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                                    {answer.isCorrect ? (
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                    ) : (
                                        <XCircleIcon className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-1" />
                                    )}
                                    <div>
                                        <p className="text-sm text-slate-500">Your answer:</p>
                                        <p className="font-medium text-slate-800">{answer.userAnswer || 'No answer'}</p>
                                    </div>
                                </div>
                                {!answer.isCorrect && (
                                    <div className="flex items-start p-3 mt-2 rounded-md bg-green-50">
                                         <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-sm text-slate-500">Correct answer:</p>
                                            <p className="font-medium text-green-800">{answer.correctAnswer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResultScreen;
