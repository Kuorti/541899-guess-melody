import GameModel from "./gameModel";
import GameStatisticsView from "./gameStatisticsView";

export default class statisticsController {
  constructor(headerViewClass) {
    this.headerViewClass = headerViewClass;
    this.gameModel = new GameModel();
    this.timer = null;
  }

  init() {
    this.createView();
  }

  updateView(asdasd) {
    // console.log(gameModel);
    const gameStatisticsView = new GameStatisticsView(this.headerViewClass, asdasd);
    gameStatisticsView.updateView();
  }
  createView() {
    const gameStatisticsView = new GameStatisticsView(this.headerViewClass, this.gameModel.getState());
    gameStatisticsView.render();
  }

}