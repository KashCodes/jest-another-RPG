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

// The getHealth() method will ensure it returns the players health.
test("gets player's health value", () => {
  const player = new Player('Dave');

  // The expect.stringContaining() method is an expect method preferred in this case because we might need flexibility to change how the player's health will be displayed.
  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// Test to check if player is still alive. As long as it is not 0 it will be considered truthy and alive. 
test('checks if player is alive or not', () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

// test to handle the reduceHealth() method to see if the correct amount of health is being subtracted from the Player health property.   
test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;

  //First test is to ensure it is reducing it by the number specified.
  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  // The second is to ensure the health never goes into the negative.
  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});

//verifies that a player's attack value is within range from the getAttackValue() prototype
test("gets player's attack value", () => {
  const player = new Player('Dave');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// verifies that a potion was added correctly w/ addPotion()
test('adds a potion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// ensures that usePotion() removes the correct Potion from the Player inventory.We will use the index of the Potion to keep track of which one has been selected.
test('uses a potion from inventory', () => {
  const player = new Player('Dave');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});