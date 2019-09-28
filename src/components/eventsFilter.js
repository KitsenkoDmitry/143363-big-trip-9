import AbstractComponent from './abstractComponent';

class EventsFilter extends AbstractComponent {
  constructor(filtersArr) {
    super();
    this._filtersArr = filtersArr;
  }

  getTemplate() {
    return `
      <div>
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${this._filtersArr.map((filter) => (`
            <div class="trip-filters__filter">
                <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.checked ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
              </div>
            `)).join(``)}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    `;
  }
}

export default EventsFilter;
