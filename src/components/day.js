import {getMonthName} from '../helpers';

export const renderDay = ({date}, counter) =>
  `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="2019-03-18">
        ${getMonthName(new Date(date))}
        ${new Date(date).getDate()}
      </time>
    </div >

    <ul class="trip-events__list"></ul>
  </li > `;
