
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { test1Data } from './data/test1';
import { test2Data } from './data/test2';
import { Question, UserAnswer } from './types';

type View = 'welcome' | 'quiz' | 'result';

const App: React.FC = () => {
  const [view, setView] = useState<View>('welcome');
  const [selectedTest, setSelectedTest] = useState<Question[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleStartTest = (testNumber: 1 | 2) => {
    setSelectedTest(testNumber === 1 ? test1Data : test2Data);
    setView('quiz');
  };

  const handleSubmitQuiz = (answers: { [key: number]: string }) => {
    if (!selectedTest) return;

    let correctCount = 0;
    const submittedAnswers: UserAnswer[] = selectedTest.map(question => {
      const userAnswer = answers[question.id] || '';
      const isCorrect = userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
      if (isCorrect) {
        correctCount++;
      }
      return {
        questionId: question.id,
        userAnswer: userAnswer,
        correctAnswer: question.answer,
        isCorrect: isCorrect,
      };
    });

    setUserAnswers(submittedAnswers);
    setCorrectAnswersCount(correctCount);
    setScore(correctCount * 0.25);
    setView('result');
  };

  const handleRestart = () => {
    setView('welcome');
    setSelectedTest(null);
    setUserAnswers([]);
    setScore(0);
    setCorrectAnswersCount(0);
  };

  const renderContent = () => {
    switch (view) {
      case 'quiz':
        return selectedTest && <QuizScreen questions={selectedTest} onSubmit={handleSubmitQuiz} />;
      case 'result':
        return selectedTest && <ResultScreen 
          score={score} 
          correctAnswersCount={correctAnswersCount}
          totalQuestions={selectedTest.length}
          userAnswers={userAnswers}
          questions={selectedTest}
          onRestart={handleRestart}
        />;
      case 'welcome':
      default:
        return <WelcomeScreen onStartTest={handleStartTest} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">English Proficiency Test</h1>
          {view !== 'welcome' && (
            <button
              onClick={handleRestart}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
