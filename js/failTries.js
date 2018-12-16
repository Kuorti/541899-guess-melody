import throwDomEl from './domEmitter';
// import {showTemplate} from "./showTempByNumber";
// import {addEvListenerWelcome} from "./welcomeScreen";

export const failTries = throwDomEl(`
    <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>`);

// export const addEvListenerFail = () => {
//   document.querySelector(`.result__replay`).addEventListener(`click`, function () {
//     showTemplate(0);
//     addEvListenerWelcome();
//   });
//   document.querySelector(`document.querySelector(".welcome__logo img")`).addEventListener(`click`, function () {
//     showTemplate(0);
//     addEvListenerWelcome();
//   });
// };
