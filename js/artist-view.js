import AbstractView from './abstract-view';
import throwDomEl from "./dom-emitter";
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
        <button class="track__button track__button--pause" type="button"></button>
        <audio autoplay src="${this.question.src}"></audio>
      </div>
      <form class="game__artist">
              ${this.question.answers
      .map((currentValue, index) => `
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
          <label class="artist__name ${this.gameState.cheatMode ? `cheat_mode_` : ``}${this.question.answers[index].isCorrect ? `right` : ``}" for="answer-${index}">
            <img class="artist__picture" src="${currentValue.image.url}" alt="${currentValue.title}">
            ${currentValue.title}
          </label>
        </div>
    `).reduce((acc, current) => acc + current, ``)} 
    </section>`;
  }
  onAnswer(condition) {
    this.handler(condition);
  }

  bind() {
    const submitButtons = document.querySelectorAll(`.artist input`);
    const audioButton = document.querySelector(`.track__button`);
    const audioElement = document.querySelector(`.game__track audio`);

    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let answersState = this.allQuestions[this.questionNumber].answers.map((element) => {
          return element.isCorrect;
        });
        let condition = answersState[el.id.substr(el.id.length - 1)];
        this.onAnswer(!condition);
      });
    });
    audioButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (audioButton.classList.contains(`track__button--pause`)) {
        audioButton.classList.add(`track__button--play`);
        audioButton.classList.remove(`track__button--pause`);
        audioElement.pause();
      } else {
        audioButton.classList.add(`track__button--pause`);
        audioButton.classList.remove(`track__button--play`);
        audioElement.play();
      }
    });
  }
}
