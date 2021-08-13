import { getHumanizedDate, isDescription, isEventTypeChecked, isEventOfferChecked, toKebabCaseName, isOffers } from '../utils/points.js';
import { getOffersByType } from '../utils/offers.js';
import { allDestinations } from '../mock/destinations.js';
import { allOffers } from '../mock/offers.js';
import { createElement } from '../utils/render.js';

const createEventTypeItemTemplate = (eventType) => allOffers.map(({type}) => (`
  <div class="event__type-item">
    <input id="event-type-taxi-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isEventTypeChecked(eventType, type)}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-edit">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>
  `)).join('');

const createEventOffersTemplate = (type, selectedOffers) => {
  const offersByType = getOffersByType(allOffers, type);

  if (!isOffers(offersByType)) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersByType.map((offer) => (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${toKebabCaseName(offer.title)}" type="checkbox" name="${toKebabCaseName(offer.title)}" ${isEventOfferChecked(selectedOffers, offer)}>
        <label class="event__offer-label" for="${toKebabCaseName(offer.title)}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`)).join('')}
    </div>
  </section>`;
};

const createEventDestinationTemplate = (description) => (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
  </section>
`);

const createDestinationListTemplate = () => (`
  <datalist id="destination-list-edit">
    ${allDestinations.map((item) => `<option value="${item.name}"></option>`).join('')}
  </datalist>`);

const createEditEventTemplate = (tripEvent) => {
  const { id, type, dateFrom, dateTo, destination, basePrice, offers } = tripEvent;

  const eventTypeItemTemplate = createEventTypeItemTemplate(type);
  const eventOffersTemplate = createEventOffersTemplate(type, offers);
  const eventDestinationTemplate = isDescription(destination) ? createEventDestinationTemplate(destination.description) : '';
  const destinationListTemplate = createDestinationListTemplate();

  return `<li class="trip-events__item" data-id="${id}">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-edit">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-edit" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItemTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-edit">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-edit" type="text" name="event-destination" value="${destination.name}" list="destination-list-edit">
          ${destinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-edit">From</label>
          <input class="event__input  event__input--time" id="event-start-time-edit" type="text" name="event-start-time" value="${getHumanizedDate(dateFrom, 'DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-edit">To</label>
          <input class="event__input  event__input--time" id="event-end-time-edit" type="text" name="event-end-time" value="${getHumanizedDate(dateTo, 'DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-edit">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-edit" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${eventOffersTemplate}
        ${eventDestinationTemplate}
      </section>
    </form>
  </li>`;
};

export default class EditEvent {
  constructor(tripEvent) {
    this._element = null;
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createEditEventTemplate(this._tripEvent);
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
