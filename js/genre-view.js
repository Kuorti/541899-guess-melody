import AbstractView from './abstract-view';
import utils from "./data/utils";
import throwDomEl from "./dom-emitter";
export default class GenreScreen extends AbstractView {
  constructor(question, allQuestions, gameState, handler) {
    super();
    this.handler = handler;
    this.gameState = gameState;
    this.question = question;
    this.allQuestions = allQuestions;
    this.questionNumber = this.gameState.level;
    this.answers = [];
  }
  init() {
    this._render();
    this._bind();
  }
  _render() {
    throwDomEl(this.template);
  }
  get template() {
    return `
        <section class="game__screen">
          <h2 class="game__title">${this.question.question}</h2>
          <form class="game__tracks">
            ${this.question.answers
          .map((currentValue, index) => `<div class="track">
              <button class="track__button track__button--${index === 0 ? `pause` : `play`}" type="button"></button>
              <div class="track__status ${this.gameState.cheatMode ? `cheat_mode_` : ``}${this.question.genre === this.question.answers[index].genre ? `right` : ``}">
                  <audio class="${index === 0 ? `already-played` : ``}" ${index === 0 ? `autoplay` : ``} src="${currentValue.src}"></audio>
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
  _onAnswer(condition) {
    this.handler(condition);
  }
  _prepareRightAnswers() {
    const answersOptions = [];
    this.allQuestions[this.questionNumber].answers.forEach((el) => answersOptions.push(el.genre));
    return answersOptions;
  }
  _resetPlayingClasses() {
    document.querySelectorAll(`.track button`).forEach((elem) => {
      if (elem.classList.contains(`track__button--pause`)) {
        elem.classList.remove(`track__button--pause`);
      }
      if (!elem.classList.contains(`track__button--play`)) {
        elem.classList.add(`track__button--play`);
      }
    });
  }
  _stopAllAudio() {
    document.querySelectorAll(`.track__status audio`).forEach((el) => {
      if (el.classList.contains(`already-played`)) {
        el.classList.remove(`already-played`);
      }
      el.pause();
    });
  }
  _bind() {
    const submitButton = document.querySelector(`.game__submit`);
    const gameAnswers = document.querySelectorAll(`.game__answer`);
    const audioButtons = document.querySelectorAll(`.track__button`);
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
    submitButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      gameAnswers.forEach((innerEl) => {
        this.answers.push(innerEl.firstChild.nextSibling.checked);
      });
      const rightAnswers = this._prepareRightAnswers().map((el) => {
        return el === this.allQuestions[this.questionNumber].genre;
      });
      const condition = (JSON.stringify(this.answers) !== JSON.stringify(rightAnswers));
      this._onAnswer(condition);
    });
    audioButtons.forEach((el) => {
      el.addEventListener(`click`, (event) => {
        event.preventDefault();
        event.stopPropagation();
        const audioElement = event.target.nextElementSibling.firstChild.nextSibling;
        if (!audioElement.classList.contains(`already-played`)) {
          this._resetPlayingClasses();
          this._stopAllAudio();
          audioElement.classList.add(`already-played`);
          el.classList.add(`track__button--pause`);
          audioElement.play();
        } else {
          el.classList.add(`track__button--play`);
          el.classList.remove(`track__button--pause`);
          audioElement.classList.remove(`already-played`);
          audioElement.pause();
        }
      });
    });
  }
}
