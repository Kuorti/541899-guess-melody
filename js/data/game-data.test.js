import {assert} from 'chai';

const countGamePoints = (answersValuesTime, triesLeft) => {
  let sum = null;
  for (let i = 0; i < answersValuesTime.length; i++) {
    if (answersValuesTime.length < 20 || triesLeft === 0) {
      sum = -1;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] < 30) {
      sum += answersValuesTime[i] * 2;
    } else if (i % 2 === 0 && answersValuesTime[i] !== 0 && answersValuesTime[i + 1] > 30) {
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

describe(`countGamePoints`, () => {
  it(`should return -1 (less than 10 correct answers)`, () => {
    assert.equal(countGamePoints([1, 100]), -1);
  });
  it(`should return 10 (no mistakes, slow answers)`, () => {
    assert.equal(countGamePoints([1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100], 1), 10);
  });
  it(`should return 20 (no mistakes, fast answers)`, () => {
    assert.equal(countGamePoints([1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20], 1), 20);
  });
  it(`should return 18 (fast answers, one is wrong)`, () => {
    assert.equal(countGamePoints([1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 0, 20], 1), 16);
  });
  it(`should return -1 (0 tries left)`, () => {
    assert.equal(countGamePoints([1, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100], 0), -1);
  });
});

describe(`showResults`, () => {
  it(`should return time-out message`, () => {
    assert.equal(showResults([11, 0, 3], {points: 3, notesLeft: 1, timeLeft: 0}), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return tries-out message`, () => {
    assert.equal(showResults([11, 0, 3], {points: 3, notesLeft: 0, timeLeft: 10}), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should return statistics message`, () => {
    assert.equal(showResults([0, 1, 2], {points: 3, notesLeft: 1, timeLeft: 20}), `Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков`);
  });
});

describe(`changeLevel`, () => {
  it(`should return 2`, () => {
    assert.equal(changeLevel(1, 2), 2);
  });
  it(`should return 5 as the last level is already reached`, () => {
    assert.equal(changeLevel(5, 5), 5);
  });
});

describe(`showTimeLeft`, () => {
  it(`should return 998`, () => {
    assert.equal(showTimeLeft(1, 999), 998);
  });
  it(`should return 0 (time is out)`, () => {
    assert.equal(showTimeLeft(20, 1), 0);
  });
});
