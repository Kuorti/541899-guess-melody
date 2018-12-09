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
  element(dontClear = false) {
    if (this._element) {
      return this._element;
    }
    this._element = this.render(dontClear);
    this.bind(this._element);
    return this._element;
  }
  render(dontClear) {
    return utils.throwDomEl(this.template, dontClear);
  }
  bind() {
    // bind handlers if required
  }
}
