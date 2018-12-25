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
  _render(dontClear, append) {
    return utils.throwDomEl(this.template, dontClear, append);
  }
  _bind() {
    // bind handlers if required
  }
}
