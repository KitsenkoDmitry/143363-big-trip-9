import {createElement} from '../utils';

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }

    return this._elem;
  }

  removeElement() {
    if (this._elem) {
      this._elem = null;
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}

export default AbstractComponent;
