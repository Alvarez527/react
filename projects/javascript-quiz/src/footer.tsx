import React, { use } from "react";
import { useQuestionsStore } from "./store/questions";
import { Button } from "@mui/material";

const Footer = () => {
  // Aqui se esta monitoreando todo el estado, de lo contrario solo sería {questions}
  const questions = useQuestionsStore((state) => state.questions);

  const reset = useQuestionsStore((state) => state.reset);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    if (question.userSelectedAnswer === null) {
      unanswered++;
    } else if (question.isCorrectUserAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  // Indica a continuación el numero de correctas e incorrectas
  return (
    <footer className="footer" style={{ marginTop: "16px" }}>
      <p>Hecho por Carlos Alvarez</p>
      <p>Con ❤️ y React</p>
      <strong>{` ✅ ${correct} - ❌ ${incorrect} - ❓ ${unanswered} `}</strong>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "8px 0",
        }}
      >
        <Button
          variant="contained"
          onClick={reset}
          style={{ marginTop: "8px" }}
        >
          Reiniciar
        </Button>
      </div>
    </footer>
  );
};

export { Footer };
