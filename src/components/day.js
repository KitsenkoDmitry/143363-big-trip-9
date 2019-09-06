import {getMonthName} from '../utils';
import AbstractComponent from './abstractComponent';

class Day extends AbstractComponent {
  constructor(date, counter, eventsQuantity) {
    super();
    this._date = new Date(date);
    this._counter = counter;
    this._eventsQuantity = eventsQuantity;
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

        <ul class="trip-events__list">
          ${new Array(this._eventsQuantity).fill(``).map(() => `<li class="trip-events__item"></li>`).join(``)}
        </ul>
      </li >
    `;
  }
}

export default Day;
