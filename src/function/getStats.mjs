import { probability, randomNumber } from "./randomnumbergen.mjs";

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
  let canBeFemale, hasfemaleSprite, gender, genderRatio;

  switch (id) {
    case 3:
      genderRatio = "1:7";
      canBeFemale = true;
      hasfemaleSprite = true;
      break;
    case 64:
    case 65:
      genderRatio = "1:3";
      canBeFemale = true;
      hasfemaleSprite = true;
      break;
    case 12:
    case 19:
    case 20:
    case 25:
    case 26:
    case 41:
    case 42:
    case 44:
    case 45:
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
      genderRatio = "1:1";
      hasfemaleSprite = true;
      canBeFemale = true;
      break;
    case 32:
    case 33:
    case 34:
    case 106:
    case 107:
    case 128:
      genderRatio = "male";
      canBeFemale = false;
      hasfemaleSprite = false;
      break;
    case 1:
    case 2:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 133:
    case 134:
    case 135:
    case 136:
    case 138:
    case 139:
    case 140:
    case 141:
    case 142:
    case 143:
      genderRatio = "1:7";
      canBeFemale = true;
      hasfemaleSprite = false;
      break;
    case 58:
    case 59:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 125:
    case 126:
      genderRatio = "1:3";
      canBeFemale = true;
      hasfemaleSprite = false;
      break;
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
      genderRatio = "3:1";
      canBeFemale = true;
      hasfemaleSprite = false;
      break;
    case 29:
    case 30:
    case 31:
    case 113:
    case 115:
    case 124:
      genderRatio = "female";
      canBeFemale = true;
      hasfemaleSprite = false;
      break;
    case 81:
    case 82:
    case 100:
    case 101:
    case 120:
    case 121:
    case 132:
    case 137:
    case 144:
    case 145:
    case 146:
    case 150:
    case 151:
      genderRatio = "none";
      hasfemaleSprite = false;
      break;
    default:
      genderRatio = "1:1";
      hasfemaleSprite = false;
      canBeFemale = true;
  }

  switch (genderRatio) {
    case "1:1":
      gender = probability(0.5) ? "male" : "female";
      break;
    case "1:3":
      gender = probability(1/3) ? "female" : "male";
      break;
    case "1:7":
      gender = probability(1/7) ? "female" : "male";
      break;
    case "3:1":
      gender = probability(1/3) ? "male" : "female";
      break;
    case "none":
      gender = "none";
      break;
    case "male":
      gender = "male";
      break;
    case "female":
      gender = "female";
      break;
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
        (((hp + HPIV) * 2 + Math.sqrt(EV) / 4) * level) / 100 + level + 10
      );
      break;
    case "attack":
    case "defence":
    case "spAtk":
    case "spDef":
    case "speed":
      statValue = Math.floor(
        (((hp + HPIV) * 2 + Math.sqrt(EV) / 4) * level) / 100 + 5
      );
      break;
  }

  return statValue;
}
