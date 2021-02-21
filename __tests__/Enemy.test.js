//Tells the page it requires the constructor functions to run test. 
const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

// Pulls from __mocks__ folder instead for this Potion file. In it is a specific potion. 
jest.mock('../lib/Potion.js');


// Tests to ensure the enemy object is created with name, weapon, health, strength, agility, and potions
test('creates an enemy object', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.name).toBe('goblin');
  expect(enemy.weapon).toBe('sword');
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});