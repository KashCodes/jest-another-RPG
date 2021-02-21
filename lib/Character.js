function Character() {}

// checks if player/enemy is alive. Is considered true/alive if above 0 health. 
Character.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};

// returns player/enemy's health
Character.prototype.getHealth = function() {
  return `${this.name}'s health is now ${this.health}!`;
};

// returns random attack value + or - 5 strength. We've created variables for min and max to make this function a little easier to maintain.
Character.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};


//returns player/enemy's health after it has been reduced. However if it reduces it in the negative past 0, it sets it back to 0. 
Character.prototype.reduceHealth = function(health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

console.log(new Character().getHealth());

module.exports = Character;