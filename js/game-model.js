export default class GameModel {
  constructor(serverData) {
    this.questions = serverData;
    this.answers = [
    ];
    this.resultData = {
      resultText: [`success`, `fail`]
    };
    this.state = {
      level: 0,
      lives: [1, 1, 1],
      timeLeft: 300,
      cheatMode: 1
    };
  }
  nextLevel() {
    this.state.level = this.state.level + 1;
  }
  minusLife() {
    this.state.lives.pop();
  }
  minusSec() {
    this.state.timeLeft = this.state.timeLeft - 1;
  }
  getState() {
    return this.state;
  }
  getAnswers() {
    return this.answers;
  }
  getQuestions() {
    return this.questions;
  }
}
