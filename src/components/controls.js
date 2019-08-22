export const renderControls = (controlsArr) =>
  `<h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs trip-tabs">
    ${controlsArr.map((control) => {
    return `<a class="trip-tabs__btn ${control.isActive ? `trip-tabs__btn--active` : ``}" href="#">${control.name}</a>`;
  }).join(``)}
  </nav>`;
