import {render} from './utils';
import Controls from "./components/controls";
import EventsFilter from "./components/eventsFilter";
import {eventsArray, eventsFiltersArray, controlsArr} from "./data";

import TripController from './TripController';

const tripControls = document.querySelector(`.trip-controls`);
const controls = new Controls(controlsArr);
const eventsFilter = new EventsFilter(eventsFiltersArray);
render(tripControls, controls.getElement());
render(tripControls, eventsFilter.getElement());

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsContainer, eventsArray);
tripController.init();
