import EditEvent from "./components/editEvent";
import Event from "./components/event";
import {render} from "./utils";
import {changeDescription} from "./data";

class PointController {
  constructor(container, eventData, onDataChange, onChangeView) {
    this._eventContainer = container;
    this._event = new Event(eventData);
    this._editEvent = new EditEvent(eventData);
    this._eventData = eventData;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._onTypeChange = this._onTypeChange.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);

    this.init();
  }

  init() {
    const editEventElement = this._editEvent.getElement();
    const eventElement = this._event.getElement();
    render(this._eventContainer, eventElement);

    const onEscKeyDown = (e) => {
      if (e.keyCode === 27) {
        this._eventContainer.replaceChild(eventElement, editEventElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
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

    editEventElement.querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`change`, this._onTypeChange);
    });

    editEventElement.querySelector(`form`)
      .addEventListener(`submit`, (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const entry = {
          type: formData.get(`event-type`),
          city: formData.get(`event-destination`),
          date: formData.get(`event-start-time`),
          duration: formData.get(`event-end-time`),
          price: formData.get(`event-price`),
          offers: [],
          photos: [],
          description: editEventElement.querySelector(`.event__destination-description`).textContent
        };

        this._onDataChange(entry, this._eventData);
        // this._eventContainer.replaceChild(eventElement, editEventElement);
      });

    editEventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._eventContainer.replaceChild(eventElement, editEventElement);
      });
  }

  _onTypeChange(e) {
    if (e.target.checked) {
      const type = e.target.value;
      const postfix = type === `check-in` || type === `sightseeing` || type === `restaurant` ?
        `at` : `to`;
      this._editEvent.getElement().querySelector(`.event__type-icon`).src = `img/icons/${type}.png`;
      this._editEvent.getElement().querySelector(`.event__type-output`).textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ${postfix}`;

      this._editEvent.getElement().querySelector(`.event__destination-description`).textContent = changeDescription();
    }
  }

  setDefaultView() {
    if (this._eventContainer.contains(this._editEvent.getElement())) {
      this._eventContainer.replaceChild(this._event.getElement(), this._editEvent.getElement());
    }
  }
}

export default PointController;
