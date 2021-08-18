import { remove, render, RenderPosition, replace } from '../utils/render.js';
import EditEventView from '../view/edit-event.js';
import TripEventsItemView from '../view/trip-events-item.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Event {
  constructor(tripEventsListComponent, changeData, changeMod) {
    this._tripEventsListComponent = tripEventsListComponent;
    this._changeData = changeData;
    this._changeMod = changeMod;

    this._tripEventItemComponent = null;
    this._editEventComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleExpandButtonClick = this._handleExpandButtonClick.bind(this);
    this._closeEditEvent = this._closeEditEvent.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevTripEventItemComponent = this._tripEventItemComponent;
    const prevEditEventComponent = this._editEventComponent;

    this._tripEventItemComponent = new TripEventsItemView(this._tripEvent);
    this._editEventComponent = new EditEventView(this._tripEvent);

    this._tripEventItemComponent.setExpandButtonClickHandler(this._handleExpandButtonClick);
    this._editEventComponent.setFormSubmitHandler(this._closeEditEvent);
    this._editEventComponent.setCollapseButtonClickHandler(this._closeEditEvent);
    this._tripEventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevTripEventItemComponent === null || prevEditEventComponent === null) {
      render(this._tripEventsListComponent, this._tripEventItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripEventItemComponent, prevTripEventItemComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editEventComponent, prevEditEventComponent);
    }

    remove(prevTripEventItemComponent);
    remove(prevEditEventComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({}, this._tripEvent, { isFavorite: !this._tripEvent.isFavorite }),
    );
  }

  _replaceEventToForm() {
    replace(this._editEventComponent, this._tripEventItemComponent);
    this._changeMod();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._tripEventItemComponent, this._editEventComponent);
    document.removeEventListener('keydown', this._onEscKeydown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToEvent();
      document.removeEventListener('keydown', this._onEscKeydown);
    }
  }

  _closeEditEvent() {
    this._replaceFormToEvent();
    document.removeEventListener('keydown', this._onEscKeydown);
  }

  _handleExpandButtonClick() {
    this._replaceEventToForm();
    document.addEventListener('keydown', this._onEscKeydown);
  }
}
