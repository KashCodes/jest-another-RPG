//Tells the page it requires the constructor functions to run.
const Potion = require('./Potion');
const Character = require('./Character');

// constructor function to create Enemy.
class Enemy extends Character {
  constructor(name, weapon) {
    // call parent constructor here:
    super(name);

    this.weapon = weapon;
    this.potion = new Potion();
  }

  // generates a description including the enemy's name and weapon. 
  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  }
}

module.exports = Enemy;