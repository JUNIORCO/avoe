import lolaImg from '../assets/lola.jpeg';
import peterImg from '../assets/peter.jpeg';
import rickImg from '../assets/rick.jpg';
import mauryImg from '../assets/maury.jpg';

export const CharacterIds = Object.freeze({
  lola: 'lola',
  peter: 'peter',
  rick: 'rick',
  maury: 'maury',
});

export const Characters = Object.freeze([
  {
    id: CharacterIds.lola,
    image: lolaImg,
  },
  {
    id: CharacterIds.peter,
    image: peterImg,
  },
  {
    id: CharacterIds.rick,
    image: rickImg,
  },
  {
    id: CharacterIds.maury,
    image: mauryImg,
  },
]);
