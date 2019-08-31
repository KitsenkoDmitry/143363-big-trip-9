import Info from "./components/info";
import Sort from "./components/sort";
import DaysList from "./components/daysList";
import {sortArr} from "./data";
import {render, Position} from "./utils";
import Message from "./components/message";
import Day from "./components/day";
import EditEvent from "./components/editEvent";
import Event from "./components/event";

class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripInfo = document.querySelector(`.trip-info`);
  }

  init() {
    const info = new Info(this._events);
    const sort = new Sort(sortArr);
    const daysList = new DaysList();

    if (this._events.length) {
      render(this._tripInfo, info.getElement(), Position.AFTERBEGIN);
      render(this._container, sort.getElement());
      render(this._container, daysList.getElement());
      this._showTotalPrice();
      this._renderAllEvents();
    } else {
      this._renderMessage();
    }
  }

  _renderMessage() {
    const messageText = `Click New Event to create your first point`;
    const messageElem = new Message(messageText).getElement();
    render(this._container, messageElem);
  }

  _renderAllEvents() {
    const tripDays = document.querySelector(`.trip-days`);
    let day = null;
    let month = null;
    let eventsList = null;

    this._events.forEach((event, index) => {
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
  }

  _showTotalPrice() {
    document.querySelector(`.trip-info__cost-value`).innerHTML = this._countTotalPrice(this._events);
  }

  _countTotalPrice(events) {
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
}

export default TripController;
