import { probability } from "./randomnumbergen.js";

export function isCriticalHit(speed) {
    if (probability(speed / 255)) {
        return 2;
    } else {
        return 1;
    }
};

export function sameTypeAttackBonus(pokemontype1, pokemontype2, attacktype) {
    if (attacktype === pokemontype1 || attacktype === pokemontype2) {
        return 1.5;
    } else {
        return 1;
    }
};

export function typeEffectiveness(attacktype, enemytype) {
    /* if (pokemontype.weakness.includes(enemytype)) {
        return 2;
    } else if (pokemontype.strength.includes(enemytype)) {
        return 0.5;
    } else if (pokemontype.immune.includes(enemytype)) {
        return 0;
    } else {
        return 1;
    } */
}