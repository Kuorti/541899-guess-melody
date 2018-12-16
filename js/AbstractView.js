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
  // element(dontClear = false, append = false) {
  //   if (this._element) {
  //     return this._element;
  //   }
  //   this._element = this.render(dontClear, append);
  //   this.bind(this._element);
  //   return this._element;
  // }
  render(dontClear, append) {
    return utils.throwDomEl(this.template, dontClear, append);
  }
  bind() {
    // bind handlers if required
  }
}
