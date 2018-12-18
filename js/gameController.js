import GameModel from "./gameModel";
import GameGenre from "./gameGenreView";
import GameArtist from "./gameArtistView";
import GameStatistics from "./gameStatisticsView";
import Application from "./router";
const ONE_SECOND = 1000;

export default class GameScreen {
  constructor() {
    this.gameModel = new GameModel();
    this.gameStatisticsView = new GameStatistics(this.gameModel.getQuestions()[this.gameModel.getState().level].type, this.gameModel.getState());
    this.view = null;
  }
  init() {
    this.createGameView();
    this.createStatisticsView();
  }
  resetData() {
    this.gameModel.state = {
      level: 0,
      lives: [1, 1, 1],
      timeLeft: 300
    };
  }
  createStatisticsView() {
    this.gameStatisticsView.init();
  }
  createGameView() {
    this.startTimer();
    const question = this.gameModel.getQuestions()[this.gameModel.getState().level];
    const ViewClass = question.type === `genre` ? GameGenre : GameArtist;
    const handler = (answerTime, condition) => this.handleAnswer(answerTime, condition);
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState(), handler);
    gameTemplate.init();
  }
  handleAnswer(answerTime, condition) {
    this.stopTimer();
    if (condition) {
      this.gameModel.minusLife();
    }
    this.gameModel.answers.push(!condition, answerTime);
    if (this.checkGameCondition() && (this.gameModel.getState().level < this.gameModel.getQuestions().length - 1)) {
      this.gameModel.nextLevel();
      this.createGameView();
      this.gameStatisticsView.updateView(this.gameModel.getState());
    } else {
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  checkGameCondition() {
    return this.gameModel.getState().lives.length > 0;
  }
  checkTimeLeft() {
    return this.gameModel.getState().timeLeft <= 0;
  }
  tick() {
    this.timer = setTimeout(() => {
      this.gameModel.minusSec();
      this.gameStatisticsView.updateView(this.gameModel.getState());
      this.tick();
    }, ONE_SECOND);
    if (this.checkTimeLeft()) {
      this.stopTimer();
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  startTimer() {
    this.gameStatisticsView.updateView(this.gameModel.getState());
    this.tick();
  }
  stopTimer() {
    clearTimeout(this.timer);
  }
}
