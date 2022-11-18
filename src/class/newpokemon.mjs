import stats from "/src/data/pokemonstats.json" assert { type: "json" };
import { randomNumber } from "/src/function/randomnumbergen.mjs";
import { damageCalculation } from "/src/function/damagecalculator.mjs";
import {
  getWeaknesses,
  getStrengths,
  getImmunities,
} from "/src/function/typescalculator.mjs";
import { getLearnSet } from "/src/function/getlearnset.mjs";
import { getLevel, getGender, getShiny, getHPIV, getStat } from "/src/function/getStats.mjs";

export class pokemon {
  /* get HPIV() {
    return getHPIV(this.attackIV, this.defenceIV, this.spAtkIV, this.spDefIV);
  }
  get HP() {
    return getStat(this.baseHp, this.HPIV, this.level, "hp");
  }
  get zattack() {
    return getStat(this.baseAttack, this.attackIV, this.level, "attack");
  }
  get zdefence() {
    return getStat(this.baseDefence, this.defenceIV, this.level, "defence");
  }
  get zspAtk() {
    return getStat(this.baseSpAtk, this.spAtkIV, this.level, "spAtk");
  }
  get zspDef() {
    return getStat(this.baseSpDef, this.spDefIV, this.level, "spDef");
  }
  get zspeed() {
    return getStat(this.baseSpeed, this.speedIV, this.level, "speed");
  } */

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
    this.baseHp = hp;
    this.type1 = type1;
    this.type2 = type2;
    this.baseAttack = attack;
    this.attackIV = randomNumber(0, 15);
    this.baseDefence = defence;
    this.defenceIV = randomNumber(0, 15);
    this.baseSpAtk = spAtk;
    this.spAtkIV = randomNumber(0, 15);
    this.baseSpDef = spDef;
    this.spDefIV = randomNumber(0, 15);
    this.baseSpeed = speed;
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
    this.hpIv = getHPIV(this.attackIV, this.defenceIV, this.spAtkIV, this.spDefIV);
    this.hp = getStat(this.baseHp, this.hpIv, this.level, "hp");
    this.attack = getStat(this.baseAttack, this.attackIV, this.level, "attack");
    this.defence = getStat(this.baseDefence, this.defenceIV, this.level, "defence");
    this.spAtk = getStat(this.baseSpAtk, this.spAtkIV, this.level, "spAtk");
    this.spDef = getStat(this.baseSpDef, this.spDefIV, this.level, "spDef");
    this.speed = getStat(this.baseSpeed, this.speedIV, this.level, "speed");
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
        possible.push(pokemon[i]);
        i++;
      } else {
        i++;
      }
    }

  if (pokemon[i].id === userId) {
    possible.splice(i, 1);
  }

  let randomi = randomNumber(0, possible.length - 1);

  enemySet.push(possible[randomi]);


  });
}

export let userSet = [];
export let enemySet = [];
let lastIndex = [];

let index = 0;
while (index < 6) {
  let random = randomNumber(1, 151);
  while (lastIndex.includes(random)) {
    random = randomNumber(1, 151);
  }
  userSet.push(pokemon[random]);
  lastIndex.push(random);
 
  index++;
}

getEnemySet(userSet);

console.log("user:", userSet);
console.log("enemy:", enemySet);

