"use strict";
const aTemplatesSelectors = [`#welcome`, `#game-artist`, `#game-genre`, `#result-success`, `#fail-time`, `#fail-tries`, `#modal-error`, `#modal-confirm`];
const aTemplates = [];
const iRightArrowKeycode = 39;
const iLeftArrowKeycode = 37;
aTemplatesSelectors.forEach(function (sSelector) {
  aTemplates.push(document.querySelector(sSelector));
});

const showTemplate = (iNumber) => {
  const eMainBlock = document.querySelector(`.main`);
  eMainBlock.innerHTML = ``;
  eMainBlock.appendChild(aTemplates[iNumber].content.cloneNode(true));
};

const addNavigationArrows = () => {
  const sElemToPaste =
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
  document.querySelector(`.app`).innerHTML += (sElemToPaste);
};

const setKeyboardListener = () => {
  let iPageCounter = 0;
  document.addEventListener(`keyup`, function () {
    if (event.keyCode === iRightArrowKeycode) {
      iPageCounter = Math.min(aTemplatesSelectors.length - 1, iPageCounter + 1);
    } else if (event.keyCode === iLeftArrowKeycode) {
      iPageCounter = Math.max(0, iPageCounter - 1);
    }
    showTemplate(iPageCounter);
  });
  document.addEventListener(`click`, function () {
    if (event.target === document.querySelectorAll(`.arrows__btn`)[1]) {
      iPageCounter = Math.min(aTemplatesSelectors.length - 1, iPageCounter + 1);
    } else if (event.target === document.querySelectorAll(`.arrows__btn`)[0]) {
      iPageCounter = Math.max(0, iPageCounter - 1);
    }
    showTemplate(iPageCounter);
  });
};

addNavigationArrows();
setKeyboardListener();
showTemplate(0);

