import AbstractView from './AbstractView';
// import {next} from './main';
import {gameData} from "./data/game-data";
import utils from "./data/utils";
import throwDomEl from "./domEmitter";
import GameController from "./gameController";
export default class GenreScreen extends AbstractView {
  constructor(question, allQuestions, gameModelState) {
    super();
    this.question = question;
    this.allQuestions = allQuestions;
    this.questionNumber = gameModelState.level;
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
    <section class="game game--genre">
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
  onAnswer() {
    let asdsa = new GameController();
    asdsa.handleAnswer(this.question, this.answers);
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
    submitButton.addEventListener(`click`, (el) => {
      gameAnswers.forEach((innerEl) => {
        this.answers.push(innerEl.firstChild.nextSibling.checked);
      });
      let condition = (JSON.stringify(this.answers) !== JSON.stringify(this.allQuestions[this.questionNumber].rightAnswers));
      // utils.changeLivesPushAnswer(el, this.question, condition);
      // utils.checkLives();
      // utils.countGamePoints(gameData.answers, gameData.initialState.lives);
      // next();
      this.onAnswer();
    });
  }
}
