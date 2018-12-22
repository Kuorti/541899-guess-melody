import GameModel from "./gameModel";
import GameGenre from "./gameGenreView";
import GameArtist from "./gameArtistView";
import GameStatistics from "./gameStatisticsView";
import Application from "./router";
const ONE_SECOND = 1000;
const LOW_TIME_EDGE = 30;

export default class GameScreen {
  constructor(serverData) {
    this.serverData = serverData;
    this.gameModel = new GameModel(this.serverData);
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
    const audioHandler = (event) => this.handleAudioClick(event);
    const gameTemplate = new ViewClass(question, this.gameModel.getQuestions(), this.gameModel.getState(), handler, audioHandler);
    gameTemplate.init();
  }
  handleAudioClick(event) {
    console.log(event);
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
    } else if (this.checkGameCondition() && (this.gameModel.getState().level >= this.gameModel.getQuestions().length - 1)) {
      this.saveSuccessResult();
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    } else {
      Application.showStats(this.gameModel.getState(), this.gameModel.getAnswers());
    }
  }
  saveSuccessResult() {
    console.log(`push success statistics`);
  }
  checkGameCondition() {
    return this.gameModel.getState().lives.length > 0;
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
  onArtistControlClick(evt) {
    const audio = evt.target.parentNode.querySelector(`audio`);
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
      evt.target.classList.remove(`player-control--pause`);
      evt.target.classList.add(`player-control--play`);
    } else if (evt.target.classList.contains(`player-control--play`)) {
      audio.play();
      evt.target.classList.remove(`player-control--play`);
      evt.target.classList.add(`player-control--pause`);
    }
  }
  onControlClick(evt) {
    const audio = evt.target.parentNode.querySelector(`audio`);
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
      evt.target.classList.remove(`player-control--pause`);
      evt.target.classList.add(`player-control--play`);
    } else if (evt.target.classList.contains(`player-control--play`)) {
      Array.from(this.view.level.tracks, (it) => {
        it.pause();
      });
      Array.from(this.view.level.controls, (it) => {
        it.classList.remove(`player-control--pause`);
        it.classList.add(`player-control--play`);
      });
      audio.play();
      evt.target.classList.remove(`player-control--play`);
      evt.target.classList.add(`player-control--pause`);
    }
  }
}
