const MAX_ANSWERS_ARRAY_LENGTH = 20;
const SLOW_AND_FAST_ANSWERS_EDGE = 30;
const OUT_OF_TIME_MESSAGE = `Время вышло! Вы не успели отгадать все мелодии`;
const OUT_OF_TRIES_MESSAGE = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

const countGamePoints = (answersValuesTime, triesLeft) => {
  let sum = null;
  for (let i = 0; i < answersValuesTime.length; i++) {
    if (answersValuesTime.length < MAX_ANSWERS_ARRAY_LENGTH || triesLeft === 0) {
      sum = -1;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] <= SLOW_AND_FAST_ANSWERS_EDGE) {
      sum += answersValuesTime[i] * 2;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] > SLOW_AND_FAST_ANSWERS_EDGE) {
      sum += answersValuesTime[i];
    } else if (i % 2 === 0 && answersValuesTime[i] === 0) {
      sum -= 2;
    }
  }

  return sum;
};

const showResults = (otherPlayersPoints, resultStatistics) => {
  if (resultStatistics.timeLeft === 0) {
    return OUT_OF_TIME_MESSAGE;
  } else if (resultStatistics.notesLeft === 0) {
    return OUT_OF_TRIES_MESSAGE;
  } else {
    let newPlayersPoints = otherPlayersPoints.slice();
    newPlayersPoints.push(resultStatistics.points);
    newPlayersPoints.sort(compareNum).reverse();
    const playerPointsPosition = newPlayersPoints.indexOf(resultStatistics.points) + 1;
    const playersQuantity = newPlayersPoints.length;
    let statisticsPosition = (playersQuantity - playerPointsPosition) / playersQuantity * 100;
    return `Вы заняли ${playerPointsPosition} место из ${playersQuantity} игроков. Это лучше, чем у ${statisticsPosition}% игроков`;
  }
};

const changeLevel = (currentLevel, lastLevel) => {
  if (currentLevel < lastLevel) {
    return currentLevel + 1;
  } else {
    return currentLevel;
  }
};

const showTimeLeft = (timeFromStart, timeLimit) => {
  if (timeFromStart < timeLimit) {
    return timeLimit - timeFromStart;
  } else {
    return 0;
  }
};

const compareNum = (a, b) => {
  return a - b;
};

export default {countGamePoints, showResults, changeLevel, showTimeLeft};
