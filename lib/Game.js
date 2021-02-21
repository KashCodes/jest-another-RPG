// connects require constructor functions and modules 
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// constructor function for the game logic
function Game() {
  // current player and enemy will be defined in initializeGame(). 
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;

  // Will define player and enemy objects
  Game.prototype.initializeGame = function() {

    //Populates enemy array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    // keeps track of which enemy is currently fighting.
    this.currentEnemy = this.enemies[0];

    // will prompt users to enter input to define the player name
    inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);

      // test the object creation
      console.log(this.currentEnemy, this.player,);

      //initialize new battle callback
      this.startNewBattle()
    });
  };

  // initializes new battle and determines who will attack first based off higher agility.
  Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    // logs players stats in a table
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    // logs enemy description
    console.log(this.currentEnemy.getDescription());

    // start new battle callback - responsible for each individual turn in each round. 
    startNewBattle()
  };

  


}

module.exports = Game;