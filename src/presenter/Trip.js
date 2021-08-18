import { updateItem } from '../utils/common.js';
import { render, RenderPosition } from '../utils/render.js';
import AddEventView from '../view/add-event.js';
import ListEmptyView from '../view/list-empty.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripSortView from '../view/trip-sort.js';
import EventPresenter from './Event.js';

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;

    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
    this._addEventComponent = new AddEventView();
    this._listEmptyComponent = new ListEmptyView();

    this._eventPresenterMap = new Map();

    this._handleTripEventChange = this._handleTripEventChange.bind(this);
    this._handleModChange = this._handleModChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderEvents();
  }

  _handleModChange() {
    this._eventPresenterMap.forEach((eventPresenter) => eventPresenter.resetView());
  }

  _handleTripEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenterMap.get(updatedEvent.id).init(updatedEvent);
  }

  _renderEvents() {
    if (this._tripEvents.length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderEventsList();
  }

  _renderEventsList() {
    render(this._tripEventsContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(this._tripEventsContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderTripEvents() {
    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderEvent(tripEvent) {
    const eventPresenter = new EventPresenter(this._tripEventsListComponent, this._handleTripEventChange, this._handleModChange);
    eventPresenter.init(tripEvent);
    this._eventPresenterMap.set(tripEvent.id, eventPresenter);
  }

  _renderEmptyList() {
    render(this._tripEventsContainer, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }
}
