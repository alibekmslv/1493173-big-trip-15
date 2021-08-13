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
import { TRIP_EVENTS_COUNT } from './settings.js';
import { render, RenderPosition } from './utils/render.js';
import { generateTripEvent } from './mock/points.js';

const tripEvents = new Array(TRIP_EVENTS_COUNT).fill().map(generateTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const renderEvent = (tripEventsListElement, tripEvent) => {
  const tripEventItemComponent = new TripEventsItemView(tripEvent);
  const editEventComponent = new EditEventView(tripEvent);

  const replaceEventToForm = () => {
    tripEventsListElement.replaceChild(editEventComponent.getElement(), tripEventItemComponent.getElement());
  };

  const replaceFormToEvent = () => {
    tripEventsListElement.replaceChild(tripEventItemComponent.getElement(), editEventComponent.getElement());
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

  tripEventItemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  editEventComponent.getElement().querySelector('form').addEventListener('submit', onEditEventFormSubmit);
  editEventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onEditEventButtonClick);

  render (tripEventsListElement, tripEventItemComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripControlsNavigationElement, new TripTabsView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const tripInfoViewComponent = new TripInfoView();
render(tripMainElement, tripInfoViewComponent.getElement(), RenderPosition.AFTERBEGIN);

const tripInfoMainComponent = new TripInfoMainView(tripEvents);
render(tripInfoViewComponent.getElement(), tripInfoMainComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoViewComponent.getElement(), new TripInfoCostView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListComponent = new TripEventsListView();
render(tripEventsElement, tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < TRIP_EVENTS_COUNT; i++) {
  renderEvent(tripEventsListComponent.getElement(), tripEvents[i]);
}

render(tripEventsListComponent.getElement(), new AddEventView().getElement(), RenderPosition.AFTERBEGIN);
