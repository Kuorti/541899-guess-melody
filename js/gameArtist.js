export const gameScreenArtist = (question) => `<section class="game__screen">
      <h2 class="game__title">${question.questionText}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>
      <form class="game__artist">
              ${question.artists
  .map((currentValue, index) => `
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
          <label class="artist__name" for="answer-${index}">
            <img class="artist__picture" src="${currentValue.image}" alt="${currentValue.artist}">
            ${currentValue.artist}
          </label>
        </div>
    `)
  .reduce((acc, current) => acc + current, ``)} 
    </section>
`;
