import AbstractView from './AbstractView';
import utils from "./data/utils";
import throwDomEl from "./domEmitter";
export default class GenreScreen extends AbstractView {
  constructor(question, allQuestions, gameState, _this, handler) {
    super();
    this._this = _this;
    this.handler = handler;
    this.gameState = gameState;
    this.question = question;
    this.allQuestions = allQuestions;
    this.questionNumber = this.gameState.level;
    this.answers = [];
  }
  init() {
    this.render();
    this.bind();
  }
  render() {
    throwDomEl(this.template);
  }
  get template() {
    return `
        <section class="game__screen">
          <h2 class="game__title">${this.question.questionText}</h2>
          <form class="game__tracks">
            ${this.question.artists
          .map((currentValue, index) => `<div class="track">
              <button class="track__button track__button--play" type="button"></button>
              <div class="track__status">
                <audio></audio>
              </div>
              <div class="game__answer">
                <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${index}" id="answer-${index}">
                <label class="game__check" for="answer-${index}">Отметить</label>
              </div>
            </div>`)}
            <button class="game__submit button" type="submit">Ответить</button>
          </form>
     </section>`;
  }
  onAnswer(question, condition) {
    this.handler(question, condition, this._this);
  }
  bind() {
    const submitButton = document.querySelector(`.game__submit`);
    const gameAnswers = document.querySelectorAll(`.game__answer`);
    submitButton.setAttribute(`disabled`, ``);
    gameAnswers.forEach((el) => {
      el.addEventListener(`click`, () => {
        if (utils.checkClicked(gameAnswers) === 0) {
          submitButton.setAttribute(`disabled`, ``);
        } else {
          submitButton.removeAttribute(`disabled`);
        }
      });
    });
    submitButton.addEventListener(`click`, () => {
      gameAnswers.forEach((innerEl) => {
        this.answers.push(innerEl.firstChild.nextSibling.checked);
      });
      let condition = (JSON.stringify(this.answers) !== JSON.stringify(this.allQuestions[this.questionNumber].rightAnswers));
      let answerTime = 30;
      this.onAnswer(answerTime, condition);
    });
  }
}
