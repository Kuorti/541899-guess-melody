import AbstractView from './AbstractView';
export default class GameFail extends AbstractView {
  constructor(screenTypeNumber, handler) {
    super();
    this.handler = handler;
    this.failText = screenTypeNumber[1];
  }
  init() {
    this.render();
    this.bind();
  }
  get template() {
    return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">${this.failText}</h2>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
  }
  onAnswer() {
    this.handler();
  }
  bind() {
    const submitButton = document.querySelector(`.result__replay`);
    submitButton.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}
