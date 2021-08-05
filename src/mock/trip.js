import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const MIN_DESCRIPTION_SENTENCES = 1;
const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_PICTURES_QUANTITY = 1;
const MAX_PICTURES_QUANTITY = 5;
const MIN_PRICE_VALUE = 5;
const MAX_PRICE_VALUE = 300;

const sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const picturesUrls = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg', 'img/photos/5.jpg'];
const periods = ['hour', 'day', 'week', 'month'];

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateCity = () => {
  const cities = ['Amsterdam', 'Barcelona', 'Chamonix', 'Geneva', 'Moscow', 'New York', 'Paris', 'St. Petersburg'];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

let startDate;

const generateDateFrom = () => {
  dayjs.extend(utc);
  const randomPeriodIndex = getRandomInteger(0, periods.length - 1);

  let periodToAdd;

  switch (periods[randomPeriodIndex]) {
    case 'hour':
      periodToAdd = getRandomInteger(10, 300);
      break;
    case 'day':
      periodToAdd = getRandomInteger(1, 31);
      break;
    case 'week':
      periodToAdd = getRandomInteger(1, 4);
      break;
    case 'month':
      periodToAdd = getRandomInteger(1, 12);
      break;
    default:
      break;
  }

  const now = dayjs.utc();
  const dateFrom = now.add(periodToAdd, periods[randomPeriodIndex]).format();

  startDate = dateFrom;

  return dateFrom;
};

const generateDateTo = () => {
  dayjs.extend(utc);
  const randomPeriodIndex = getRandomInteger(0, periods.length - 1);

  let periodToAdd;

  switch (periods[randomPeriodIndex]) {
    case 'hour':
      periodToAdd = getRandomInteger(10, 300);
      break;
    case 'day':
      periodToAdd = getRandomInteger(1, 31);
      break;
    case 'week':
      periodToAdd = getRandomInteger(1, 4);
      break;
    case 'month':
      periodToAdd = getRandomInteger(1, 12);
      break;
    default:
      break;
  }

  const dateFromUTC = dayjs.utc(startDate);
  const dateTo = dateFromUTC
    .add(periodToAdd, periods[randomPeriodIndex])
    .format();
  startDate = null;

  return dateTo;
};

const generateDescription = () => {
  const randomSentencesQuantity = getRandomInteger(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES);

  const descriptionSentences = [];

  for (let i = 0; i < randomSentencesQuantity; i++) {
    const randomSentenceIndex = getRandomInteger(0, sentences.length - 1);

    if (descriptionSentences.includes(sentences[randomSentenceIndex])) {
      i--;
    } else {
      descriptionSentences.push(sentences[randomSentenceIndex]);
    }
  }

  return descriptionSentences.join(' ');
};

const generatePictures = () => {
  const randomPicturesQuantity = getRandomInteger(MIN_PICTURES_QUANTITY, MAX_PICTURES_QUANTITY);

  const generatedPictures = [];
  const picturesSet = new Set();

  for (let i = 0; i < randomPicturesQuantity; i++) {
    const randomPicturesUrlIndex = getRandomInteger(0, picturesUrls.length - 1);
    const randomSentenceIndex = getRandomInteger(0, sentences.length - 1);
    const randomPicture = picturesUrls[randomPicturesUrlIndex];

    if (picturesSet.has(randomPicture)) {
      i--;
    } else {
      picturesSet.add(randomPicture);
      generatedPictures.push({
        'src': randomPicture,
        'description': sentences[randomSentenceIndex],
      });
    }
  }

  return generatedPictures;
};

const generatePrice = () => getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE);

const generateFavorite = () => Boolean(getRandomInteger(0, 1));

const generateOffers = () => {
  const isOffers = Boolean(getRandomInteger(0, 1));

  if (!isOffers) {
    return [];
  }


};

export const generateTripEvent = () => ({
  'id': 0,
  'type': generateType(),
  'date_from': generateDateFrom(),
  'date_to': generateDateTo(),
  'destination': {
    'name': generateCity(),
    'description': generateDescription(),
    'pictures': generatePictures(),
  },
  'base_price': generatePrice(),
  'is_favorite': generateFavorite(),
  'offers': generateOffers(),
});
