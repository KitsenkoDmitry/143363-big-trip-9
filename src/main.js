import {renderComponent} from './helpers';
import {renderInfo} from "./components/info";
import {renderControls} from "./components/controls";
import {renderEventsFilter} from "./components/eventsFilter";
import {renderSort} from "./components/sort";
import {renderEditEvent} from "./components/editEvent";
import {renderDay} from "./components/day";
import {renderEvent} from "./components/event";
import {renderDaysList} from "./components/daysList";

const EVENTS_QUANTITY = 3;

const tripInfo = document.querySelector(`.trip-info`);
renderComponent(tripInfo, renderInfo(), `afterbegin`);

const tripControls = document.querySelector(`.trip-controls`);
renderComponent(tripControls, renderControls(), `beforeend`);
renderComponent(tripControls, renderEventsFilter(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
renderComponent(tripEvents, renderEditEvent(), `beforeend`);
renderComponent(tripEvents, renderSort(), `beforeend`);
renderComponent(tripEvents, renderDaysList(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);
renderComponent(tripDays, renderDay(), `beforeend`);
const eventsList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_QUANTITY; i++) {
  renderComponent(eventsList, renderEvent(), `beforeend`);
}
