export const renderEvent = ({type, title, date, price, offers}) =>
  `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
      </div>
      <h3 class="event__title">${type} to ${title}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time"
            datetime="${new Date(date).toISOString()}">
            ${new Date(date).getHours()}:${new Date(date).getMinutes()}
          </time>
          &mdash;
          <time class="event__end-time"
            datetime="${new Date(date + 1000 * 60 * 90)}">
            ${new Date(date + 1000 * 60 * 90).getHours()}:
            ${new Date(date + 1000 * 60 * 90).getMinutes()}</time>
        </p>
        <p class="event__duration">1H 30M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map((offer) => {
    return offer.checked ? `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>` : ``;
  }).join(``)}
      </ul >

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li >`;
