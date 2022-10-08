class pokemon {
    constructor(name, hp, type, retreatCost, weakness, weaknessMulti, resistance, resistanceMulti) {
        this.name = name;
        this.hp = hp;
        this.type = type;
        this.retreatCost = 2;
        this.weakness = weakness;
        this.weaknessMulti = 2;
        this.resistance = resistance;
        this.resistanceMulti = 0.5;
    }

    retreat() { };
    attack() { };
    isDead() {
        if (this.hp <= 0) {
            return true;
        } else {
            return false;
        }
    };
};

class enemyPokemon extends pokemon {
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
};

const pikachu = new userPokemon('Pikachu', 60, 'Electric', 'Strength', 'Metal');
const enemyPikachu = new enemyPokemon('Pikachu', 60, 'Electric', 'Strength', 'Metal');
// console.log(pikachu.attack('gnaw'))