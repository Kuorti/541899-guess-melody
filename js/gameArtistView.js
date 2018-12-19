import AbstractView from './AbstractView';
import throwDomEl from "./domEmitter";
export default class GameArtist extends AbstractView {
  constructor(question, allQuestions, gameState, handler) {
    super();
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
      <h2 class="game__title">${this.question.question}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>
      <form class="game__artist">
              ${this.question.answers
      .map((currentValue, index) => `
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
          <label class="artist__name" for="answer-${index}">
            <img class="artist__picture" src="${currentValue.image.url}" alt="${currentValue.title}">
            ${currentValue.title}
          </label>
        </div>
    `)
      .reduce((acc, current) => acc + current, ``)} 
    </section>`;
  }
  onAnswer(question, condition) {
    this.handler(question, condition);
  }

  bind() {
    const submitButtons = document.querySelectorAll(`.artist input`);
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let answersState = this.allQuestions[this.questionNumber].answers.map((el) => {
          return el.isCorrect;
        });
        let condition = answersState[el.id.substr(el.id.length - 1)];
        let answerTime = 30;
        this.onAnswer(answerTime, condition);
      });
    });
  }
}
