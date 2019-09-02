import AbstractComponent from './abstractComponent';

class Event extends AbstractComponent {
  constructor({type, title, date, duration, price, offers}) {
    super();
    this._type = type;
    this._title = title;
    this._date = date;
    this._duration = duration;
    this._price = price;
    this._offers = offers;
  }

  getTemplate() {
    return `
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="${this._type} icon">
          </div>
          <h3 class="event__title">${this._type} to ${this._title}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time"
                datetime="${new Date(this._date).toISOString()}">
                ${new Date(this._date).getHours()}:${new Date(this._date).getMinutes()}
              </time>
              &mdash;
              <time class="event__end-time"
                datetime="${new Date(this._date + this._duration)}">
                ${new Date(this._date + this._duration).getHours()}:
                ${new Date(this._date + this._duration).getMinutes()}</time>
            </p>
            <p class="event__duration">${Math.floor(this._duration / (1000 * 60 * 60))}H ${Math.floor((this._duration / (1000 * 60) % 60))}M</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this._offers.map((offer) => (offer.checked ? `<li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </li>` : ``)).join(``)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li >`;
  }
}

export default Event;
