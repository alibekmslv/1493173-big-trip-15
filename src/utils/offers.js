export const getOffersByType = (allOffers, type) => allOffers.filter((item) => item.type === type)[0].offers;
