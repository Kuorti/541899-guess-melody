import AbstractView from './AbstractView';
import {next} from './main';
import {gameData} from "./data/game-data";
import utils from "./data/utils";
export default class GameSuccess extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы настоящий меломан!</h2>
          <p class="result__total">За N минут и N секунд вы набрали ${utils.countGamePoints(gameData.answers, gameData.initialState.lives)} баллов (${gameData.answers.filter((item, index) => item > 0 && item <= 30 && index % 2 !== 0).length} быстрых), совершив ${3 - gameData.initialState.lives} ошибки</p>
          <p class="result__text">Вы заняли N место из N. Это лучше чем у N% игроков</p>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
  }
  onAnswer() {
  }

  bind() {
    const submitButton = this.element().querySelector(`.result__replay`);
    submitButton.addEventListener(`click`, () => {
      utils.resetGame();
      next();
      this.onAnswer();
    });
  }
}
