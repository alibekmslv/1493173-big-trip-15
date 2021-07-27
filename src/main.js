import { createTripTabsTemplate } from './view';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');

render(tripControlsNavigationElement, createTripTabsTemplate(), 'beforeend');
