const maxAnswersArrayLength = 20;
const slowAndFastAnswersEdge = 30;
const outOfTimeMessage = `Время вышло! Вы не успели отгадать все мелодии`;
const outOfTriesMessage = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
const countGamePoints = (answersValuesTime, triesLeft) => {
  let sum = null;
  for (let i = 0; i < answersValuesTime.length; i++) {
    if (answersValuesTime.length < maxAnswersArrayLength || triesLeft === 0) {
      sum = -1;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] <= slowAndFastAnswersEdge) {
      sum += answersValuesTime[i] * 2;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] > slowAndFastAnswersEdge) {
      sum += answersValuesTime[i];
    } else if (i % 2 === 0 && answersValuesTime[i] === 0) {
      sum -= 2;
    }
  }
  return sum;
};
const showResults = (otherPlayersPoints, resultStatistics) => {
  if (resultStatistics.timeLeft === 0) {
    return outOfTimeMessage;
  } else if (resultStatistics.notesLeft === 0) {
    return outOfTriesMessage;
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