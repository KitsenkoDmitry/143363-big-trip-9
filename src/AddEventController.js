import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import {destTypes} from './constants';
import moment from 'moment';
import NewEvent from './components/newEvent';
import {render} from './utils';

class AddEventController {
  constructor(container, onDataChange) {
    this._newEvent = new NewEvent();
    this._container = container;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDataChange = onDataChange;

    this._init();
  }

  _init() {
    render(this._container, this._newEvent.getElement());

    this._newEvent.getElement().addEventListener(`submit`, this._onFormSubmit);

    this._newEvent.getElement().querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`change`, this._onTypeChange);
    });

    this._newEvent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      this.hideNewEventForm();
      this._onDataChange(null, null);
    });

    const flatpickrOptions = {
      altFormat: `j/m/y H:i`,
      altInput: true,
      dateFormat: `Z`,
      enableTime: true,
      allowInput: true,
      defaultDate: new Date()
    };

    flatpickr(this._newEvent.getElement().querySelector(`#new-event-start-time-1`), flatpickrOptions);

    flatpickr(this._newEvent.getElement().querySelector(`#new-event-end-time-1`), flatpickrOptions);
  }

  showNewEventForm() {
    this._newEvent.getElement().classList.remove(`visually-hidden`);
  }

  hideNewEventForm() {
    this._newEvent.getElement().classList.add(`visually-hidden`);
  }

  _onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const entry = {
      type: formData.getAll(`event-type`)[0],
      city: formData.get(`event-destination`),
      date: +moment(new Date(formData.get(`event-start-time`))).format(`x`),
      duration: +moment(new Date(formData.get(`event-end-time`))).format(`x`) - moment(new Date(formData.get(`event-start-time`))).format(`x`),
      price: formData.get(`event-price`),
      offers: [],
      photos: [],
      description: ``
    };

    this._onDataChange(entry, null);
  }

  _onTypeChange(e) {
    if (e.target.checked) {
      const type = e.target.value;
      const postfix = type === destTypes.CHECK || type === destTypes.REST || type === destTypes.SIGHT ? `at` : `to`;
      this._newEvent.getElement().querySelector(`.event__type-icon`).src = `img/icons/${type}.png`;
      this._newEvent.getElement().querySelector(`.event__type-output`).textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ${postfix}`;
    }
  }
}

export default AddEventController;
