// ES6 class constructor function
class Potion {
  constructor(name) {
      // Can have one of 3 types of potion created at random.
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
  

    //if it is a health potion it provides a random health amount its value is a number between 30 and 40.
    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      //if not a health potion, so strength or agility, it gives its value a random number between 7 and 12.
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
}

//allows the constructor function to be exported
module.exports = Potion;