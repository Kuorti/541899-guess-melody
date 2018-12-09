import {gameData} from "./data/game-data";
import AbstractView from './AbstractView';
import GameTimer from "./timer";
export default class GameStatisticsView extends AbstractView {
  constructor(headerType) {
    super();
    this.headerType = headerType;
  }

  get template() {
    let gameTimer = new GameTimer();
    return `<section class="game game--${this.headerType}">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
              ${gameTimer.template}
      <div class="game__mistakes">
        ${gameData.initialState.lives
      .filter((item) => item !== 0)
      .map(() => `<div class="wrong"></div>`)
      .reduce((acc, current) => acc + current, ``)} 
      </div></header>`;
  }
}
