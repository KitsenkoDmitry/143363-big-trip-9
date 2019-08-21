import {getMonthName} from '../helpers';

export const renderInfo = (eventsArray) =>
  `<div class="trip-info__main">
      <h1 class="trip-info__title">
          ${eventsArray[0].city} &mdash;
          ${eventsArray.length < 3 ? `` : `
            ${eventsArray.length === 3 ? `${eventsArray[1].city}` : `...`}  &mdash;
          `}
          ${eventsArray[eventsArray.length - 1].city}
      </h1 >

    <p class="trip-info__dates">
      ${getMonthName(new Date(eventsArray[0].date))}
      ${new Date(eventsArray[0].date).getDate()}&nbsp;&mdash;&nbsp;${getMonthName(new Date(eventsArray[eventsArray.length - 1].date))}
      ${new Date(eventsArray[eventsArray.length - 1].date).getDate()}
    </p>
  </div > `;
