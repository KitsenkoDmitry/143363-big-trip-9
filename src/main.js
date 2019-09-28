import {render} from './utils';
import Controls from "./components/controls";
import EventsFilter from "./components/eventsFilter";
import Stats from "./components/stats";
import {eventsMock, eventsFiltersArray, controlsArr} from "./data";
import TripController from './TripController';
import StatisticController from './StatisticController';

const tripControls = document.querySelector(`.trip-controls`);
const controls = new Controls(controlsArr);
const eventsFilter = new EventsFilter(eventsFiltersArray);

const stats = new Stats();
render(tripControls, controls.getElement());
render(tripControls, eventsFilter.getElement());

const pageContainer = document.querySelectorAll(`.page-body__container`);
render(pageContainer[1], stats.getElement());
stats.hide();

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsContainer, eventsMock);

controls.getElement().addEventListener(`click`, (e) => {
  e.preventDefault();
  const {target} = e;
  if (!target.classList.contains(`trip-tabs__btn`)) {
    return;
  }

  controls.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
  target.classList.add(`trip-tabs__btn--active`);

  if (target.href.includes(`stats`)) {
    stats.show();
    tripController.hide();
    eventsFilter.getElement().classList.add(`visually-hidden`);
  } else if (target.href.includes(`table`)) {
    stats.hide();
    tripController.show();
    eventsFilter.getElement().classList.remove(`visually-hidden`);
  }
});

eventsFilter.getElement().addEventListener(`change`, (e) => {
  switch (e.target.value) {
    case `future`: {
      const futureEvents = eventsMock.filter((event) => event.date >= Date.now());
      tripController.setEvents(futureEvents);
      break;
    }
    case `past`: {
      const pastEvents = eventsMock.filter((event) => event.date < Date.now());
      tripController.setEvents(pastEvents);
      break;
    }
    default: {
      tripController.setEvents(eventsMock);
      break;
    }
  }
});

const statisticController = new StatisticController(stats, eventsMock);
