import throwDomEl from './domEmitter';
import AbstractView from "./AbstractView";

export default class ResultSuccessView extends AbstractView {
  constructor(screenTypeNumber, handler, stats, finalPoints, answers) {
    super();
    this.screenTypeNumber = screenTypeNumber;
    this.stats = stats;
    this.finalPoints = finalPoints;
    this.answers = answers;
    this.handler = handler;
  }
  init() {
    this.render();
    this.bind();
  }
  render() {
    return throwDomEl(this.template);
  }
  get template() {
    return `<section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы настоящий меломан!</h2>
          <p class="result__total">За ${Math.floor((300 - this.stats.timeLeft) / 60)} минут 
            и ${(300 - this.stats.timeLeft) % 60} секунд вы набрали ${this.finalPoints} 
            баллов (${this.answers.filter((item, index) => item > 0 && item <= 30 && index % 2 !== 0).length} быстрых), 
            совершив ${3 - this.stats.lives.length} ошибки
          </p>
          <p class="result__text">${this.screenTypeNumber[1]}</p>
          <button class="result__replay" type="button">Сыграть ещё раз</button></section>`;
  }
  onAnswer() {
    this.handler();
  }
  bind() {
    const gameBack = document.querySelector(`.result__replay`);
    gameBack.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}


