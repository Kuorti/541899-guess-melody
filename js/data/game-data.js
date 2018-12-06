export const gameData = {
  initialState: {
    lives: 3,
    screenType: 0,
    timeLeft: 300,
    mistakes: []
  },
  answers: [
    {
      timeForAnswer: null,
      isRight: null
    }
  ],
  resultData: {
    resultText: [`success`, `fail`]
  },
  questions: [{
    questionText: `Кто исполняет эту песню?`,
    type: `artist`,
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
        genre: `Rock`
      }]
  },
  {
    questionText: `Выберите инди-рок треки`,
    type: `genre`,
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
    questionText: `Выберите панк-рок треки`,
    type: `genre`
  },
  {
    questionText: `Выберите метал треки`,
    type: `genre`
  },
  {
    questionText: `Выберите грайндкор треки`,
    type: `genre`
  },
  {
    questionText: `Выберите поп треки`,
    type: `genre`
  },
  {
    questionText: `Кто исполняет эту песню?2`,
    type: `artist`
  },
  {
    questionText: `Кто исполняет эту песню?3`,
    type: `artist`
  },
  {
    questionText: `Кто исполняет эту песню?4`,
    type: `artist`
  },
  {
    questionText: `Выберите инди-рок треки`,
    type: `artist`
  }
  ]
};
