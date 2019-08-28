const Position = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};

export const render = (container, elem, position = `beforeend`) => {
  switch (position) {
    case Position.AFTERBEGIN: {
      container.prepend(elem);
      break;
    }
    case Position.BEFOREEND: {
      container.append(elem);
      break;
    }
  }
};

export const unrender = (elem) => {
  if (elem) {
    elem.remove();
    elem.removeElement();
  }
};

export const createElement = (template) => {
  const newElem = document.createElement(`div`);
  newElem.innerHTML = template;

  return newElem.firstElementChild;
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
