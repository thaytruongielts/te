
import React from 'react';
import { BookOpenIcon } from './icons';

interface WelcomeScreenProps {
  onStartTest: (testNumber: 1 | 2) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartTest }) => {
  return (
    <div className="text-center">
      <div className="max-w-2xl mx-auto">
        <BookOpenIcon className="w-24 h-24 mx-auto text-blue-500" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome to the English Test
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Choose a test to begin. Each test contains 40 questions. After completing the test, you will receive your score. Good luck!
        </p>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
        <button
          onClick={() => onStartTest(1)}
          className="w-full sm:w-auto rounded-md bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-transform transform hover:scale-105"
        >
          Start Test 1
        </button>
        <button
          onClick={() => onStartTest(2)}
          className="w-full sm:w-auto rounded-md bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50 transition-transform transform hover:scale-105"
        >
          Start Test 2
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
