import {render} from './utils';
import Info from "./components/info";
import Controls from "./components/controls";
import EventsFilter from "./components/eventsFilter";
import Sort from "./components/sort";
import EditEvent from "./components/editEvent";
import Day from "./components/day";
import Event from "./components/event";
import DaysList from "./components/daysList";
import {eventsArray, eventsFiltersArray, controlsArr, sortArr} from "./data";
import Message from './components/message';

const tripControls = document.querySelector(`.trip-controls`);
const controls = new Controls(controlsArr);
const eventsFilter = new EventsFilter(eventsFiltersArray);
render(tripControls, controls.getElement());
render(tripControls, eventsFilter.getElement());

const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-info`);
const info = new Info(eventsArray);
const sort = new Sort(sortArr);
const daysList = new DaysList();

const countTotalPrice = (events) => {
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
};

const showTotalPrice = () => {
  document.querySelector(`.trip-info__cost-value`).innerHTML = countTotalPrice(eventsArray);
};

const renderAllEvents = () => {
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

    const editEvent = new EditEvent(event);
    const editEventElement = editEvent.getElement();
    const eventContainer = eventsList[eventsList.length - 1];
    const eventInstance = new Event(event);
    const eventElement = eventInstance.getElement();
    render(eventContainer, eventElement);

    const onEscKeyDown = (e) => {
      if (e.keyCode === 27) {
        eventContainer.replaceChild(eventElement, editEventElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        eventContainer.replaceChild(editEventElement, eventElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    Array.from(editEventElement.querySelectorAll(`input[type="text"]`)).forEach((input) => {
      input.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      input.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    editEventElement.querySelector(`form`)
      .addEventListener(`submit`, (e) => {
        e.preventDefault();
        eventContainer.replaceChild(eventElement, editEventElement);
      });

    editEventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        eventContainer.replaceChild(eventElement, editEventElement);
      });
  });
};

const renderMessage = () => {
  const messageText = `Click New Event to create your first point`;
  const messageElem = new Message(messageText).getElement();
  render(tripEvents, messageElem);
};

if (eventsArray.length) {
  render(tripInfo, info.getElement(), `afterbegin`);
  render(tripEvents, sort.getElement());
  render(tripEvents, daysList.getElement());
  showTotalPrice();
  renderAllEvents();
} else {
  renderMessage();
}
