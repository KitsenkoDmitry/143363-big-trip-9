const EVENTS_COUNT = 5;
const HOUR_FACTOR = 1000 * 60 * 60;
const MINUT_FACTOR = 1000 * 60;
/**
 * Исходные данные
 */
const dataObj = {
  type: new Set([`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`]),
  city: new Set([`Moscow`, `Paris`, `London`, `Los-Angeles`, `Murmansk`, `Lisbon`, `New York`]),
  photo: `http://picsum.photos/300/150`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  date: Date.now(),
  price: 200,
  offers: [
    {
      title: `Add luggage`,
      type: `luggage`,
      price: getRandomOffersPrice(),
      checked: getRandomBool(),
    },
    {
      title: `Switch to comfort class`,
      type: `comfort`,
      price: getRandomOffersPrice(),
      checked: getRandomBool(),
    },
    {
      title: `Add meal`,
      type: `meal`,
      price: getRandomOffersPrice(),
      checked: getRandomBool(),
    },
    {
      title: `Choose seats`,
      type: `seats`,
      price: getRandomOffersPrice(),
      checked: getRandomBool(),
    },
    {
      title: `Travel by train`,
      type: `train`,
      price: getRandomOffersPrice(),
      checked: getRandomBool(),
    },
  ]
};

// Немного рандомных данных
const getTripPoint = () => ({
  type: getRandomItem(Array.from(dataObj.type)),
  city: getRandomItem(Array.from(dataObj.city)),
  photos: new Array(getRandomInt(6) + 1).fill(`${dataObj.photo}?random=${getRandomInt(10)}`),
  description: changeDescription(),
  date: dataObj.date + addRandomTime(),
  duration: HOUR_FACTOR * (getRandomInt(6) + 1) + MINUT_FACTOR * getRandomInt(59),
  price: getRandomPrice(dataObj.price),
  offers: dataObj.offers
});

export const eventsArray = new Array(EVENTS_COUNT).fill(``).map(getTripPoint).sort((a, b) => {
  return a.date - b.date;
});

export const eventsFiltersArray = [
  {
    name: `everything`,
    checked: true,
  },
  {
    name: `future`,
    checked: false,
  },
  {
    name: `past`,
    checked: false,
  }
];

export const controlsArr = [
  {
    name: `Table`,
    isActive: true,
  },
  {
    name: `Stats`,
    isActive: false,
  },
];

export const sortArr = [
  {
    name: `event`,
    checked: true,
  },
  {
    name: `time`,
    checked: false,
  },
  {
    name: `price`,
    checked: false,
  }
];

export function changeDescription() {
  return dataObj.description.split(`. `).sort(sortCb)
    .slice(dataObj.description.split(`. `).length - Math.floor(Math.random() * 3) - 1).join(`. `);
}

// разные мелкие вспомагательные функции
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice(limit) {
  return Math.floor(Math.random() * (limit - 10) + 10);
}

function getRandomInt(int) {
  return Math.floor(Math.random() * int);
}

function getRandomBool() {
  return Boolean(Math.round(Math.random()));
}

function getRandomOffersPrice() {
  return Math.floor(Math.random() * 8 + 1) * 5;
}

function addRandomTime() {
  return getRandomInt(31) * HOUR_FACTOR * 24 + getRandomInt(24) * HOUR_FACTOR;
}

function sortCb() {
  return Math.random() - 0.5;
}
