import {gameData} from "./game-data";

const resetGame = () => {
  gameData.initialState = {
    level: 0,
    lives: [],
    screenType: 0,
    currentQuestion: 0,
    timeLeft: 300,
    mistakes: []
  };
};

const changeLevel = (currentLevel, lastLevel) => {
  if (currentLevel < lastLevel) {
    return currentLevel + 1;
  }
  return currentLevel;
};

const throwDomEl = (domString, dontClear, append) => {
  const template = document.createElement(`template`);
  const mainBlock = document.querySelector(`.main`);
  template.innerHTML += domString;
  if (!dontClear) {
    mainBlock.innerHTML = ``;
  }
  if (!append) {
    mainBlock.appendChild(template.content.cloneNode(true));
  } else {
    mainBlock.firstElementChild.appendChild(template.content.cloneNode(true));
  }
  return mainBlock;
};

const showTimeLeft = (timeFromStart, timeLimit) => {
  if (timeFromStart < timeLimit) {
    return timeLimit - timeFromStart;
  }
  return 0;
};

const checkClicked = (gameAnswers) => {
  return [...gameAnswers].map((innerEl) => {
    return innerEl.firstChild.nextSibling.checked;
  }).filter((el) => el === true).length;
};

export default {changeLevel, showTimeLeft, checkClicked, throwDomEl, resetGame};
