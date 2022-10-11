import {isCriticalHit, typeEffectiveness, sameTypeAttackBonus} from "./attackbonuses.js";

export function damageCalculation(level, speed, attack, defence, spAtk, spDef, type1, type2, attacktype) {
    let damage,
        a,
        d;

    const critical = isCriticalHit(speed);
    const stab = sameTypeAttackBonus(type1, type2, attacktype);
    const type1effectiveness = typeEffectiveness(type1, attacktype);
    const type2effectiveness = typeEffectiveness(type2, attacktype);
    const power = 0;
    const random = 0;




    damage = ((((((2 * level * critical) / 5) + 2) * power * (a / d)) / 50) + 2) * stab * type1effectiveness * type2effectiveness * random;
}