import Application from "./router";
import SuccessView from "./resultSuccessView";
import FailView from "./gameFailView";

const MAX_ANSWERS_ARRAY_LENGTH = 20;
const SLOW_AND_FAST_ANSWERS_EDGE = 30;
const OUT_OF_TIME_MESSAGE = `Время вышло! Вы не успели отгадать все мелодии`;
const OUT_OF_TRIES_MESSAGE = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

export default class WelcomeScreen {
  constructor(stats, answers) {
    this.stats = stats;
    this.answers = answers;
  }
  init() {
    this.createView();
  }
  handleAnswer() {
    Application.showWelcome();
  }
  createView() {
    const finalPoints = this.countGamePoints(this.stats.lives);
    const screenTypeNumber = this.showResults([11, 0, 3], finalPoints);
    const handler = this.handleAnswer;
    let ViewClass = screenTypeNumber[0] === 0 || screenTypeNumber[0] === 1 ? FailView : SuccessView;
    const resultTemplate = new ViewClass(screenTypeNumber, handler, this.stats, finalPoints, this.answers);
    resultTemplate.init();
  }
  countGamePoints(triesLeft) {
    let sum = null;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers.length < MAX_ANSWERS_ARRAY_LENGTH || triesLeft === 0) {
        sum = -1;
      } else if (i % 2 === 0 && this.answers[i] !== 0 && this.answers[i + 1] <= SLOW_AND_FAST_ANSWERS_EDGE) {
        sum += this.answers[i] * 2;
      } else if (i % 2 === 0 && this.answers[i] !== 0 && this.answers[i + 1] > SLOW_AND_FAST_ANSWERS_EDGE) {
        sum += this.answers[i];
      } else if (i % 2 === 0 && this.answers[i] === 0) {
        sum -= 2;
      }
    }

    return sum;
  }
  compareNum(a, b) {
    return a - b;
  }
  showResults(otherPlayersPoints, resultStatistics) {
    if (this.stats.timeLeft <= 0) {
      return [0, OUT_OF_TIME_MESSAGE];
    } else if (this.stats.lives.length <= 0) {
      return [1, OUT_OF_TRIES_MESSAGE];
    } else {
      let newPlayersPoints = otherPlayersPoints.slice();
      newPlayersPoints.push(resultStatistics);
      newPlayersPoints.sort(this.compareNum).reverse();
      const playerPointsPosition = newPlayersPoints.indexOf(resultStatistics) + 1;
      const playersQuantity = newPlayersPoints.length;
      let statisticsPosition = (playersQuantity - playerPointsPosition) / playersQuantity * 100;
      const successMessage = `Вы заняли ${playerPointsPosition} место из ${playersQuantity} игроков. Это лучше, чем у ${statisticsPosition}% игроков`;
      return [2, successMessage];
    }
  }
  handleAnswer() {
    Application.showWelcome();
  }
}

