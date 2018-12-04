import throwDomEl from './domEmitter';
import {showTemplate} from "./showTempByNumber";
import {addEvListenerSuccess} from "./resultSuccess";
import {addEvListenerFail} from "./failTries";
import {addEvListenerWelcome} from "./welcomeScreen";

export const gameArtist = throwDomEl(`
  <section class="game game--artist">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
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

  </section>`);

export const addEvListener = () => {
  document.querySelector(`.game__artist`).addEventListener(`click`, function () {
    if (Math.round(Math.random())) {
      showTemplate(3);
      addEvListenerSuccess();
    } else {
      showTemplate(4);
      addEvListenerFail();
    }
  });
  document.querySelector(`.game__logo`).addEventListener(`click`, function () {
    showTemplate(0);
    addEvListenerWelcome();
  });
};
