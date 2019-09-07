import {getMonthName} from '../utils';
import AbstractComponent from './abstractComponent';

class Day extends AbstractComponent {
  constructor({date}, counter) {
    super();
    this._date = new Date(date);
    this._counter = counter;
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
