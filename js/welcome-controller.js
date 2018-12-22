import Application from "./router";
import WelcomeView from "./welcome-view";

const WelcomePage = new WelcomeView();

export default class WelcomeScreen {
  constructor() {}
  init() {
    this.createView();
  }
  handleAnswer() {
    Application.showGame();
  }
  createView() {
    WelcomePage.render();
    WelcomePage.bind();
  }
}
