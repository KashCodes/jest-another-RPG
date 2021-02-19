////Tells the page it requires the Potion.js constructor functions to run test. 
const Potion = require('../lib/Potion.js');

// Tests to ensure constuctor function creates a health potion with a name and a value. 
test('creates a health potion object', () => {
  // `new` ensures it is always a new object, this one is specifically a health potion.
  const potion = new Potion('health');

  // potion created has to be named health.
  expect(potion.name).toBe('health');
  // value assign can be any number.
  expect(potion.value).toEqual(expect.any(Number));
});

// Tests to ensure constuctor function creates a random potion object other than a health potion.  
test('creates a random potion object', () => {
  const potion = new Potion();

  // 3 potions are in the string, must equal one of them. 
  expect(potion.name).toEqual(expect.any(String));
  //This can have any amount of potions as long as there is more than 0.
  expect(potion.name.length).toBeGreaterThan(0);
  // the potion value you be equal to any number. 
  expect(potion.value).toEqual(expect.any(Number));
});
