import {probability} from "./randomnumbergen.js";

export function isCriticalHit(speed) {
    if (probability(speed / 255)) {
        return 2;
    } else {
        return 1;
    }
};

export function sameTypeAttackBonus() {

};