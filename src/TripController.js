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
    this._sortElem = new Sort(sortArr).getElement();
    this._daysListElem = new DaysList().getElement();
    this._onSortClick = this._onSortClick.bind(this);
  }

  init() {
    const info = new Info(this._events);

    if (this._events.length) {
      render(this._tripInfo, info.getElement(), Position.AFTERBEGIN);
      render(this._container, this._sortElem);
      render(this._container, this._daysListElem);
      this._showTotalPrice();
      this._renderAllEvents(this._events);

      this._sortElem.addEventListener(`click`, this._onSortClick);
    } else {
      this._renderMessage();
    }
  }

  _onSortClick(e) {
    if (e.target.className !== `trip-sort__btn`) {
      return;
    }
    this._daysListElem.innerHTML = ``;

    switch (e.target.dataset.sortType) {
      case `sort-event`: {
        this._renderAllEvents(this._events);
        break;
      }
      case `sort-time`: {
        const sortedByTime = this._events.slice().sort((a, b) => (b.duration - a.duration));
        this._renderAllEvents(sortedByTime);
        break;
      }
      case `sort-price`: {
        const sortedByPrice = this._events.slice().sort((a, b) => (b.price - a.price));
        this._renderAllEvents(sortedByPrice);
        break;
      }
    }

  }

  _renderMessage() {
    const messageText = `Click New Event to create your first point`;
    const messageElem = new Message(messageText).getElement();
    render(this._container, messageElem);
  }

  _renderAllEvents(events) {
    let day = null;
    let month = null;
    let eventsList = null;

    events.forEach((event, index) => {
      const eventDay = new Date(event.date).getDate();
      const eventMonth = new Date(event.date).getMonth();
      if (eventDay !== day || eventMonth !== month) {
        const dayInstance = new Day(event, index + 1);
        render(this._daysListElem, dayInstance.getElement());
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
