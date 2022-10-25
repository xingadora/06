import { probability } from "./randomnumbergen.js";


export function getLevel() {

    let lvl;

    function checkTrue() {
        let rand = Math.random()
        let prob = (1.75 * Math.pow(rand, 3)) - (3.5 * Math.pow(rand, 2)) + (2.2 * Math.pow(rand, 1.4)) - (2.7 * Math.pow(rand, 1.2)) + (1.75 * rand) + 0.5;

        if (probability(prob)) {
            lvl = Math.floor(rand * 100) + 1
            return true;
        } else {
            return false;
        }
    }
    
    while(true) {
        if(checkTrue()) {
            break;
        }
    }

    return lvl;
}