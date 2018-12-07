export const gameScreenGenre = (question) => `<section class="game game--genre">
    <section class="game__screen">
      <h2 class="game__title">${question.questionText}</h2>
      <form class="game__tracks">
        
        ${question.artists
  .map((currentValue, index) => `<div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${index}" id="answer-${index}">
            <label class="game__check" for="answer-${index}">Отметить</label>
          </div>
        </div>`)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
    </section>`;
