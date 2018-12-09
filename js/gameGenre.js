import AbstractView from './AbstractView';
import {next} from './main';
import {gameData} from "./data/game-data";
import utils from "./data/utils";
import GameStatisticsView from "./gameStatisticsView";
export default class GenreScreen extends AbstractView {
  constructor(question, questionNumber) {
    super();
    this.question = question;
    this.questionNumber = questionNumber;
  }

  get template() {
    const statisticsElement = new GameStatisticsView(`genre`);
    return `
    ${statisticsElement.template}
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
  }
  bind() {
    const submitButton = this.element().querySelector(`.game__submit`);
    const gameAnswers = this.element().querySelectorAll(`.game__answer`);
    const gameBack = this.element().querySelector(`.game__back`);
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
    gameBack.addEventListener(`click`, () => {
      utils.resetGame();
      next();
    });
    submitButton.addEventListener(`click`, (el) => {
      let answers = [];
      gameAnswers.forEach((innerEl) => {
        answers.push(innerEl.firstChild.nextSibling.checked);
      });
      let condition = (JSON.stringify(answers) !== JSON.stringify(gameData.questions[this.questionNumber].rightAnswers));
      utils.changeLivesPushAnswer(el, this.question, condition);
      utils.checkLives();
      utils.countGamePoints(gameData.answers, gameData.initialState.lives);
      next();
      this.onAnswer();
    });
  }
}
