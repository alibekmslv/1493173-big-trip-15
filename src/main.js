import {
  createTripTabsTemplate,
  createTripFiltersTemplate,
  createTripInfoTemplate,
  createTripInfoMainTemplate,
  createTripInfoCostTemplate,
  createTripSortTemplate,
  createTripEventsListTemplate,
  createTripEventsItemTemplate,
  createEditEventTemplate,
  createAddEventTemplate
} from './view';

const TRIP_EVENTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, createTripTabsTemplate(), 'beforeend');
render(tripControlsFiltersElement, createTripFiltersTemplate(), 'beforeend');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createTripInfoMainTemplate(), 'afterbegin');
render(tripInfoElement, createTripInfoCostTemplate(), 'beforeend');

const tripEventsElement = document.querySelector('.trip-events');

render(tripEventsElement, createTripSortTemplate(), 'afterbegin');
render(tripEventsElement, createTripEventsListTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

for (let i = 0; i < TRIP_EVENTS_COUNT; i++) {
  render(tripEventsListElement, createTripEventsItemTemplate(), 'beforeend');
}

render(tripEventsListElement, createEditEventTemplate(), 'afterbegin');
render(tripEventsListElement, createAddEventTemplate(), 'afterbegin');
