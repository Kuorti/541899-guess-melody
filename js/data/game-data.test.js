import {assert} from 'chai';
import utils from './utils';

describe(`countGamePoints`, () => {
  it(`should return -1 (less than 10 correct answers)`, () => {
    assert.equal(utils.countGamePoints([1, 100]), -1);
  });
  it(`should return 10 (no mistakes, slow answers)`, () => {
    assert.equal(utils.countGamePoints([1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100], 1), 10);
  });
  it(`should return 20 (no mistakes, fast answers)`, () => {
    assert.equal(utils.countGamePoints([1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20], 1), 20);
  });
  it(`should return 18 (fast answers, one is wrong)`, () => {
    assert.equal(utils.countGamePoints([1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 0, 20], 1), 16);
  });
  it(`should return -1 (0 tries left)`, () => {
    assert.equal(utils.countGamePoints([1, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100], 0), -1);
  });
});

describe(`showResults`, () => {
  it(`should return time-out message`, () => {
    assert.equal(utils.showResults([11, 0, 3], {points: 3, notesLeft: 1, timeLeft: 0}), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return tries-out message`, () => {
    assert.equal(utils.showResults([11, 0, 3], {points: 3, notesLeft: 0, timeLeft: 10}), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should return statistics message`, () => {
    assert.equal(utils.showResults([0, 1, 2], {points: 3, notesLeft: 1, timeLeft: 20}), `Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков`);
  });
});

describe(`changeLevel`, () => {
  it(`should return 2`, () => {
    assert.equal(utils.changeLevel(1, 2), 2);
  });
  it(`should return 5 as the last level is already reached`, () => {
    assert.equal(utils.changeLevel(5, 5), 5);
  });
});

describe(`showTimeLeft`, () => {
  it(`should return 998`, () => {
    assert.equal(utils.showTimeLeft(1, 999), 998);
  });
  it(`should return 0 (time is out)`, () => {
    assert.equal(utils.showTimeLeft(20, 1), 0);
  });
});
