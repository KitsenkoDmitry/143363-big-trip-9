import {createElement} from '../utils';

class Message {
  constructor(text) {
    this._elem = null;
    this._text = text;
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
      <p class="trip-events__msg">${this._text}</p>
    `;
  }
}

export default Message;
