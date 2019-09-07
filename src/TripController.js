import Info from "./components/info";
import Sort from "./components/sort";
import DaysList from "./components/daysList";
import {sortArr} from "./data";
import {render, Position} from "./utils";
import Message from "./components/message";
import Day from "./components/day";
import PointController from "./PointController";


class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripInfo = document.querySelector(`.trip-info`);
    this._sortElem = new Sort(sortArr).getElement();
    this._daysListElem = new DaysList().getElement();
    this._onSortClick = this._onSortClick.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);

    this._subscriptions = [];
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

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((event) => event === oldData)] = newData;
    this._daysListElem.innerHTML = ``;
    this._renderAllEvents(this._events);
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
      const eventContainer = eventsList[eventsList.length - 1];
      const pointerController = new PointController(eventContainer, event, this._onDataChange, this._onChangeView);
      this._subscriptions.push(pointerController.setDefaultView);
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
