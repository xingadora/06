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
