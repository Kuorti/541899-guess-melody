// import {gameData} from "./data/game-data";
import AbstractView from './AbstractView';
import GameTimer from "./timer";
import utils from "./data/utils";
import throwDomEl from "./domEmitter";
// import {next} from "./main";
export default class GameStatisticsView extends AbstractView {
  constructor(headerType, gameData) {
    super();
    this.headerType = headerType;
    this.gameData = gameData;
    console.log(this.gameData);
  }
  render() {
    return throwDomEl(this.template, true);
  }
  updateView() {
    return throwDomEl(this.template, true, true);
  }
  get template() {
    return `<section class="game game--${this.headerType}">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
              <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"
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
  bind() {
    const gameBack = this.render().querySelector(`.game__back`);
    gameBack.addEventListener(`click`, () => {
      utils.resetGame();
      // next();
    });
  }
}
