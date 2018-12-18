import AbstractView from './AbstractView';
import throwDomEl from "./domEmitter";
export default class GameArtist extends AbstractView {
  constructor(question, allQuestions, gameState, _this, handler) {
    super();
    this._this = _this;
    this.handler = handler;
    this.gameState = gameState;
    this.question = question;
    this.allQuestions = allQuestions;
    this.questionNumber = this.gameState.level;
  }
  init() {
    this.render();
    this.bind();
  }
  render() {
    return throwDomEl(this.template);
  }
  get template() {
    return `
    <section class="game__screen">
      <h2 class="game__title">${this.question.questionText}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>
      <form class="game__artist">
              ${this.question.artists
      .map((currentValue, index) => `
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
          <label class="artist__name" for="answer-${index}">
            <img class="artist__picture" src="${currentValue.image}" alt="${currentValue.artist}">
            ${currentValue.artist}
          </label>
        </div>
    `)
      .reduce((acc, current) => acc + current, ``)} 
    </section>`;
  }
  onAnswer(question, condition) {
    this.handler(question, condition, this._this);
  }

  bind() {
    const submitButtons = document.querySelectorAll(`.artist input`);
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let condition = el.id !== this.allQuestions[this.questionNumber].rightAnswers[0];
        let answerTime = 30;
        this.onAnswer(answerTime, condition);
      });
    });
  }
}
