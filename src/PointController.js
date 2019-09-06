import EditEvent from "./components/editEvent";
import {render} from "./utils";

class PointController {
  constructor(container, eventData) {
    this._eventContainer = container;
    this._editEvent = new EditEvent(eventData);
    this._event = new Event(eventData);

    this.init();
  }

  init() {
    const editEventElement = this._editEvent.getElement();
    const eventElement = this.event.getElement();
    render(this._eventContainer, eventElement);

    const onEscKeyDown = (e) => {
      if (e.keyCode === 27) {
        this._eventContainer.replaceChild(eventElement, editEventElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._eventContainer.replaceChild(editEventElement, eventElement);
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
        this._eventContainer.replaceChild(eventElement, editEventElement);
      });

    editEventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._eventContainer.replaceChild(eventElement, editEventElement);
      });
  }
}

export default PointController;
