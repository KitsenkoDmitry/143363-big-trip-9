import {createElement} from '../utils';

class DaysList {
  constructor() {
    this._elem = null;
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
    return `
      <ul class="trip-days"></ul>
    `;
  }
}

export default DaysList;
