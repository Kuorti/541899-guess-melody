import throwDomEl from './domEmitter';
import {showTemplate} from "./showTempByNumber";
import {addEvListener as addEvListenerGameArtist} from "./gameArtist";
import {addEvListenerWelcome} from "./welcomeScreen";
export const gameGenre = throwDomEl(`
  <section class="game game--genre">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"
                style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">05</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">00</span>
      </div>

      <div class="game__mistakes">
        <div class="wrong"></div>
        <div class="wrong"></div>
        <div class="wrong"></div>
      </div>
    </header>

    <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
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
  </section>`);

export const setChoiceCheckListener = () => {
  const submitButton = document.querySelector(`.game__submit`);
  const gameCheckElementsList = document.querySelectorAll(`.game__check`);
  submitButton.setAttribute(`disabled`, ``);

  for (let i = 0; i < gameCheckElementsList.length; i++) {
    gameCheckElementsList[i].addEventListener(`click`, function (event) {
      if (event.target.classList.contains(`mySelected`)) {
        event.target.classList.remove(`mySelected`);
      } else {
        event.target.classList.add(`mySelected`);
      }

      if (document.querySelector(`.mySelected`) !== null) {
        submitButton.removeAttribute(`disabled`);
      } else {
        submitButton.setAttribute(`disabled`, ``);
      }
    });
  }
};

export const addEvListenerGameGenre = () => {
  document.querySelector(`.game__submit`).addEventListener(`click`, function () {
    if (document.querySelector(`.mySelected`) !== null) {
      showTemplate(2);
      addEvListenerGameArtist();
    }
  });
  document.querySelector(`.game__logo`).addEventListener(`click`, function () {
    showTemplate(0);
    addEvListenerWelcome();
  });
};
