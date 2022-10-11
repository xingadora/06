import { isCriticalHit } from "./attackbonuses.js";

export function damageCalculation(level, speed, attack, defence, spAtk, spDef) {
    let damage,
        a,
        d;

    const critical = isCriticalHit(speed);
    const stab = sameTypeAttackBonus();


    damage = ((((((2 * level * critical) / 5) + 2) * power * (a / d)) / 50) + 2) * stab * type1effect * type2effect * random;
}