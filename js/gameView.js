// import {gameData} from "./data/game-data";
import timer from "./timer";
import utils from './data/utils';
import {gameData} from "./data/game-data";

const bind = (rootElem, {next}) => {
  if (rootElem.firstChild.nextSibling && rootElem.firstChild.nextSibling.classList.contains(`welcome`)) {
    const startButton = rootElem.querySelector(`.welcome__button`);
    startButton.addEventListener(`click`, () => {
      next();
    });
  } else if (rootElem.firstChild.nextSibling.classList.contains(`game--genre`)) {
    console.log(`game--genre`);
    const submitButton = rootElem.querySelector(`.game__submit`);
    submitButton.addEventListener(`click`, () => {
      next();
    });
  } else if (rootElem.firstChild.nextSibling.classList.contains(`game--artist`)) {
    const submitButtons = rootElem.querySelectorAll(`.artist`);
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, (event) => {
        gameData.answers.push({timeForAnswer: 30, isRight: true});
        utils.countGamePoints();
        next();
      });
    });
  } else {
    const submitButton = rootElem.querySelector(`.result__replay`);
    submitButton.addEventListener(`click`, () => {
      next();
    });
  }
};

const gameScreenGenre = (question) => `<section class="game game--genre">
    <section class="game__screen">
      <h2 class="game__title">${question.questionText}</h2>
      <form class="game__tracks">
        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-1">
            <label class="game__check" for="answer-1">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-2">
            <label class="game__check" for="answer-2">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--pause" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-3">
            <label class="game__check" for="answer-3">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-4">
            <label class="game__check" for="answer-4">Отметить</label>
          </div>
        </div>
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
    </section>`;

const gameScreenArtist = (question) => `    <section class="game__screen">
      <h2 class="game__title">${question.questionText}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>
      <form class="game__artist">
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1">
          <label class="artist__name" for="answer-1">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Пелагея
          </label>
        </div>
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-2" id="answer-2">
          <label class="artist__name" for="answer-2">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-3" id="answer-3">
          <label class="artist__name" for="answer-3">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Lorde
          </label>
        </div>
      </form>
    </section>`;

const genreHeader = `<section class="game game--genre">`;
const artistHeader = `<section class="game game--artist">`;

const typeMap = {
  genre: [gameScreenGenre, genreHeader],
  artist: [gameScreenArtist, artistHeader]
};

const render = (data, question) => {
  if (data.screenType === 0) {
    return `
      <section class="welcome">
        <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <button class="welcome__button">
          <span class="visually-hidden">Начать игру</span>
        </button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За 5 минут нужно ответить на все вопросы.</li>
          <li>Можно допустить 3 ошибки.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>`;
  } else if (data.screenType === 1) {
    return `
    ${typeMap[question.type][1]}
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
              ${timer.render(data.timeLeft)}
    </header>
        ${typeMap[question.type][0](question)}
      <div class="game__mistakes">
        ${data.mistakes
        .filter((item) => item !== 0)
        .map(() => `<div class="wrong"></div>`)
        .reduce((acc, current) => acc + current, ``)} 
      </div>
  </section>`;
  } else {
    return `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За 3 минуты и 25 секунд вы набрали ${utils.countGamePoints([100, 10], 2)} баллов (8 быстрых), совершив 3 ошибки</p>
    <p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>`;
  }
};

export default {render, bind};
