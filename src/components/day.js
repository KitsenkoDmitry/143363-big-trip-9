
import AbstractComponent from './abstractComponent';
import moment from "moment";

class Day extends AbstractComponent {
  constructor({date}, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }

  getTemplate() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._counter}</span>
          <time class="day__date" datetime="2019-03-18">
            ${moment(this._date).format(`DD MMM`)}
          </time>
        </div >

        <ul class="trip-events__list"></ul>
      </li >
    `;
  }
}

export default Day;
