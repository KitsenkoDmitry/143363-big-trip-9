import {getMonthName} from '../utils';
import AbstractComponent from './abstractComponent';

class Info extends AbstractComponent {
  constructor(eventsArray) {
    super();
    this._eventsArray = eventsArray;
  }

  getTemplate() {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${this._eventsArray[0].city} &mdash;
          ${this._eventsArray.length < 3 ? `` : `
            ${this._eventsArray.length === 3 ? `${this._eventsArray[1].city}` : `...`}  &mdash;
          `}
          ${this._eventsArray[this._eventsArray.length - 1].city}
        </h1 >

        <p class="trip-info__dates">
          ${getMonthName(new Date(this._eventsArray[0].date))}
          ${new Date(this._eventsArray[0].date).getDate()}&nbsp;&mdash;&nbsp;${getMonthName(new Date(this._eventsArray[this._eventsArray.length - 1].date))}
          ${new Date(this._eventsArray[this._eventsArray.length - 1].date).getDate()}
        </p>
      </div >
    `;
  }
}

export default Info;
