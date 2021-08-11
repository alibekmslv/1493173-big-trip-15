import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getHumanizedDate = (date, format) => dayjs(date).format(format);

export const getTripDuration = (dateFrom, dateTo) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);

  dayjs.extend(duration);

  const tripDurationDate = dayjs.duration(dateEnd.diff(dateStart));
  const { days, hours, minutes } = tripDurationDate.$d;

  let tripDurationString = '';

  if (days) {
    tripDurationString += `${tripDurationDate.format('DD')}D `;
  }

  if (hours) {
    tripDurationString += `${tripDurationDate.format('HH')}H `;
  }

  if (minutes) {
    tripDurationString += `${tripDurationDate.format('mm')}M`;
  }

  return tripDurationString;
};

export const getTime = (date) => dayjs(date).format('HH:mm');

export const isOffers = (offers) => !!offers && !!offers.length;

export const isDescription = (destination) => !!destination.description;

export const isEventTypeChecked = (value, type) => value === type ? 'checked' : '';

export const isEventOfferChecked = (selectedOffers, offer) => {
  if (!selectedOffers) {
    return '';
  }

  return selectedOffers.some((item) => item.title === offer.title) ? 'checked' : '';
};

export const toKebabCaseName = (string) => string.split(' ').join('-').toLowerCase();
