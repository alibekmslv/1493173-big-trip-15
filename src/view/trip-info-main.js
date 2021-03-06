import { getTripRouteName } from '../utils/trip.js';
import AbstractView from './abstract.js';

export const createTripInfoMainTemplate = (tripEvents) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${getTripRouteName(tripEvents)}</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`
);

export default class TripInfoMain extends AbstractView {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._tripEvents);
  }
}
