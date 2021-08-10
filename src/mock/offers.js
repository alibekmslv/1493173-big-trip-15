import { OFFERS_MAP } from './const.js';
import { getRandomInteger } from '../utils/random.js';

const generateOffers = () => Object.entries(OFFERS_MAP).map(([type, offers]) => ({
  type: type,
  offers: offers.map((offer) => ({ title: offer, price: getRandomInteger(30, 250) })),
}));

export const allOffers = generateOffers();
