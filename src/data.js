const getTripPoint = () => ({
  type: Array.from(new Set([`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`]))[Math.floor(Math.random() * 11)],
  title: [`airport`, `Geneva`, `Chamonix`, `hotel`, `Natural History Museum`][Math.floor(Math.random() * 5)],
  city: Array.from(new Set([`Moscow`, `Paris`, `London`, `Los-Angeles`, `Murmansk`, `Lisbon`, `New York`]))[Math.floor(Math.random() * 7)],
  photos: new Array(Math.floor(Math.random() * 6) + 1).fill(`http://picsum.photos/300/150?random=${Math.floor(Math.random() * 10)}`),
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`
    .split(`. `)
    .sort(() => Math.random() - 0.5)
    .slice(11 - Math.floor(Math.random() * 3) - 1)
    .join(`. `),
  date: Date.now() + Math.floor(Math.random() * 31) * 1000 * 60 * 60 * 24 +
    Math.floor(Math.random() * 24) * 1000 * 60 * 60,
  price: Math.floor(Math.random() * 190 + 10),
  offers: [
    {
      title: `Add luggage`,
      price: Math.floor(Math.random() * 8 + 1) * 5,
      checked: false,
    },
    {
      title: `Switch to comfort class`,
      price: Math.floor(Math.random() * 8 + 1) * 5,
      checked: false,
    },
    {
      title: `Add meal`,
      price: Math.floor(Math.random() * 8 + 1) * 5,
      checked: Boolean(Math.round(Math.random())),
    },
    {
      title: `Choose seats`,
      price: Math.floor(Math.random() * 8 + 1) * 5,
      checked: false,
    },
    {
      title: `Travel by train`,
      price: Math.floor(Math.random() * 8 + 1) * 5,
      checked: Boolean(Math.round(Math.random())),
    }
  ]
    .sort(() => Math.random() - 0.5)
  // .slice(5 - Math.floor(Math.random() * 3))
});

const EVENTS_COUNT = 4;
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
