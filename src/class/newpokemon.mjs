import stats from "/src/data/pokemonstats.json" assert { type: "json" };
import { randomNumber } from "/src/function/randomnumbergen.js";
import { damageCalculation } from "/src/function/damagecalculator.js";
import {
  getWeaknesses,
  getStrengths,
  getImmunities,
} from "/src/function/typescalculator.js";
import { getLearnSet } from "/src/function/getlearnset.js";
import { getLevel, getGender, getShiny, getHPIV, getStat } from "/src/function/getStats.js";

export class pokemon {
  get HPIV() {
    return getHPIV(this.attackIV, this.defenceIV, this.spAtkIV, this.spDefIV);
  }
  get HP() {
    return getStat(this._hp, this.HPIV, this.level, "hp");
  }
  get attack() {
    return getStat(this._attack, this.attackIV, this.level, "attack");
  }
  get defence() {
    return getStat(this._defence, this.defenceIV, this.level, "defence");
  }
  get spAtk() {
    return getStat(this._spAtk, this.spAtkIV, this.level, "spAtk");
  }
  get spDef() {
    return getStat(this._spDef, this.spDefIV, this.level, "spDef");
  }
  get speed() {
    return getStat(this._speed, this.speedIV, this.level, "speed");
  }

  constructor(
    id,
    name,
    hp,
    type1,
    type2,
    attack,
    defence,
    spAtk,
    spDef,
    speed,
    total
  ) {
    this.id = id;
    this.name = name;
    this._hp = hp;
    this.type1 = type1;
    this.type2 = type2;
    this._attack = attack;
    this.attackIV = randomNumber(0, 15);
    this._defence = defence;
    this.defenceIV = randomNumber(0, 15);
    this._spAtk = spAtk;
    this.spAtkIV = randomNumber(0, 15);
    this._spDef = spDef;
    this.spDefIV = randomNumber(0, 15);
    this._speed = speed;
    this.speedIV = randomNumber(0, 15);
    this.total = total;
    this.level = getLevel();
    this.isShiny = getShiny();
    this.gender = getGender(id);
    this.weaknesses = getWeaknesses(type1, type2);
    this.strengths = getStrengths(type1, type2);
    this.immunities = getImmunities(type1, type2);
    this.learnset = getLearnSet(name);
    this.attacktype = undefined; // getAttackType();
    this.retreatCost = 2;
    // this.damage = damageCalculation(this.level, this.speed, this.attack, this.defence, this.spAtk, this.spDef, this.type1, this.type2, this.attacktype);
  }

  /* retreat() { };
    attack(attackId) {
        if (attackId === 'gnaw') {
            // return attackGnaw();
        } else if (attackId === 'thunderJolt') {
            return attackThunderJolt();
        }
    };
    isDead() {
        if (this.hp <= 0) {
            return true;
        } else {
            return false;
        }
    }; */
}

/* class enemyPokemon extends pokemon {
    constructor(name, hp, type, weakness, resistance) {
        super();
        this.name = name;
        this.hp = hp;
        this.type = type;
        this.weakness = weakness;
        this.resistance = resistance;
    }
}

class userPokemon extends pokemon {
    constructor(name, hp, type, weakness, resistance) {
        super();
        this.name = name;
        this.hp = hp;
        this.type = type;
        this.weakness = weakness;
        this.resistance = resistance;
    }

    attack(attackId) {
        if (attackId === 'gnaw') {
            // return attackGnaw();
        } else if (attackId === 'thunderJolt') {
            return attackThunderJolt();
        }
    };
}; */

stats.forEach((element) => {
  if (element.type2 === undefined) {
    element.type2 = "none";
    pokemon[element.id] = new pokemon(
      element.id,
      element.name,
      element.hp,
      element.type1,
      element.type2,
      element.attack,
      element.defence,
      element.specialattack,
      element.specialdefence,
      element.speed,
      element.total
    );
  } else {
    pokemon[element.id] = new pokemon(
      element.id,
      element.name,
      element.hp,
      element.type1,
      element.type2,
      element.attack,
      element.defence,
      element.specialattack,
      element.specialdefence,
      element.speed,
      element.total
    );
  }
});

// console.log(pokemon[13].isShiny);

// console.log("hp:", pokemon[1].HP, "attack:", pokemon[1].attack, "defence:", pokemon[1].defence, "spAtk:", pokemon[1].spAtk, "spDef:", pokemon[1].spDef, "speed:", pokemon[1].speed);
// console.log("baseHP:", pokemon[1]._hp, "baseAttack:", pokemon[1]._attack, "baseDefence:", pokemon[1]._defence, "baseSpAtk:", pokemon[1]._spAtk, "baseSpDef:", pokemon[1]._spDef, "baseSpeed:", pokemon[1]._speed);

const array = pokemon[1].weaknesses;

const toFindDuplicates = (array) =>
  array.filter((item, index) => array.indexOf(item) !== index);
const duplicateElements = toFindDuplicates(array);
duplicateElements.forEach((element) => {
  let i = array.indexOf(element);
  array.splice(i, 1, "2" + array[i]);
  i = array.indexOf(element);
  array.splice(i, 1);
});

// console.log(array);

// let random = randomNumber(1, 151);
function getEnemySet(userSet) {

  userSet.forEach((element) => {

    const userId = element.id
    const total = pokemon[userId].total;
    const low = total - 50;
    const high = total + 50;

    let possible = [];

    let i = 1;
    while (i < 151) {
      if (pokemon[i].total >= low && pokemon[i].total <= high) {
/*      if (pokemon[i].id !== userId) {
          possible.push(pokemon[i]);
        } */
        possible.push(pokemon[i]);
        i++;
      } else {
        i++;
      }
    }


  let randomi = randomNumber(0, possible.length - 1);

  enemySet.push(possible[randomi]);
  });
}
// console.log(u)





let userSet = [];
let enemySet = [];

let index = 0;
while (index < 6) {
  let random = randomNumber(1, 151);
  userSet.push(pokemon[random]);
  index++;
}

getEnemySet(userSet);

console.log("user:", userSet);
console.log("enemy:", enemySet);