import { createElement } from '../utils/render.js';
import { getTripRouteName } from '../utils/trip.js';

export const createTripInfoMainTemplate = (tripEvents) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${getTripRouteName(tripEvents)}</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`
);

export default class TripInfoMain {
  constructor(tripEvents) {
    this._element = null;
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._tripEvents);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
