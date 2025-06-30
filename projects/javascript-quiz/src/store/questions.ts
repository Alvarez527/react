import { create } from "zustand";
import { type Question } from "../types.d";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

// Middleware to log state changes
// This middleware logs the state changes to the console
// You can remove it if you don't need logging

// Middleware para logging de cambios de estado
const logger = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      console.log("✅ State changed:", args);
      set(args);
    },
    get,
    api,
  );

export const useQuestionsStore = create<State>()(
  devtools(
    logger(
      persist(
        (set, get) => ({
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const res = await fetch("http://localhost:5173/public/data.json");
            const json = await res.json();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit) as Question[];

            set({ questions }, false, "fetchQuestions");
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const questions = get().questions.map((question) => {
              if (question.id === questionId) {
                const isCorrectUserAnswer =
                  question.correctAnswer === answerIndex;
                if (isCorrectUserAnswer) confetti();
                return {
                  ...question,
                  userSelectedAnswer: answerIndex,
                  isCorrectUserAnswer,
                };
              }
              return question;
            });

            set({ questions });
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            if (currentQuestion < questions.length - 1) {
              set({ currentQuestion: currentQuestion + 1 });
            } else {
              set({ currentQuestion: 0 });
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            if (currentQuestion > 0) {
              set({ currentQuestion: currentQuestion - 1 });
            } else {
              set({ currentQuestion: 0 });
            }
          },

          reset: () => {
            set(
              {
                questions: [],
                currentQuestion: 0,
              },
              false,
              "RESET",
            );
          },
        }),
        {
          name: "questions-storage",
        },
      ),
    ),
  ),
);
