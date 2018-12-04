// import {showTemplate} from './showTempByNumber';
// import {addEvListenerWelcome} from './welcomeScreen';
import {gameData} from './data/game-data';
import gameView from './gameView';
import throwDomEl from './domEmitter';

const currentState = Object.assign({}, gameData.initialState);
const questions = gameData.questions;
let currentQuestion = 0;

const next = () => {
  const newGameElement = throwDomEl(gameView.render(currentState, questions[currentQuestion++]));
  gameView.bind(newGameElement, {next});
};

next();
// addEvListenerWelcome();
