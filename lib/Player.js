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

  /* Prototype is a better way to call the properties bc it is only creating the method once on the constructor itself. The alternative is `this.methodName` or `this.getStats` */

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
}

module.exports = Player;