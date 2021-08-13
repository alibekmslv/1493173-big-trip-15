import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripInfoView from './view/trip-info.js';
import TripInfoMainView from './view/trip-info-main.js';
import TripInfoCostView from './view/trip-info-cost.js';
import TripSortView from './view/trip-sort.js';
import TripEventsListView from './view/trip-events-list.js';
import TripEventsItemView from './view/trip-events-item.js';
import EditEventView from './view/edit-event.js';
import AddEventView from './view/add-event.js';
import ListEmptyView from './view/list-empty.js';
import { TRIP_EVENTS_COUNT } from './settings.js';
import { render, RenderPosition } from './utils/render.js';
import { generateTripEvent } from './mock/points.js';

const tripEvents = new Array(TRIP_EVENTS_COUNT).fill().map(generateTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const renderEvent = (tripEventsListElement, tripEvent) => {
  const tripEventItemComponent = new TripEventsItemView(tripEvent);
  const tripEventItemElement = tripEventItemComponent.getElement();
  const editEventComponent = new EditEventView(tripEvent);
  const editEventElement = editEventComponent.getElement();

  const replaceEventToForm = () => {
    tripEventsListElement.replaceChild(editEventElement, tripEventItemElement);
  };

  const replaceFormToEvent = () => {
    tripEventsListElement.replaceChild(tripEventItemElement, editEventElement);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  const closeEditEvent = () => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onEditEventFormSubmit = () => closeEditEvent();
  const onEditEventButtonClick = () => closeEditEvent();

  tripEventItemElement.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  editEventElement.querySelector('form').addEventListener('submit', onEditEventFormSubmit);
  editEventElement.querySelector('.event__rollup-btn').addEventListener('click', onEditEventButtonClick);

  render(tripEventsListElement, tripEventItemElement, RenderPosition.BEFOREEND);
};

render(tripControlsNavigationElement, new TripTabsView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const tripInfoComponent = new TripInfoView();
const tripInfoElement = tripInfoComponent.getElement();
render(tripMainElement, tripInfoElement, RenderPosition.AFTERBEGIN);

const tripInfoMainComponent = new TripInfoMainView(tripEvents);
render(tripInfoElement, tripInfoMainComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new TripInfoCostView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

if (tripEvents.length === 0) {
  render(tripEventsElement, new ListEmptyView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

  const tripEventsListComponent = new TripEventsListView();
  const tripEventsListElement = tripEventsListComponent.getElement();

  render(tripEventsElement, tripEventsListElement, RenderPosition.BEFOREEND);

  tripEvents.forEach((tripEvent) => renderEvent(tripEventsListElement, tripEvent));

  render(tripEventsListElement, new AddEventView().getElement(), RenderPosition.AFTERBEGIN);
}
