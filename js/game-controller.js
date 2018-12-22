import GameModel from "./game-model";
import GameGenre from "./genre-view";
import GameArtist from "./artist-view";
import GameStatistics from "./statistics-view";
import Application from "./router";
const ONE_SECOND = 1000;
const LOW_TIME_EDGE = 30;

export default class GameScreen {
  constructor(serverData) {
    this.serverData = serverData;
    this.gameModel = new GameModel(this.serverData);
    this.gameStatisticsView = new GameStatistics(this.gameModel.getQuestions()[this.gameModel.getState().level].type, this.gameModel.getState());
    this.view = null;
    this.answerStartTime = null;
  }
  init() {
    this.createGameView();
    this.createStatisticsView();
  }
  resetData() {
    this.gameModel.state = {
      level: 0,
      lives: [],
      timeLeft: 300,
      cheatMode: 1
    };
    this.gameModel.answers = [];
  }
  createStatisticsView() {
    this.gameStatisticsView.init();
  }
  createGameView() {
    this.startTimer();
    const question = this.gameModel.getQuestions()[this.gameModel.getState().level];
    const ViewClass = question.type === `genre` ? GameGenre : GameArtist;
    const handler = (condition) => this.handleAnswer(condition);
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState(), handler);
    gameTemplate.init();
    this.answerStartTime = this.gameModel.getState().timeLeft;
  }
  handleAnswer(condition) {
    this.stopTimer();
    if (condition) {
      this.gameModel.minusLife();
    }
    let answerTime = Math.abs(this.gameModel.getState().timeLeft - this.answerStartTime);
    this.gameModel.answers.push(+!condition, answerTime);
    if (this.checkGameCondition() && (this.gameModel.getState().level < this.gameModel.getQuestions().length - 1)) {
      this.gameModel.nextLevel();
      this.createGameView();
      this.gameStatisticsView.updateView(this.gameModel.getState());
    } else {
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  checkGameCondition() {
    return this.gameModel.getState().lives.length <= 3;
  }
  checkTimeLeft() {
    return this.gameModel.getState().timeLeft <= 0;
  }
  tick() {
    this.timer = setTimeout(() => {
      let timeLeft = this.gameModel.getState().timeLeft;
      this.gameModel.minusSec();
      this.gameStatisticsView.updateView(this.gameModel.getState());
      if (timeLeft < LOW_TIME_EDGE) {
        this.gameStatisticsView.createlowTimeEffect();
      }
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
