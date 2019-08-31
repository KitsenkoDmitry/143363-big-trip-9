import AbstractComponent from "./abstractComponent";

class Sort extends AbstractComponent {
  constructor(sortArr) {
    super();
    this._sortArr = sortArr;
  }

  getTemplate() {
    return `
      <div>
        <h2 class="visually-hidden">Trip events</h2>

        <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
          <span class="trip-sort__item trip-sort__item--day">Day</span>

          ${this._sortArr.map((item) => (`
            <div class="trip-sort__item trip-sort__item--${item.name}">
              <input id="sort-${item.name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${item.name}" ${item.checked ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${item.name}">
                ${item.name}
                ${item.name !== `event` ? `
                  <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                  </svg>` : ``}
              </label>
            </div>`)).join(``)}

          <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
        </form>
      </div>
    `;
  }
}

export default Sort;
