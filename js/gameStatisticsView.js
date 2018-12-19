import AbstractView from './AbstractView';
import throwDomEl from "./domEmitter";
import Application from "./router";
export default class GameStatisticsView extends AbstractView {
  constructor(headerType, gameData) {
    super();
    this.headerType = headerType;
    this.gameData = gameData;
  }
  updateView(gameData) {
    this.gameData = gameData;
    this.init();
  }
  init() {
    this.render();
    this.bind();
  }
  render() {
    return throwDomEl(this.template, true);
  }
  get template() {
    const TIMER_RADIUS = 370;
    const GAME_START_TIME = 300;
    const fullLength = 2 * Math.PI * TIMER_RADIUS;
    return `<section class="game game--${this.headerType}">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
              <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle stroke-dashoffset="${fullLength / GAME_START_TIME * (GAME_START_TIME - this.gameData.timeLeft)}" stroke-dasharray="${fullLength}" class="timer__line" cx="390" cy="390" r="370"
                style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${Math.floor(this.gameData.timeLeft / 60)}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${this.gameData.timeLeft % 60}</span>
      </div>
      <div class="game__mistakes">
        ${this.gameData.lives
      .filter((item) => item !== 0)
      .map(() => `<div class="wrong"></div>`)
      .reduce((acc, current) => acc + current, ``)} 
      </div></header>`;
  }
  createlowTimeEffect() {
    const timer = document.querySelector(`.timer__value`);
    if (!timer.classList.contains(`timer__value--finished`)) {
      timer.classList.add(`timer__value--finished`);
    }
  }
  bind() {
    const gameBack = document.querySelector(`.game__back`);
    gameBack.addEventListener(`click`, () => {
      Application.showWelcome();
    });
  }
}
