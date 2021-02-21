//Tells the page it requires the constructor functions to run.
const Potion = require('./Potion');

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

  // returns enemy's health
  Enemy.prototype.getHealth = function() {
    return `The ${this.name}'s health is now ${this.health}!`;
  };
  
  // checks if enemy is alive. Is considered true/alive if above 0 health. 
  Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
      return false;
    }
    return true;
  };
  
  // returns random attack value + or - 5 strength. We've created variables for min and max to make this function a little easier to maintain.
  Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;
  
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  //returns enemy's health after it has been reduced. However if it reduces it in the negative past 0, it sets it back to 0.
  Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;
  
    if (this.health < 0) {
      this.health = 0;
    }
  };


  // generates a description including the enemy's name and weapon. 
  Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };

}

module.exports = Enemy;