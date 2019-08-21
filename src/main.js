import {renderComponent} from './helpers';
import {renderInfo} from "./components/info";
import {renderControls} from "./components/controls";
import {renderEventsFilter} from "./components/eventsFilter";
import {renderSort} from "./components/sort";
import {renderEditEvent} from "./components/editEvent";
import {renderDay} from "./components/day";
import {renderEvent} from "./components/event";
import {renderDaysList} from "./components/daysList";
import {eventsArray, eventsFiltersArray, controlsArr, sortArr} from "./data";

const tripInfo = document.querySelector(`.trip-info`);
renderComponent(tripInfo, renderInfo(eventsArray), `afterbegin`);

const tripControls = document.querySelector(`.trip-controls`);
renderComponent(tripControls, renderControls(controlsArr));
renderComponent(tripControls, renderEventsFilter(eventsFiltersArray));

const tripEvents = document.querySelector(`.trip-events`);
renderComponent(tripEvents, renderSort(sortArr));

renderComponent(tripEvents, renderDaysList());

renderAllEvents();

document.querySelector(`.trip-info__cost-value`).innerHTML = countTotalPrice(eventsArray);

function countTotalPrice(events) {
  let price = 0;
  events.forEach((event) => {
    price += event.price;

    for (const offer in event.offers) {
      if (offer.checked) {
        price += offer.price;
      }
    }
  });

  return price;
}

function renderAllEvents() {
  const tripDays = document.querySelector(`.trip-days`);
  let day = null;
  let month = null;
  let eventsList = null;
  eventsArray.forEach((event, index) => {
    const eventDay = new Date(event.date).getDate();
    const eventMonth = new Date(event.date).getMonth();
    if (eventDay !== day || eventMonth !== month) {
      renderComponent(tripDays, renderDay(event, index + 1));
      eventsList = Array.from(document.querySelectorAll(`.trip-events__list`));
      day = eventDay;
      month = eventMonth;
    }

    if (index === 0) {
      renderComponent(eventsList[eventsList.length - 1], renderEditEvent(event));
    } else {
      renderComponent(eventsList[eventsList.length - 1], renderEvent(event));
    }
  });
}
