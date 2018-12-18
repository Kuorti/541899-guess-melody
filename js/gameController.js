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
    const handler = this.handleAnswer;
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState(), this, handler);
    gameTemplate.init();
  }
  handleAnswer(answerTime, condition, _this) {
    _this.stopTimer();
    if (condition) {
      _this.gameModel.minusLife();
    }
    _this.gameModel.answers.push(!condition, answerTime);
    if (_this.checkGameCondition() && (_this.gameModel.getState().level < _this.gameModel.getQuestions().length - 1)) {
      _this.gameModel.nextLevel();
      _this.gameStatisticsView.updateView(_this.gameModel.getState());
      _this.createGameView();
    } else {
      Application.showStats(_this.gameModel.getState(), _this.gameModel.getAnswers());
    }
  }
  checkGameCondition() {
    return this.gameModel.getState().lives.length > 0;
  }
  tick() {
    this.gameModel.minusSec();
    this.gameStatisticsView.updateView(this.gameModel.getState());
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
}
