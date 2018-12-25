import AbstractView from './abstract-view';
export default class GameFail extends AbstractView {
  constructor(screenTypeNumber, handler) {
    super();
    this.handler = handler;
    this.failText = screenTypeNumber[1];
  }
  init() {
    this._render();
    this._bind();
  }
  get template() {
    return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">${this.failText}</h2>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
  }
  _onAnswer() {
    this.handler();
  }
  _bind() {
    const submitButton = document.querySelector(`.result__replay`);
    submitButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._onAnswer();
    });
  }
}
