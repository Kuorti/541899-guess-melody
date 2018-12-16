import AbstractView from './AbstractView';
// import {next} from './main';
// import {gameData} from "./data/game-data";
import utils from "./data/utils";
export default class GameFail extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы не настоящий меломан, увы!</h2>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
  }
  onAnswer() {
  }

  bind() {
    const submitButton = this.element().querySelector(`.result__replay`);
    submitButton.addEventListener(`click`, () => {
      utils.resetGame();
      // next();
      this.onAnswer();
    });
  }
}
