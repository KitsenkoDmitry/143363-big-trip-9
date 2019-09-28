import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Emoji = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳`,
  transport: `🚆`,
  drive: `🚗`,
  flight: `✈️`,
  [`check-in`]: `🏨`,
  sightseeing: `🏛`,
  restaurant: `🍴`,
};
const HOUR_FACTOR = 1000 * 60 * 60;

const TRANSPORT = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

const arrToUpperCase = (arr) => {
  return arr.map((item) => item.toUpperCase());
};

class StatisticController {
  constructor(stats, events) {
    this._stats = stats;
    this._moneyCtx = this._stats.getElement().querySelector(`.statistics__chart--money`);
    this._transportCtx = this._stats.getElement().querySelector(`.statistics__chart--transport`);
    this._timeCtx = this._stats.getElement().querySelector(`.statistics__chart--time`);

    this._events = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._init();
  }

  _init() {
    this._moneyChart = this._drawChart(
        `Money`,
        this._moneyCtx,
        (value) => (`€ ${value}`),
        this._getDataForMoneyChart);

    this._transportChart = this._drawChart(
        `Transport`,
        this._transportCtx,
        (value) => (`${value}x`),
        this._getDataForTransportChart);

    this._timeChart = this._drawChart(
        `Time spent`,
        this._timeCtx,
        (value) => (`${value}H`),
        this._getDataForTimeChart);
  }

  _getDataForMoneyChart(events) {
    const data = {};
    events.forEach((event) => {
      data[event.type] = data[event.type] ? data[event.type] + event.price : event.price;
    });
    return data;
  }

  _getDataForTransportChart(events) {
    const data = {};
    events.forEach((event) => {
      if (TRANSPORT.find((item) => item === event.type)) {
        data[event.type] = data[event.type] ? data[event.type] + 1 : 1;
      }
    });
    return data;
  }

  _getDataForTimeChart(events) {
    const data = {};
    events.forEach((event) => {
      data[event.type] = data[event.type] ? data[event.type] + (Math.ceil(event.duration / HOUR_FACTOR)) : (Math.ceil(event.duration / HOUR_FACTOR));
    });

    return data;
  }

  _prepareDataForChart(getDataFunc) {
    const data = getDataFunc(this._events);
    const labels = Object.keys(data).sort((a, b) => (data[b] - data[a]));
    const preparedData = labels.map((label) => (data[label]));
    const emojiLabels = arrToUpperCase(this._addEmojy(labels));

    return [emojiLabels, preparedData];
  }

  _addEmojy(labels) {
    const emojiLabels = labels.map((label) => (
      Emoji[label] ? `${Emoji[label]} ${label}` : label
    ));
    return emojiLabels;
  }

  _drawChart(title, chartCtx, formatterCb, getDataFunc) {
    const [labels, data] = this._prepareDataForChart(getDataFunc);

    return new Chart(chartCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#fff`,
        }]
      },
      options: {
        responsive: false,
        title: {
          text: title.toUpperCase(),
          display: true,
          fontSize: 25,
          fontColor: `#000000`,
          position: `left`,
        },
        plugins: {
          datalabels: {
            formatter: formatterCb,
            font: {
              size: 14
            },
            align: `left`,
            anchor: `end`,
            clamp: true,
            color: `#000`,
          }
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              beginAtZero: true
            },
            barPercentage: 1,
            categoryPercentage: 0.9,
          }]
        }
      }
    });
  }
}

export default StatisticController;
