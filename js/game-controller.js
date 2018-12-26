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
    this._createGameView();
    this._createStatisticsView();
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
  _createStatisticsView() {
    this.gameStatisticsView.init();
  }
  _createGameView() {
    this._startTimer();
    const question = this.gameModel.getQuestions()[this.gameModel.getState().level];
    const ViewClass = question.type === `genre` ? GameGenre : GameArtist;
    const handler = (condition) => this._handleAnswer(condition);
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState(), handler);
    gameTemplate.init();
    this.answerStartTime = this.gameModel.getState().timeLeft;
  }
  _handleAnswer(condition) {
    this.stopTimer();
    if (condition) {
      this.gameModel.minusLife();
    }
    const answerTime = Math.abs(this.gameModel.getState().timeLeft - this.answerStartTime);
    this.gameModel.answers.push(+!condition, answerTime);
    if (this._checkGameCondition() && (this.gameModel.getState().level < this.gameModel.getQuestions().length - 1)) {
      this.gameModel.nextLevel();
      this._createGameView();
      this.gameStatisticsView.updateView(this.gameModel.getState());
    } else {
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  _checkGameCondition() {
    return this.gameModel.getState().lives.length <= 3;
  }
  _checkTimeLeft() {
    return this.gameModel.getState().timeLeft <= 0;
  }
  _tick() {
    this.timer = setTimeout(() => {
      const timeLeft = this.gameModel.getState().timeLeft;
      this.gameModel.minusSec();
      this.gameStatisticsView.updateView(this.gameModel.getState());
      if (timeLeft < LOW_TIME_EDGE) {
        this.gameStatisticsView.createlowTimeEffect();
      }
      this._tick();
    }, ONE_SECOND);
    if (this._checkTimeLeft()) {
      this.stopTimer();
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  _startTimer() {
    this.gameStatisticsView.updateView(this.gameModel.getState());
    this._tick();
  }
  stopTimer() {
    clearTimeout(this.timer);
  }
}
