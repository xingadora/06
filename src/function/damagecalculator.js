import {
  criticalHitMultiplier,
  typeEffectiveness,
  sameTypeAttackBonus,
} from "./attackbonuses.js";
import { randomNumber } from "./randomnumbergen.js";

export function damageCalculation(
  level,
  speed,
  attack,
  defence,
  spAtk,
  spDef,
  type1,
  type2,
  attacktype
) {
  let damage;

  const critical = criticalHitMultiplier(speed, level);
  const stab = sameTypeAttackBonus(type1, type2, attacktype);
  const type1effectiveness = typeEffectiveness(type1, attacktype);
  const type2effectiveness = typeEffectiveness(type2, attacktype);
  const power = 0;
  const random = randomNumber(217, 255) / 255;

  damage =
    ((((2 * level * critical) / 5 + 2) * power * (attack / defence)) / 50 + 2) *
    stab *
    type1effectiveness *
    type2effectiveness *
    random;
}
