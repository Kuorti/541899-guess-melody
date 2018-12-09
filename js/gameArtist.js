import AbstractView from './AbstractView';
import {next} from './main';
import {gameData} from "./data/game-data";
import utils from "./data/utils";
import GameStatisticsView from "./gameStatisticsView";
export default class GameArtist extends AbstractView {
  constructor(question, questionNumber) {
    super();
    this.question = question;
    this.questionNumber = questionNumber;
  }
  get template() {
    const gameStatistics = new GameStatisticsView(`artist`);
    return `
    ${gameStatistics.template}
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
  onAnswer() {
  }

  bind() {
    const submitButtons = this.element().querySelectorAll(`.artist`);
    const gameBack = this.element().querySelector(`.game__back`);
    gameBack.addEventListener(`click`, () => {
      utils.resetGame();
      next();
    });
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let condition = el.firstChild.nextSibling.id !== gameData.questions[this.questionNumber].rightAnswers[0];
        utils.changeLivesPushAnswer(el, this.question, condition);
        utils.checkLives();
        utils.countGamePoints(gameData.answers, gameData.initialState.lives);
        next();
        this.onAnswer();
      });
    });
  }
}
