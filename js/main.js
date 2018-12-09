import {gameData} from './data/game-data';
import WelcomeScreen from "./welcomeScreen";
import GenreScreen from "./gameGenre";
import ArtistScreen from "./gameArtist";
import GameSuccess from "./gameSuccess";
import GameFail from "./gameFail";
import utils from './data/utils';

const welcomeScreen = new WelcomeScreen(gameData.initialState.level);
welcomeScreen.element();
const questions = gameData.questions;
let newGameElement = null;

export const next = () => {
  if (gameData.initialState.currentQuestion === questions.length && gameData.initialState.screenType !== 0) {
    gameData.initialState.screenType = 2;
  }
  if (gameData.initialState.screenType === 0) {
    newGameElement = new WelcomeScreen();
    newGameElement.element();
    gameData.initialState.screenType = 1;
  } else if (gameData.initialState.screenType === 1) {
    if (questions[gameData.initialState.currentQuestion].type === `artist`) {
      newGameElement = new ArtistScreen(questions[gameData.initialState.currentQuestion], gameData.initialState.currentQuestion);
      newGameElement.element();
    } else {
      newGameElement = new GenreScreen(questions[gameData.initialState.currentQuestion], gameData.initialState.currentQuestion);
      newGameElement.element();
    }
    gameData.initialState.currentQuestion++;
  } else if (gameData.initialState.screenType === 2) {
    if (utils.countGamePoints(gameData.answers, gameData.initialState.lives) !== -1) {
      newGameElement = new GameSuccess();
      newGameElement.element();
    } else {
      newGameElement = new GameFail();
      newGameElement.element();
    }
    gameData.initialState.screenType = 0;
    gameData.initialState.currentQuestion = 0;
  }
};
