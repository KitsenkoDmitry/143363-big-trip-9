import {render, Position} from './utils';
import Controls from "./components/controls";
import EventsFilter from "./components/eventsFilter";
import Stats from "./components/stats";
import {eventsArray, eventsFiltersArray, controlsArr} from "./data";
import TripController from './TripController';
import NewEvent from './components/newEvent';

const tripControls = document.querySelector(`.trip-controls`);
const controls = new Controls(controlsArr);
const eventsFilter = new EventsFilter(eventsFiltersArray);
const stats = new Stats();
render(tripControls, controls.getElement());
render(tripControls, eventsFilter.getElement());

const pageContainer = document.querySelectorAll(`.page-body__container`);
render(pageContainer[1], stats.getElement());
stats.getElement().classList.add(`visually-hidden`);

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsContainer, eventsArray);
tripController.init();

controls.getElement().addEventListener(`click`, (e) => {
  e.preventDefault();
  const {target} = e;
  if (!target.classList.contains(`trip-tabs__btn`)) {
    return;
  }

  controls.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
  target.classList.add(`trip-tabs__btn--active`);

  if (target.href.includes(`stats`)) {
    stats.getElement().classList.remove(`visually-hidden`);
    tripController.hide();
    eventsFilter.getElement().classList.add(`visually-hidden`);
  } else if (target.href.includes(`table`)) {
    stats.getElement().classList.add(`visually-hidden`);
    tripController.show();
    eventsFilter.getElement().classList.remove(`visually-hidden`);
  }
});
