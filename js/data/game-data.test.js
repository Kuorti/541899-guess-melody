import {assert} from 'chai';
import utils from './utils';

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
