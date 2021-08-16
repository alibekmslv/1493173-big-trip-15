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
import { render, RenderPosition, replace } from './utils/render.js';
import { generateTripEvent } from './mock/points.js';

const tripEvents = new Array(TRIP_EVENTS_COUNT).fill().map(generateTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const renderEvent = (tripEventsListComponent, tripEvent) => {
  const tripEventItemComponent = new TripEventsItemView(tripEvent);
  const editEventComponent = new EditEventView(tripEvent);

  const replaceEventToForm = () => {
    replace(editEventComponent, tripEventItemComponent);
  };

  const replaceFormToEvent = () => {
    replace(tripEventItemComponent, editEventComponent);
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

  tripEventItemComponent.setExpandButtonClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  editEventComponent.setFormSubmitHandler(closeEditEvent);
  editEventComponent.setCollapseButtonClickHandler(closeEditEvent);

  render(tripEventsListComponent, tripEventItemComponent, RenderPosition.BEFOREEND);
};

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripInfoMainComponent = new TripInfoMainView(tripEvents);
render(tripInfoComponent, tripInfoMainComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripInfoCostView(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

if (tripEvents.length === 0) {
  render(tripEventsElement, new ListEmptyView(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortView(), RenderPosition.BEFOREEND);

  const tripEventsListComponent = new TripEventsListView();

  render(tripEventsElement, tripEventsListComponent, RenderPosition.BEFOREEND);

  tripEvents.forEach((tripEvent) => renderEvent(tripEventsListComponent, tripEvent));

  render(tripEventsListComponent, new AddEventView().getElement(), RenderPosition.AFTERBEGIN);
}
