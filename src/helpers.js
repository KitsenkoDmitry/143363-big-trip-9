/**
 * Функция рендера компонента
 *
 * @param {Element} container Контейнер, куда вставляется верстка
 * @param {String} layoutText Верстка
 * @param {String} position Место вставки. Соответствует insertAdjacentHTML
 */
export const renderComponent = (container, layoutText, position) => {
  container.insertAdjacentHTML(position, layoutText);
};
