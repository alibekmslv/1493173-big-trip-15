export const getTripRouteName = (tripEvents) => {
  const separator = '&mdash;';

  if (tripEvents.length === 0) {
    return 'No events';
  }

  if (tripEvents.length > 3) {
    return `${tripEvents[0].destination.name} ${separator}...${separator} ${tripEvents[tripEvents.length - 1].destination.name}`;
  }

  if (tripEvents.length <= 3) {
    return tripEvents.map((point) => point.destination.name).join(` ${separator} `);
  }
};
