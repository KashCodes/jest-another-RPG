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
    this.battle()
  };

  // Battle logic will be resposible for each individual turn in each round. 
  Game.prototype.battle = function() {
    // turns are based off who has the hgiher agility. If the player goes first you can choose to attack or use a potion. 
    if (this.isPlayerTurn) {
      inquirer
        .prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['Attack', 'Use potion']
        })
        .then(({ action }) => {
          //If they use a potion they will select which potion to use. 
          if (action === 'Use potion') {
            if (action === 'Use potion') {
              // if their inventory is empty they will get this message.
              if (!this.player.getInventory()) {
                console.log("You don't have any potions!");
                return;
              }
              // If it is not empty they will be presented with the inventory array and choose which potion to use.
              inquirer
                .prompt({
                  type: 'list',
                  message: 'Which potion would you like to use?',
                  name: 'action',
                  // choices are tracked and displayed with the inventory array index. Then they are removed using the Array.pototype.map() method. We added +1 to the index to make it more human readible as the arrazy index starts at zero.
                  choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                })
                // uses split() to remove the ":"
                .then(({ action }) => {
                  const potionDetails = action.split(': ');
                  
                  // then it subtracts 1 from the index to ensure it is properly being labeled in the array. 
                  this.player.usePotion(potionDetails[0] - 1);
                  // logs that the potion has been used. 
                  console.log(`You used a ${potionDetails[1]} potion.`);
                });
        
            }

            
          } else {
            //or they will attack
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);
    
            console.log(`You attacked the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());
          }
        });
    } else {
      // If it is the enemy's turn they will attack
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);
  
      console.log(`You were attacked by the ${this.currentEnemy.name}`);
      console.log(this.player.getHealth());
    }
  };


}

module.exports = Game;