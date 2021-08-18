import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripInfoView from './view/trip-info.js';
import TripInfoMainView from './view/trip-info-main.js';
import TripInfoCostView from './view/trip-info-cost.js';
import { TRIP_EVENTS_COUNT } from './settings.js';
import { render, RenderPosition } from './utils/render.js';
import { generateTripEvent } from './mock/points.js';
import TripPresenter from './presenter/Trip.js';

const tripEvents = new Array(TRIP_EVENTS_COUNT).fill().map(generateTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripInfoMainComponent = new TripInfoMainView(tripEvents);
render(tripInfoComponent, tripInfoMainComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripInfoCostView(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(tripEvents);
