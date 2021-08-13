import AbstractView from './abstract.js';

const createTripInfoCostTemplate = () => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`
);

export default class TripInfoCost extends AbstractView {
  getTemplate() {
    return createTripInfoCostTemplate();
  }
}
