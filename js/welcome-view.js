import AbstractView from './abstract-view';
import {gameData} from "./data/game-data";
import throwDomEl from "./dom-emitter";
import WelcomeController from "./welcome-controller";

export default class WelcomeScreen extends AbstractView {
  constructor() {
    super();
  }
  init() {
    this._render();
    this._bind();
  }
  get template() {
    return `
      <section class="welcome">
        <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <button class="welcome__button">
          <span class="visually-hidden">Начать игру</span>
        </button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За 5 минут нужно ответить на все вопросы.</li>
          <li>Можно допустить 3 ошибки.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>`;
  }
  _render() {
    throwDomEl(this.template);
  }
  _onAnswer() {
    let welcomeController = new WelcomeController();
    welcomeController.handleAnswer();
    gameData.initialState.screenType = 1;
  }
  _bind() {
    document.querySelector(`.welcome__button`).addEventListener(`click`, () => {
      this._onAnswer();
    });
  }
}

