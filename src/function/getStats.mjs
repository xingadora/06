import { probability, randomNumber } from "./randomnumbergenm.js";

// getLevel
export function getLevel() {
  let lvl;

  function checkTrue() {
    let rand = Math.random();
    let prob =
      1.75 * Math.pow(rand, 3) -
      3.5 * Math.pow(rand, 2) +
      2.2 * Math.pow(rand, 1.4) -
      2.7 * Math.pow(rand, 1.2) +
      1.75 * rand +
      0.5;

    if (probability(prob)) {
      lvl = Math.floor(rand * 100) + 1;
      return true;
    } else {
      return false;
    }
  }

  while (true) {
    if (checkTrue()) {
      break;
    }
  }

  return lvl;
}

// getShiny
export function getShiny() {
  return Math.random() < 0.04;
}

// getGender
export function getGender(id) {
  parseInt(id);
  let canBeFemale, gender;

  switch (id) {
    case 3:
    case 12:
    case 19:
    case 20:
    case 25:
    case 26:
    case 41:
    case 42:
    case 44:
    case 45:
    case 64:
    case 65:
    case 84:
    case 85:
    case 97:
    case 111:
    case 112:
    case 118:
    case 119:
    case 123:
    case 129:
    case 130:
      canBeFemale = true;
      break;
    default:
      canBeFemale = false;
  }

  if (canBeFemale) {
    if (Math.random() < 0.5) {
      gender = "female";
    } else {
      gender = "male";
    }
  } else {
    gender = "male";
  }

  return gender;
}

// getHPIV
export function getHPIV(attackIV, defenceIV, spAtkIV, spDefIV) {
  const attackIVLSB = attackIV.toString(2).slice(-1);
  const defenceIVLSB = defenceIV.toString(2).slice(-1);
  const spAtkIVLSB = spAtkIV.toString(2).slice(-1);
  const spDefIVLSB = spDefIV.toString(2).slice(-1);

  const HPIVBin = attackIVLSB + defenceIVLSB + spAtkIVLSB + spDefIVLSB;
  const HPIV = parseInt(HPIVBin, 2);

  return HPIV;
}

// getHP
export function getStat(hp, HPIV, level, stat) {
  const EV = randomNumber(1, 65535);
  let statValue;

  switch (stat) {
    case "hp":
      statValue = Math.floor(
        ((((hp + HPIV) * 2 + (Math.sqrt(EV) / 4)) * level) / 100) + level + 10
      );
      break;
    case "attack":
    case "defence":
    case "spAtk":
    case "spDef":
    case "speed":
      statValue = Math.floor(
        ((((hp + HPIV) * 2 + (Math.sqrt(EV) / 4)) * level) / 100) + 5
      );
      break;
  }

  return statValue;
}
