import {render} from './utils';
import Info from "./components/info";
import Controls from "./components/controls";
import EventsFilter from "./components/eventsFilter";
import Sort from "./components/sort";
import EditEvent from "./components/editEvent";
import Day from "./components/day";
import Event from "./components/event";
import {renderDaysList} from "./components/daysList";
import {eventsArray, eventsFiltersArray, controlsArr, sortArr} from "./data";

const tripInfo = document.querySelector(`.trip-info`);
const info = new Info(eventsArray);
render(tripInfo, info.getElement(), `afterbegin`);


const tripControls = document.querySelector(`.trip-controls`);
const controls = new Controls(controlsArr);
render(tripControls, controls.getElement());
const eventsFilter = new EventsFilter(eventsFiltersArray);
render(tripControls, eventsFilter.getElement());

const tripEvents = document.querySelector(`.trip-events`);
const sort = new Sort(sortArr);
render(tripEvents, sort.getElement());

tripEvents.insertAdjacentHTML(`beforeend`, renderDaysList());

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
      const dayInstance = new Day(event, index + 1);
      render(tripDays, dayInstance.getElement());
      eventsList = Array.from(document.querySelectorAll(`.trip-events__list`));
      day = eventDay;
      month = eventMonth;
    }

    if (index === 0) {
      const editEvent = new EditEvent(event);
      render(eventsList[eventsList.length - 1], editEvent.getElement());
    } else {
      const eventInstance = new Event(event);
      render(eventsList[eventsList.length - 1], eventInstance.getElement());
    }
  });
}
