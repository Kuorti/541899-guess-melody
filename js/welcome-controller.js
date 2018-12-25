import Application from "./router";
import WelcomeView from "./welcome-view";

const WelcomePage = new WelcomeView();

export default class WelcomeScreen {
  constructor() {}
  init() {
    WelcomePage.init();
  }
  handleAnswer() {
    Application.showGame();
  }
}
