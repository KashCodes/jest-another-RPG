//Tells the page it requires the constructor functions to run test. 
const Player = require('../lib/Player');
const Potion = require('../lib/Potion.js');

// Pulls from __mocks__ folder instead for this Potion file. In it is a specific potion. 
jest.mock('../lib/Potion');

//Tests play constructor function to ensure it creates a player object with a name and 4 additional properties. 
test('creates a player object', () => {
  // `new` always creates new player object. 
  const player = new Player('Dave');

  // name will always be dave
  expect(player.name).toBe('Dave');
  // health is equal to any number
  expect(player.health).toEqual(expect.any(Number));
  // strength is equal to any number
  expect(player.strength).toEqual(expect.any(Number));
  // agility is equal to any number
  expect(player.agility).toEqual(expect.any(Number));
  // inventory is expected to be an array with any objects specified.
  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});

// Here, we're checking that player.getStats() returns an object with four specific properties.
test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  // all of these are checking to ensure the 4 properties are created and have stats assigned.
  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});



//The getInventory() method will return an array of Potion objects or return false if the inventory is empty.
test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});