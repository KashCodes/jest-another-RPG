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


// return checks for enemy's health
test("gets enemy's health value", () => {
  const enemy = new Enemy('goblin', 'sword');

  // The expect.stringContaining() method is an expect method preferred in this case because we might need flexibility to change how the enemy's health will be displayed.
  expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});


// Test to check if enemy is still alive. As long as it is not 0 it will be considered truthy and alive. 
test('checks if enemy is alive or not', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.isAlive()).toBeTruthy();

  enemy.health = 0;

  expect(enemy.isAlive()).toBeFalsy();
});


//verifies that a enemy's attack value is within range from the getAttackValue() prototype
test("gets enemy's attack value", () => {
  const enemy = new Enemy('goblin', 'sword');
  enemy.strength = 10;

  expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});


// test to handle the reduceHealth() method to see if the correct amount of health is being subtracted from the enemy health property.  
test("subtracts from enemy's health", () => {
  const enemy = new Enemy('goblin', 'sword');
  const oldHealth = enemy.health;

  //First test is to ensure it is reducing it by the number specified.
  enemy.reduceHealth(5);

  expect(enemy.health).toBe(oldHealth - 5);

  // The second is to ensure the health never goes into the negative.
  enemy.reduceHealth(99999);

  expect(enemy.health).toBe(0);
});

// Checks for enemy's description. Name and weapon. 
test('gets a description of the enemy', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
  expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});