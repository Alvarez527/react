import React from "react";
import { JavaScriptLogo } from "./JavascriptLogo";
import "./App.css";
import { Container, Typography, Stack } from "@mui/material";
import { Start } from "./start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  console.log(questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <JavaScriptLogo />
          <Typography variant="h5" component="h1">
            Javascript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
