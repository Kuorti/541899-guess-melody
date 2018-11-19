"use strict";
const templatesSelectors = [`#welcome`, `#game-artist`, `#game-genre`, `#result-success`, `#fail-time`, `#fail-tries`, `#modal-error`, `#modal-confirm`];
const templates = [];
const rightArrowKeycode = 39;
const leftArrowKeycode = 37;
templatesSelectors.forEach(function (selector) {
  templates.push(document.querySelector(selector));
});

const showTemplate = (number) => {
  const eMainBlock = document.querySelector(`.main`);
  eMainBlock.innerHTML = ``;
  eMainBlock.appendChild(templates[number].content.cloneNode(true));
};

const addNavigationArrows = () => {
  const elemToPaste =
        `<div class="arrows__wrap">
            <style>
              .arrows__wrap {
                position: absolute;
                top: 135px;
                left: 50%;
                margin-left: -56px;
              }
              .arrows__btn {
                background: none;
                border: 2px solid black;
                padding: 5px 20px;
              }
            </style>
            <button class="arrows__btn"><-</button>
            <button class="arrows__btn">-></button>
        </div>`;
  document.querySelector(`.app`).innerHTML += (elemToPaste);
};

const setKeyboardListener = () => {
  let pageCounter = 0;
  document.addEventListener(`keyup`, function () {
    if (event.keyCode === rightArrowKeycode) {
      pageCounter = Math.min(templatesSelectors.length - 1, pageCounter + 1);
    } else if (event.keyCode === leftArrowKeycode) {
      pageCounter = Math.max(0, pageCounter - 1);
    }
    showTemplate(pageCounter);
  });
  document.addEventListener(`click`, function () {
    if (event.target === document.querySelectorAll(`.arrows__btn`)[1]) {
      pageCounter = Math.min(templatesSelectors.length - 1, pageCounter + 1);
    } else if (event.target === document.querySelectorAll(`.arrows__btn`)[0]) {
      pageCounter = Math.max(0, pageCounter - 1);
    }
    showTemplate(pageCounter);
  });
};

addNavigationArrows();
setKeyboardListener();
showTemplate(0);

