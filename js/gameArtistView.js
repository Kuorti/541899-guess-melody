import AbstractView from './AbstractView';
// import {gameData} from "./data/game-data";
// import utils from "./data/utils";
import throwDomEl from "./domEmitter";
import GameController from './gameController';
// import GameScreen from "./gameView";
// import GameStatisticsView from "./gameStatisticsView";
export default class GameArtist extends AbstractView {
  constructor(question, allQuestions, gameModelState) {
    super();
    this.question = question;
    this.allQuestions = allQuestions;
    this.questionNumber = gameModelState.level;
    this.gameController = new GameController();
  }
  init() {
    this.render();
    this.bind();
  }
  render() {
    // return throwDomEl(this.template);
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
    this.gameController.handleAnswer(question, condition);
  }

  bind() {
    const submitButtons = document.querySelectorAll(`.artist`);
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let condition = el.firstChild.nextSibling.id !== this.allQuestions[this.questionNumber].rightAnswers[0];
        let answerTime = 30;
        // utils.changeLivesPushAnswer(el, this.question, condition);
        // utils.checkLives();
        // utils.countGamePoints(gameData.answers, gameData.initialState.lives);
        this.onAnswer(answerTime, condition);
      });
    });
  }
}
