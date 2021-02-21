//requires the Potion.js constructor function to work.
const Potion = require('../lib/Potion');
const Character = require('./Character');


// Creates a player constructor function the name parameter sets a default empty string if no name is provided.
class Player extends Character {
  constructor(name = '') {
    // call parent constructor here:
    super(name);

    this.name = name;

    // gives new health potion from Potion.js constuctor function
    this.inventory = [new Potion('health'), new Potion()];
  }


  // returns an object with various player properties
  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }

  // returns the inventory array or false if empty
  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }



  // pushes new potions to the inventory array
  addPotion(potion) {
    this.inventory.push(potion);
  }

  // ensures that it removes the correct potion from the player inventory. Keeping track of the old inventory length so that we can make sure the length decreases and doesn't go below zero. We will use the index of the Potion to keep track of which one has been selected.
  usePotion(index) {
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
  }

}

module.exports = Player;