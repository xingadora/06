import stats from '/src/data/pokemonstats.json' assert {type: 'json'};
import {randomNumber} from '/src/function/randomnumbergen.js';
import {damageCalculation} from '/src/function/damagecalculator.js';
import {getWeaknesses, getStrengths, getImmunities} from '/src/function/typescalculator.js';


class pokemon {
    constructor(id, name, hp, type1, type2, attack, defence, spAtk, spDef, speed) {
        this.id = id
        this.name = name;
        this.hp = hp;
        this.type1 = type1;
        this.type2 = type2;
        this.attack = attack;
        this.defence = defence;
        this.spAtk = spAtk;
        this.spDef = spDef;
        this.speed = speed;
        this.level = randomNumber(1, 100);
        this.weaknesses = getWeaknesses(type1, type2);
        this.strengths = getStrengths(type1, type2);
        this.immunities = getImmunities(type1, type2);
        this.retreatCost = 2;
        this.damage = damageCalculation(this.level, this.speed, this.attack, this.defence, this.spAtk, this.spDef);
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
};

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

stats.forEach(element => {
    // window[element.name] = new pokemon(element.id, element.name, element.hp, element.type1, element.type2, element.attack, element.defence, element.spAtk, element.spDef, element.speed);
    pokemon[element.id] = new pokemon(element.id, element.name, element.hp, element.type1, element.type2, element.attack, element.defence, element.spAtk, element.spDef, element.speed);
});

// console.log(pokemon[1].name)
// console.log(stats[0].name)