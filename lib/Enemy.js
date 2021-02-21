//Tells the page it requires the constructor functions to run.
const Potion = require('./Potion');
const Character = require('./Character');

// constructor function to create Enemy.
function Enemy(name, weapon) {
  // Provides a name, weapon, and 1 new potion.
  this.name = name;
  this.weapon = weapon;
  this.potion = new Potion();

  // Randomly gives enemy health between 85-95
  this.health = Math.floor(Math.random() * 10 + 85);
  // Randomly gives enemy strength between 5-10
  this.strength = Math.floor(Math.random() * 5 + 5);
  // Randomly gives enemy agility between 5-10
  this.agility = Math.floor(Math.random() * 5 + 5);

  // inherit prototype methods from Character here:
  Enemy.prototype = Object.create(Character.prototype);

  // generates a description including the enemy's name and weapon. 
  Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };

}

module.exports = Enemy;