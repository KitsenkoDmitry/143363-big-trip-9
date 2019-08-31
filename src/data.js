const EVENTS_COUNT = 10;
const MINUTES_FACTOR = 1000 * 60 * 60;
/**
 * Исходные данные
 */
const dataObj = {
  type: new Set([`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`]),
  title: [`airport`, `Geneva`, `Chamonix`, `hotel`, `Natural History Museum`],
  city: new Set([`Moscow`, `Paris`, `London`, `Los-Angeles`, `Murmansk`, `Lisbon`, `New York`]),
  photo: `http://picsum.photos/300/150`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  date: Date.now(),
  price: 200,
  offers: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`]
};

// Немного рандомных данных
const getTripPoint = () => ({
  type: getRandomItem(Array.from(dataObj.type)),
  title: getRandomItem(dataObj.title),
  city: getRandomItem(Array.from(dataObj.city)),
  photos: new Array(getRandomInt(6) + 1).fill(`${dataObj.photo}?random=${getRandomInt(10)}`),
  description: dataObj.description.split(`. `).sort(sortCb)
    .slice(dataObj.description.length - Math.floor(Math.random() * 3) - 1).join(`. `),
  date: dataObj.date + getRandomInt(31) * MINUTES_FACTOR * 24 + getRandomInt(24) * MINUTES_FACTOR,
  price: getRandomPrice(dataObj.price),
  offers: dataObj.offers.map((item) => ({
    title: item,
    price: getRandomOffersPrice(),
    checked: getRandomBool()
  })).sort(sortCb)
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

function sortCb() {
  return Math.random() - 0.5;
}
