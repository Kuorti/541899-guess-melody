import {gameData} from "./data/game-data";

const QUESTIONS = [{
  questionText: `Кто1 исполняет эту песню?`,
  type: `artist`,
  rightAnswers: [`answer-1`],
  artists: [
    {
      artist: `Kevin MacLeod`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`,
      isRight: false
    }]
},
{
  questionText: `Выберите2 инди-рок треки`,
  type: `genre`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Выберите3 панк-рок треки`,
  type: `genre`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Выберите метал треки`,
  type: `genre`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Выберите грайндкор треки`,
  type: `genre`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Выберите поп треки`,
  type: `genre`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Кто исполняет эту песню?2`,
  type: `artist`,
  rightAnswers: [`answer-1`],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Кто исполняет эту песню?3`,
  type: `artist`,
  rightAnswers: [`answer-1`],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Кто исполняет эту песню?4`,
  type: `artist`,
  rightAnswers: [`answer-1`],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
},
{
  questionText: `Выберите инди-рок треки`,
  type: `artist`,
  rightAnswers: [true, true],
  artists: [
    {
      artist: `Kevin MacLeod2222`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    {
      artist: `Jingle Punks222222`,
      name: `In the Land of Rhinoplasty`,
      image: `https://i.vimeocdn.com/portrait/992615_300x300`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      genre: `Rock`
    }]
}];

export default class GameModel {
  constructor() {
    this.answers = [
    ];
    this.resultData = {
      resultText: [`success`, `fail`]
    };
    this.questions = QUESTIONS;
    this.state = {
      level: 0,
      lives: [1, 1, 1],
      timeLeft: 300
    };
  }
  nextLevel() {
    this.state.level = this.state.level + 1;
  }
  minusLife() {
    this.state.lives.pop();
  }
  minusSec() {
    this.state.timeLeft = this.state.timeLeft - 1;
  }
  die() {
    // this._state = die(this._state);
  }
  restart() {
    this._state = gameData.initialState;
  }
  getState() {
    return this.state;
  }
  getQuestions() {
    return this.questions;
  }
  isDead() {
    return this._state.lives <= 0;
  }
  getCurrentLevel() {
    // return getLevel(this._state);
  }
}
