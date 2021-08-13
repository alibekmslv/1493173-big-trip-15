import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { isOffers } from '../utils/points.js';
import { getOffersByType } from '../utils/offers.js';
import { getRandomInteger } from '../utils/random.js';
import { allDestinations } from './destinations.js';
import { allOffers } from './offers.js';

const MIN_PRICE_VALUE = 5;
const MAX_PRICE_VALUE = 300;
const MAX_ID_RANDOM_VALUE = 1000000;

const TIME_PERIODS = ['minute', 'hour', 'day', 'week'];

const generateType = () => {
  const types = allOffers.map(({type}) => type);
  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDate = (dateFrom) => {
  dayjs.extend(utc);

  const randomPeriodIndex = getRandomInteger(0, TIME_PERIODS.length - 1);

  let periodToAdd;
  let date;

  switch (TIME_PERIODS[randomPeriodIndex]) {
    case 'minute':
      periodToAdd = getRandomInteger(1, 120);
      break;
    case 'hour':
      periodToAdd = getRandomInteger(10, 300);
      break;
    case 'day':
      periodToAdd = getRandomInteger(1, 31);
      break;
    case 'week':
      periodToAdd = getRandomInteger(1, 4);
      break;
    default:
      break;
  }

  if (dateFrom) {
    date = dayjs.utc(dateFrom).add(periodToAdd, TIME_PERIODS[randomPeriodIndex]).format();
  } else {
    const now = dayjs.utc();
    date = now.add(periodToAdd, TIME_PERIODS[randomPeriodIndex]).format();
  }

  return date;
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, allDestinations.length - 1);

  return allDestinations[randomIndex];
};

const generatePrice = () => getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE);

const generateFavorite = () => Boolean(getRandomInteger(0, 1));

const generateOffers = (type) => {
  const willOffers = Boolean(getRandomInteger(0, 1));

  const offers = [];

  if (!willOffers) {
    return null;
  }

  const offersByType = getOffersByType(allOffers, type);

  if (!isOffers(offersByType)) {
    return offers;
  }

  const offersQuantity = getRandomInteger(1, 2);

  for (let i = 0; i < offersQuantity; i++) {
    const randomIndex = getRandomInteger(0, offersByType.length - 1);

    if (offers.some((offer) => offer.title === offersByType[randomIndex].title)) {
      i--;
    } else {
      offers.push(offersByType[randomIndex]);
    }
  }
  return offers;
};

const generateId = () => Math.random() * MAX_ID_RANDOM_VALUE;

export const generateTripEvent = () => {
  const type = generateType();
  const dateFrom = generateDate();
  const dateTo = generateDate(dateFrom);
  const offers = generateOffers(type);

  return  {
    id: generateId(),
    type: type,
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: generateDestination(),
    basePrice: generatePrice(),
    isFavorite: generateFavorite(),
    offers: offers,
  };
};
