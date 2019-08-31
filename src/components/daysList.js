import AbstractComponent from './abstractComponent';

class DaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <ul class="trip-days"></ul>
    `;
  }
}

export default DaysList;
