import Application from "./router";
import WelcomeView from "./welcomeView";
// import GameArtist from "./gameArtistView";

const WelcomePage = new WelcomeView();

export default class WelcomeScreen {
  constructor() {
    // this.gameModel = gameModel;
    // this.view = null;
  }
  init() {
    // this.gameModel.state = gameData.initialState;
    this.createView();
  }
  handleAnswer() {
    Application.showGame();
  }
  createView() {
    WelcomePage.render();
    WelcomePage.bind();
  }
  // tick() {
  //   gameModel = Object.assign({}, game, {
  //     time: game.time + 1;
  //   })
  //   updateHeader(state);
  // }
  // startTimer() {
  //   timer = setTimeout(() => {
  //     this.tick();
  //     startTimer();
  //   }, ONE_SECOND)
  // }
  // stopTimer() {
  //   clearTimeout(timer);
  // }
  // updateStatistics() {
  //   updateView(headerElement, new HeaderView)
  // }
  // updateView(container, view) {
  //   container.innerHTML = ``;
  //   container.appendChild(view.element);
  // }
  // restart(continueGame) {
  //   if (!continueGame) {
  //
  //   }
  // }
}
