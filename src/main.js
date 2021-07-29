import { createTripTabsTemplate } from './view/trip-tabs.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripInfoMainTemplate } from './view/trip-info-main.js';
import { createTripInfoCostTemplate } from './view/trip-info-cost.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createTripEventsListTemplate } from './view/trip-events-list.js';
import { createTripEventsItemTemplate } from './view/trip-events-item.js';
import { createEditEventTemplate } from './view/edit-event.js';
import { createAddEventTemplate } from './view/add-event.js';
import { TRIP_EVENTS_COUNT } from './settings.js';
import { render } from './utils/render.js';

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
