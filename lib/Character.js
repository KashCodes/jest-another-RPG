class Character {
  constructor(name = '') {
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  }


  // checks if player/enemy is alive. Is considered true/alive if above 0 health. 
  isAlive() {
    if (this.health === 0) {
      return false;
    }
    return true;
  }

  // returns player/enemy's health
  getHealth() {
    return `${this.name}'s health is now ${this.health}!`;
  }

  // returns random attack value + or - 5 strength. We've created variables for min and max to make this function a little easier to maintain.
  getAttackValue() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  }


  //returns player/enemy's health after it has been reduced. However if it reduces it in the negative past 0, it sets it back to 0. 
  reduceHealth(health) {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  }
}

module.exports = Character;