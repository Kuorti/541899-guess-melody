import GameModel from "./gameModel";
import GameGenre from "./gameGenreView";
import GameArtist from "./gameArtistView";
import GameStatistics from "./gameStatisticsView";
import StatisticsController from "./statisticsController";
const ONE_SECOND = 1000;

export default class GameScreen {
  constructor() {
    this.gameModel = new GameModel();
    this.view = null;
    this.statisticsController = new StatisticsController(this.gameModel.getQuestions()[this.gameModel.getState().level].type);
  }
  init() {
    this.startTimer();
    this.createView();
  }
  createView() {
    const question = this.gameModel.getQuestions()[this.gameModel.getState().level];
    const ViewClass = question.type === `genre` ? GameGenre : GameArtist;
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState());
    // const gameStatistics = new GameStatistics();
    // const statisticsController = new StatisticsController(question.type);

    // gameTemplate.render();
    // gameTemplate.bind();
    gameTemplate.init();
    // gameStatistics.render();
    // gameStatistics.bind();
    this.statisticsController.init();
  }
  // updateStatistics() {
  //   updateView(headerElement, new HeaderView)
  // }
  // checkLives() {
  //   if (condition) {
  //     gameData.initialState.lives.push(1);
  //     gameData.answers.push(0, 30);
  //   } else {
  //     gameData.answers.push(1, 30);
  //   }
  // }
  handleAnswer(answerTime, condition) {
    // this.stopTimer();
    if (!condition) {
      this.gameModel.minusLife();
    }
    this.gameModel.answers.push(condition, answerTime);
    if (this.checkGameCondition()) {
      this.gameModel.nextLevel();
      console.log(this.gameModel.getState());
      this.statisticsController.updateView(this.gameModel.getState());
    } else {
      console.log("YOU FAILED");
    }
  }
  checkGameCondition() {
    return this.gameModel.getState().lives.length > 0;
  }
  tick() {
    this.gameModel.minusSec();
    this.statisticsController.updateView(this.gameModel.getState());
  }
  startTimer() {
    this.timer = setTimeout(() => {
      this.tick();
      this.startTimer();
    }, ONE_SECOND);
  }
  stopTimer() {
    clearTimeout(this.timer);
  }
  // restart(continueGame) {
  //   if (!continueGame) {
  //   }
  // }
}
