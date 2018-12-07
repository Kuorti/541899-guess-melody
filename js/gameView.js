import timer from "./timer";
import utils from './data/utils';
import {gameData} from "./data/game-data";
import {gameScreenGenre} from './gameGenre';
import {gameScreenArtist} from './gameArtist';

const checkClicked = (gameAnswers) => {
  return [...gameAnswers].map((innerEl) => {
    return innerEl.firstChild.nextSibling.checked;
  }).filter((el) => el === true).length;
};
const changeLivesPushAnswer = (el, currentQuestion, condition) => {
  if (condition) {
    gameData.initialState.lives--;
    gameData.answers.push(0, 30);
  } else {
    gameData.answers.push(1, 30);
  }
};
const checkLives = () => {
  if (gameData.initialState.lives <= 0) {
    gameData.initialState.screenType = 2;
  }
};
const bind = (rootElem, {next}, currentQuestion) => {
  if (rootElem.firstChild.nextSibling && rootElem.firstChild.nextSibling.classList.contains(`welcome`)) {
    gameData.initialState.lives = 3;
    gameData.answers = [];
    const startButton = rootElem.querySelector(`.welcome__button`);
    startButton.addEventListener(`click`, () => {
      next();
    });
  } else if (rootElem.firstChild.nextSibling.classList.contains(`game--genre`)) {
    const submitButton = rootElem.querySelector(`.game__submit`);
    const gameAnswers = rootElem.querySelectorAll(`.game__answer`);
    submitButton.setAttribute(`disabled`, ``);
    gameAnswers.forEach((el) => {
      el.addEventListener(`click`, () => {
        if (checkClicked(gameAnswers) === 0) {
          submitButton.setAttribute(`disabled`, ``);
        } else {
          submitButton.removeAttribute(`disabled`);
        }
      });
    });
    submitButton.addEventListener(`click`, (el) => {
      let answers = [];
      gameAnswers.forEach((innerEl) => {
        answers.push(innerEl.firstChild.nextSibling.checked);
      });
      let condition = (JSON.stringify(answers) !== JSON.stringify(gameData.questions[currentQuestion].rightAnswers));
      changeLivesPushAnswer(el, currentQuestion, condition);
      checkLives();
      utils.countGamePoints(gameData.answers, gameData.initialState.lives);
      next();
    });
  } else if (rootElem.firstChild.nextSibling.classList.contains(`game--artist`)) {
    const submitButtons = rootElem.querySelectorAll(`.artist`);
    submitButtons.forEach((el) => {
      el.addEventListener(`click`, () => {
        let condition = el.firstChild.nextSibling.id !== gameData.questions[currentQuestion].rightAnswers[0];
        changeLivesPushAnswer(el, currentQuestion, condition);
        checkLives();
        utils.countGamePoints(gameData.answers, gameData.initialState.lives);
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
    if (utils.countGamePoints(gameData.answers, gameData.initialState.lives) !== -1) {
      return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы настоящий меломан!</h2>
          <p class="result__total">За N минут и N секунд вы набрали ${utils.countGamePoints(gameData.answers, gameData.initialState.lives)} баллов (${gameData.answers.filter((item, index) => item > 0 && item <= 30 && index % 2 !== 0).length} быстрых), совершив ${3 - gameData.initialState.lives} ошибки</p>
          <p class="result__text">Вы заняли N место из N. Это лучше чем у N% игроков</p>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
    } else {
      return `
        <section class="result">
          <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы не настоящий меломан, увы!</h2>
          <button class="result__replay" type="button">Сыграть ещё раз</button>
        </section>`;
    }
  }
};

export default {render, bind};
