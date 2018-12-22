import utils from './data/utils';
export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't be abstract`);
    }
  }
  get template() {
    throw new Error(`Template is required`);
  }
  render(dontClear, append) {
    return utils.throwDomEl(this.template, dontClear, append);
  }
  bind() {
    // bind handlers if required
  }
}
