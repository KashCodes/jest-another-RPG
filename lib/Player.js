//requires the Potion.js constructor function to work.
const Potion = require('../lib/Potion');


// Creates a player constructor function the name parameter sets a default empty string if no name is provided.
function Player(name = '') {
  this.name = name;

  // health random between 95-105
  this.health = Math.floor(Math.random() * 10 + 95);
  // strength random between 7-12
  this.strength = Math.floor(Math.random() * 5 + 7);
  //agility random between 7-12
  this.agility = Math.floor(Math.random() * 5 + 7);
  // gives new health potion from Potion.js constuctor function
  this.inventory = [new Potion('health'), new Potion()];

  /* Prototype is a better way to call the properties bc it is only creating the method once on the constructor itself. The alternative is `this.methodName` or `this.getStats` --- also don't use arrow functions when calling to a prototype function. They change what this means. Specifically, they bind this to the parent lexical scope instead of the scope of the method. In Node.js, the global this is just an empty object (e.g., {}). Thus, all of these properties become undefined. */

  // returns an object with various player properties
  Player.prototype.getStats = function() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  };

  // returns the inventory array or false if empty
  Player.prototype.getInventory = function() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };

  // returns players health
  Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
  };

  // returns if player is alive with health above 0.
  Player.prototype.isAlive = function() {
    if (this.health === 0) {
      return false;
    }
    return true;
  };

  //returns players health after it has been reduced. However if it reduces it in the negative past 0, it sets it back to 0. 
  Player.prototype.reduceHealth = function(health) {
    this.health -= health;
  
    if (this.health < 0) {
      this.health = 0;
    }
  };

  // returns random attack value + or - 5 strength. We've created variables for min and max to make this function a little easier to maintain.
  Player.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

// pushes new potions to the inventory array
Player.prototype.addPotion = function(potion) {
  this.inventory.push(potion);
};

// ensures that it removes the correct potion from the player inventory. Keeping track of the old inventory length so that we can make sure the length decreases and doesn't go below zero. We will use the index of the Potion to keep track of which one has been selected.
Player.prototype.usePotion = function(index) {
  //The .splice() method removes items from an array and returns the removed item(s) as a new array. Thus, two things are happening here: the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array, then the Potion at index [0] of this "removed items" array is saved in a potion variable.
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
      break;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;
  }
};


}

module.exports = Player;