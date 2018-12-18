import WelcomeController from "./welcomeController";
import ResultsController from "./resultsController";
import GameController from './gameController';
const gameController = new GameController();

export default class Application {

  static showWelcome() {
    gameController.stopTimer();
    gameController.resetData();
    const welcomeController = new WelcomeController();
    welcomeController.init();
  }

  static showGame() {
    gameController.init();
  }

  static showStats(stats, answers) {
    const resultsController = new ResultsController(stats, answers);
    resultsController.init();
  }
}

Application.showWelcome();
