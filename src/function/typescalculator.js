import types from '/src/data/types.json' assert {type: 'json'};

class type {
    constructor(name, weakness, strength, immune) {
        this.name = name;
        this.weakness = weakness;
        this.strength = strength;
        this.immune = immune;
    }
}

types.forEach(element => {
    type[element.name] = new type(element.name, element.weaknesses, element.strengths, element.immunes);
});


export function getWeaknesses(type1, type2) {
    return type[type1].weakness.concat(type[type2].weakness);
};

export function getStrengths(type1, type2) {
    return type[type1].strength.concat(type[type2].strength);
};

export function getImmunities(type1, type2) {
    return type[type1].immune.concat(type[type2].immune);
};