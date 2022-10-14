import stats from '/src/data/pokemonstats.json' assert {type: 'json'};
import { randomNumber } from '/src/function/randomnumbergen.js';
import { damageCalculation } from '/src/function/damagecalculator.js';
import { getWeaknesses, getStrengths, getImmunities } from '/src/function/typescalculator.js';


class pokemon {

    get weaknesses() {
        return getWeaknesses(this.type1, this.type2);
    };
    get strengths() {
        return getStrengths(this.type1, this.type2);
    };
    get immunities() {
        return getImmunities(this.type1, this.type2);
    };

    constructor(id, name, hp, type1, type2, attack, defence, spAtk, spDef, speed, total) {
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
        this.total = total;
        this.level = randomNumber(1, 100);
        this._weaknesses = undefined;//getWeaknesses(type1, type2);
        this._strengths = undefined;//getStrengths(type1, type2);
        this._immunities = undefined;//getImmunities(type1, type2);
        this.attacktype = undefined;// getAttackType();
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
    if (element.type2 === undefined) {
        element.type2 = 'none';
        pokemon[element.id] = new pokemon(element.id, element.name, element.hp, element.type1, element.type2, element.attack, element.defence, element.specialattack, element.specialdefence, element.speed, element.total);

    } else {
        pokemon[element.id] = new pokemon(element.id, element.name, element.hp, element.type1, element.type2, element.attack, element.defence, element.specialattack, element.specialdefence, element.speed, element.total);
    }
});

// console.log(pokemon[68].strengths)
// console.log(pokemon[1].weaknesses)
// console.log(stats[67])

