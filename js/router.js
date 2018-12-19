import WelcomeController from "./welcomeController";
import ResultsController from "./resultsController";
import GameController from './gameController';
let gameController = null;

export default class Application {

  static start() {
    // const preloader = new Preloader();
    // preloader.init();
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then((response) => (response.json()))
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
