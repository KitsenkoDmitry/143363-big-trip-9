import AbstractComponent from "./abstractComponent";

class Controls extends AbstractComponent {
  constructor(controlsArr) {
    super();
    this._controlsArr = controlsArr;
  }

  getTemplate() {
    return `
      <div>
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs trip-tabs">
          ${this._controlsArr.map((control) => (`<a class="trip-tabs__btn ${control.isActive ? `trip-tabs__btn--active` : ``}" href="#">${control.name}</a>`)).join(``)}
        </nav>
      </div>
    `;
  }
}

export default Controls;
