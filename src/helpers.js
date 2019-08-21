/**
 * Функция рендера компонента
 *
 * @param {Element} container Контейнер, куда вставляется верстка
 * @param {String} layoutText Верстка
 * @param {String} position Место вставки. Соответствует insertAdjacentHTML
 */
export const renderComponent = (container, layoutText, position = `beforeend`) => {
  container.insertAdjacentHTML(position, layoutText);
};


export const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

/**
 * Получить строку месяца
 *
 * @param {Date} date Объект даты
 * @return {String} Первые три буквы названия месяца
 */
export const getMonthName = (date) => {
  return monthNames[date.getMonth()].toUpperCase().substr(0, 3);
};
