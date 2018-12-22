import WelcomeController from "./welcome-controller";
import ResultsController from "./results-controller";
import GameController from './game-controller';
import StatisticsLoader from './statistics-loader-sender';
let gameController = null;

export default class Application {

  static start() {
    // const preloader = new Preloader();
    // preloader.init();
    StatisticsLoader.loadData()
      .then((data) => (gameController = new GameController(data)))
      .then(() => this.showWelcome());
    // .then(() => preloader.stop());
  }

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
