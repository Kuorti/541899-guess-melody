import AbstractView from './AbstractView';
import utils from "./data/utils";
import throwDomEl from "./domEmitter";
export default class GenreScreen extends AbstractView {
  constructor(question, allQuestions, gameState, handler, audioHandler) {
    super();
    this.handler = handler;
    this.audioHandler = audioHandler;
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
          <h2 class="game__title">${this.question.question}</h2>
          <form class="game__tracks">
            ${this.question.answers
          .map((currentValue, index) => `<div class="track">
              <button class="track__button track__button--play" type="button"></button>
              <div class="track__status">
                  <audio src="${currentValue.src}"></audio>
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
    this.handler(question, condition);
  }
  onAudioClick(event) {
    this.audioHandler(event);
  }
  prepareRightAnswers() {
    let answersOptions = [];
    this.allQuestions[this.questionNumber].answers.forEach((el) => answersOptions.push(el.genre));
    return answersOptions;
  }
  bind() {
    const submitButton = document.querySelector(`.game__submit`);
    const gameAnswers = document.querySelectorAll(`.game__answer`);
    const audioButtons = document.querySelectorAll(`.track__button--play`);
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
      const rightAnswers = this.prepareRightAnswers().map((el) => {
        return el === this.allQuestions[this.questionNumber].genre;
      });
      let condition = (JSON.stringify(this.answers) !== JSON.stringify(rightAnswers));
      let answerTime = 30;
      this.onAnswer(answerTime, condition);
    });
    audioButtons.forEach((el) => {
      el.addEventListener(`click`, (event) => {
        let audioElement = event.target.nextElementSibling.firstChild.nextSibling;
        if (!audioElement.classList.contains(`already-played`)) {
          el.classList.remove(`track__button--play`);
          el.classList.add(`track__button--pause`);
          audioElement.classList.add(`already-played`);
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
