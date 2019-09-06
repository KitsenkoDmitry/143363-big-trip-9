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
  }

  init() {
    const info = new Info(this._events);

    if (this._events.length) {
      render(this._tripInfo, info.getElement(), Position.AFTERBEGIN);
      render(this._container, this._sortElem);
      render(this._container, this._daysListElem);
      this._showTotalPrice();
      this._renderAllDays(this._events);

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
        this._renderAllDays(this._events);
        break;
      }
      case `sort-time`: {
        const sortedByTime = this._events.slice().sort((a, b) => (b.duration - a.duration));
        this._renderAllDays(sortedByTime);
        break;
      }
      case `sort-price`: {
        const sortedByPrice = this._events.slice().sort((a, b) => (b.price - a.price));
        this._renderAllDays(sortedByPrice);
        break;
      }
    }

  }

  _renderMessage() {
    const messageText = `Click New Event to create your first point`;
    const messageElem = new Message(messageText).getElement();
    render(this._container, messageElem);
  }

  /**
   * Создает объект даты - количество событий в дате
   *
   * @param {Object} events Объект с данными
   * @return {Object}
   */
  _getTripDaysObj(events) {
    let day = null;
    let month = null;
    const tripDays = {};

    events.forEach((event) => {
      const eventDay = new Date(event.date).getDate();
      const eventMonth = new Date(event.date).getMonth();

      if (eventDay !== day || eventMonth !== month) {
        tripDays[`${eventDay}:${eventMonth}`] = 1;
        day = eventDay;
        month = eventMonth;
      } else {
        tripDays[`${eventDay}:${eventMonth}`] += 1;
      }
    });

    return tripDays;
  }

  _renderAllDays(events) {
    const tripDaysObj = this._getTripDaysObj(events);

    Object.keys(tripDaysObj).forEach((key, index) => {
      const dayInstance = new Day(event, index + 1, tripDaysObj[key]);
      render(this._daysListElem, dayInstance.getElement());

    });

    // console.log(tripDays);
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
