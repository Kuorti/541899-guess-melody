import WelcomeController from "./welcomeController";
// import GameModel from "./gameModel";
// import GameScreen from "./gameController";
import GameStatisticsView from "./gameStatisticsView";
import GameController from './gameController';

const welcomeController = new WelcomeController();
const gameController = new GameController();

export default class Application {

  static showWelcome() {
    welcomeController.init();
  }

  static showGame() {
    gameController.init();
  }

  static showStats(stats) {
    const statistics = new GameStatisticsView(stats);
    // changeView(statistics.element());
  }
}

Application.showWelcome();
