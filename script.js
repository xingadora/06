let a;
let choiceTrue = null;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


const trainer = {
  get name() {
    return window.prompt('What is your name?')
  },
  choosePokemon: () => {
    a = window.prompt('Choose your Pokemon (Pikachu)').toLowerCase();
    switch (a) {
      case 'pikachu':
        choiceTrue = true;
        break;
      default:
        choiceTrue = false;
    };
  },
};





const pokemon = {
  pikachu: {
    name: 'Pikachu',
    id: 025,
    hp: 60,
    type: 'Electric',
    evoloution: 'Basic',
    retreatCost: 1,
    // retreatType: 'Normal',
    wknsRsts: {
      weakness: 'Strength',
      weaknessMulti: 2,
      resistanse: 'Metal',
      rstsSub: -20
    },
    attacks: {
      attack1: {
        name: 'Gnaw',
        type: 'Normal',
        description: '',
        energyCost: 1,
        baseDamage: '10',
        damage: randomNumber(8, 13),
        damageCritical: randomNumber(8, 13) * 2
      },
      attack2: {
        name: 'Thunder Jolt',
        type: ['normal', 'electric'],
        description: 'Flip a coin, if tails, this Pokemon does 10 damage to itself',
        energyCost: 2,
        baseDamage: '30',
        damage: randomNumber(25, 36),
        damageCritical: randomNumber(25, 36) * 2
      }
    },
  },
};