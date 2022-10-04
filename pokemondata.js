import { randomNumber } from "./randomnumbergen";

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