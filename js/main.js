import {gameData} from './data/game-data';
import gameView from './gameView';
import throwDomEl from './domEmitter';

// const currentState = Object.assign({}, gameData.initialState);
const currentState = gameData.initialState;
const questions = gameData.questions;
const results = gameData.resultData;
let currentQuestion = -1;
let questionNumberToSend = null;
currentState.screenType = 0;

const next = () => {
  let newGameElement = null;
  if (currentQuestion === questions.length && currentState.screenType !== 0) {
    currentState.screenType = 2;
  }
  if (currentState.screenType === 0) {
    currentQuestion = -1;
    questionNumberToSend = currentQuestion;
    newGameElement = throwDomEl(gameView.render(currentState));
    currentQuestion++;
    currentState.screenType = 1;
  } else if (currentState.screenType === 1) {
    questionNumberToSend = currentQuestion;
    newGameElement = throwDomEl(gameView.render(currentState, questions[currentQuestion++]));
  } else if (currentState.screenType === 2) {
    questionNumberToSend = currentQuestion;
    newGameElement = throwDomEl(gameView.render(currentState, results));
    currentState.screenType = 0;
    currentQuestion = 0;
  }
  gameView.bind(newGameElement, {next}, questionNumberToSend);
};

next();
