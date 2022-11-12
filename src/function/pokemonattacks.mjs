import { pokemon } from "/src/class/newpokemon.mjs";
import { randomNumber } from "/src/function/randomnumbergen.mjs";
import moves from "/src/data/moves.json" assert { type: "json" };

function getAttacks(pokemonId) {
  let level = pokemon[pokemonId].level;
  let learnset = pokemon[pokemonId].learnset;

  let applicableAttacksDD = [];
  let attacks = [];

  class Attack {
    constructor(name, type, category, power, accuracy, pp, effect) {
      this.name = name;
      this.type = type;
      this.category = category;
      this.power = power;
      this.accuracy = accuracy;
      this.pp = pp;
      this.effect = effect;
    }
  }

  for (const move in learnset) {
    if (move <= level) {
      applicableAttacksDD.push(learnset[move]);
    }
  }

  let applicableAttacks = [...new Set(applicableAttacksDD)];

  applicableAttacks.forEach(() => {
    if (applicableAttacks.length > 4) {
      let random = randomNumber(1, applicableAttacks.length - 2);
      applicableAttacks.splice(random, 1);
      if (applicableAttacks[0] === applicableAttacks[1]) {
        applicableAttacks.splice(1, 1);
      }
    }
  });

  for (const move in moves) {
    applicableAttacks.forEach((element) => {
      if (element === moves[move].Name) {
        element = moves[move];
        attacks.push(
          new Attack(
            element.Name,
            element.Type,
            element.Cat,
            element.Power,
            element.Acc,
            element.PP,
            element.Effect
          )
        );
      }
    });
  }

  return attacks;
}
