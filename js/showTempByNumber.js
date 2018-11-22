import {welcomeScreen} from './welcomeScreen';
import {gameArtist} from './gameArtist';
import {gameGenre} from './gameGenre';
import {resultSuccess} from './resultSuccess';
import {failTime} from './failTime';
import {failTries} from './failTries';

const templates = [];

templates.push(welcomeScreen, gameGenre, gameArtist, resultSuccess, failTime, failTries);

export const showTemplate = (number) => {
  const mainBlock = document.querySelector(`.main`);
  mainBlock.innerHTML = ``;
  mainBlock.appendChild(templates[number].content.cloneNode(true));
};
