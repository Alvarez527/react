import React from "react";
import {
  IconButton,
  Stack,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types.d";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./footer";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const handleClick = (index: number) => {
    selectAnswer(info.id, index);
  };

  const getBackgroundColor = (index: number) => {
    if (
      info.userSelectedAnswer === index &&
      info.correctAnswer != index &&
      info.isCorrectUserAnswer === false
    ) {
      return "#f44336";
    }
    if (
      info.userSelectedAnswer === index &&
      info.isCorrectUserAnswer === true
    ) {
      return "#4caf50";
    }
    if (info.correctAnswer === index && info.userSelectedAnswer != null)
      return "#4caf50"; // Correct answer

    return "transparent"; // Default background
  };

  // Usuario no ha seleccionado nada todavia

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left}", marginTop: "4" }}
    >
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter
        language="javascript"
        style={gradientDark}
        customStyle={{ padding: "1rem", margin: "1rem 0" }}
      >
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }}>
        {info.answers.map((answer, index) => {
          return (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                onClick={() => handleClick(index)}
                sx={{
                  backgroundColor: getBackgroundColor(index),
                  color: "#fff",
                  textAlign: "center",
                }}
                disabled={info.userSelectedAnswer != null}
              >
                <ListItemText primary={answer} sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion,
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          {" "}
          <ArrowBackIos />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          {" "}
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
