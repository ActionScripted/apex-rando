import { CHARACTERS } from './constants';


/**
 * TODO
 */
export function getCharacters(count) {
  let characters = [];
  let pool = [...CHARACTERS];

  if (count > pool.length) count = pool.length;

  for (let i = 0; i < count; i++) {
    const rand = Math.floor(Math.random() * pool.length);
    characters.push(...pool.splice(rand, 1));
  }

  return characters;
}


/**
 * TODO
*/
export function getDefaultPlayers(count) {
  let players = [];

  for (let i = 0; i < count; i++) {
    players[i] = `Player${i+1}`;
  }

  return players;
}
