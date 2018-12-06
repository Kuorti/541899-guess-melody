// import {showTemplate} from './showTempByNumber';
// import {addEvListenerWelcome} from './welcomeScreen';
import {gameData} from './data/game-data';
import gameView from './gameView';
import throwDomEl from './domEmitter';

const currentState = Object.assign({}, gameData.initialState);
const questions = gameData.questions;
const results = gameData.resultData;
let currentQuestion = 0;
currentState.screenType = 0;

const next = () => {
  let newGameElement = null;
  if (currentQuestion === questions.length && currentState.screenType !== 0) {
    currentState.screenType = 2;
  }

  if (currentState.screenType === 0) {
    newGameElement = throwDomEl(gameView.render(currentState));
    currentQuestion++;
    currentState.screenType = 1;
  } else if (currentState.screenType === 1) {
    newGameElement = throwDomEl(gameView.render(currentState, questions[currentQuestion++]));
  } else if (currentState.screenType === 2) {
    newGameElement = throwDomEl(gameView.render(currentState, results));
    currentState.screenType = 0;
    currentQuestion = 0;
  }
  gameView.bind(newGameElement, {next});
};

next();
