import {createElement, getMonthName} from '../utils';

class Day {
  constructor({date}, counter) {
    this._elem = null;
    this._date = new Date(date);
    this._counter = counter;
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
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._counter}</span>
          <time class="day__date" datetime="2019-03-18">
            ${getMonthName(this._date)}
            ${this._date.getDate()}
          </time>
        </div >

        <ul class="trip-events__list"></ul>
      </li >
    `;
  }
}

export default Day;
