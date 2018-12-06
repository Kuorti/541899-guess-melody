const countGamePoints = (answersValuesTime, triesLeft) => {
  let sum = null;
  for (let i = 0; i < answersValuesTime.length; i++) {
    if (answersValuesTime.length < 20 || triesLeft === 0) {
      sum = -1;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] < 30) {
      sum += answersValuesTime[i] * 2;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] >= 30) {
      sum += answersValuesTime[i];
    } else if (i % 2 === 0 && answersValuesTime[i] === 0) {
      sum -= 2;
    }
  }

  return sum;
};

const showResults = (otherPlayersPoints, resultStatistics) => {
  if (resultStatistics.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (resultStatistics.notesLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    let newPlayersPoints = otherPlayersPoints.slice();
    newPlayersPoints.push(resultStatistics.points);
    newPlayersPoints.sort(compareNum).reverse();
    const playerPointsPosition = newPlayersPoints.indexOf(resultStatistics.points) + 1;
    const playersQuantity = newPlayersPoints.length; // 4
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
