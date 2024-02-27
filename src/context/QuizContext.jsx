import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const BASE_URL = "http://localhost:8000";

const initialState = {
  totalQuestions: [],
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  submited: false,
  highestScore: 0,
  seconds: null,
  user: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        user: action.payload,
        status: "loggedIn",
      };
    case "logout":
      return initialState;
    case "dataRecieved":
      return {
        ...state,
        totalQuestions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "getStart":
      return {
        ...state,
        status: "selection",
      };
    case "loadQuestions":
      return {
        ...state,
        status: "loading",
        questions: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        submited: false,
        answer: null,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        submited: true,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "retake":
      return {
        ...initialState,
        user: state.user,
        questions: state.questions,
        status: "active",
        seconds: state.questions.length * SECS_PER_QUESTION,
        highestScore: state.highestScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "loggedIn",
        user: state.user,
        highestScore: state.highestScore,
      };
    case "timer":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unkown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      user,
      totalQuestions,
      questions,
      status,
      seconds,
      index,
      highestScore,
      answer,
      submited,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  function getData(engName) {
    fetch(`${BASE_URL}/${engName}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }

  return (
    <QuizContext.Provider
      value={{
        user,
        totalQuestions,
        questions,
        status,
        seconds,
        index,
        highestScore,
        answer,
        submited,
        points,
        numOfQuestions,
        maxPoints,
        dispatch,
        getData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context used outside provider...");
  return context;
}

export { QuizProvider, useQuiz };
