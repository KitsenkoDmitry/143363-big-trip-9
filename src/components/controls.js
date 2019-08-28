import {createElement} from '../utils';

class Controls {
  constructor(controlsArr) {
    this._elem = null;
    this._controlsArr = controlsArr;
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
      <div>
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs trip-tabs">
          ${this._controlsArr.map((control) => (`<a class="trip-tabs__btn ${control.isActive ? `trip-tabs__btn--active` : ``}" href="#">${control.name}</a>`)).join(``)}
        </nav>
      </div>
    `;
  }
}

export default Controls;
