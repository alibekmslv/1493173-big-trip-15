import { getRandomInteger } from '../utils/random.js';
import { CITIES, DESCRIPTION_SENTENCES } from './const.js';

const MIN_DESCRIPTION_SENTENCES = 1;
const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_PICTURES_QUANTITY = 1;
const MAX_PICTURES_QUANTITY = 5;

const generateDescription = () => {
  const isDescription = getRandomInteger(0, 5);
  const descriptionSentences = [];

  if (!isDescription) {
    return null;
  }

  const randomSentencesQuantity = getRandomInteger(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES);

  for (let i = 0; i < randomSentencesQuantity; i++) {
    const randomSentenceIndex = getRandomInteger(0, DESCRIPTION_SENTENCES.length - 1);

    if (descriptionSentences.includes(DESCRIPTION_SENTENCES[randomSentenceIndex])) {
      i--;
    } else {
      descriptionSentences.push(DESCRIPTION_SENTENCES[randomSentenceIndex]);
    }
  }

  return descriptionSentences.join(' ');
};

const generatePictures = () => {
  const randomPicturesQuantity = getRandomInteger(MIN_PICTURES_QUANTITY, MAX_PICTURES_QUANTITY);

  const generatedPictures = [];

  for(let i = 0; i < randomPicturesQuantity; i++) {
    const randomSentenceIndex = getRandomInteger(0, DESCRIPTION_SENTENCES.length - 1);

    generatedPictures.push({
      src: `http://picsum.photos/248/152?${Math.random()}`,
      description: DESCRIPTION_SENTENCES[randomSentenceIndex],
    });
  }

  return generatedPictures;
};

const generateDestinations = () => CITIES.map((city) => ({
  name: city,
  description: generateDescription(),
  pictures: generatePictures(),
}));

export const allDestinations = generateDestinations();
