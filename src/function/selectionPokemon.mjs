import { userSet } from "../class/newpokemon.mjs";
import position from "../data/canvasPositions.json" assert { type: "json" };

export function renderInfo(i) {
  let scale = 1;

  const name = document.getElementById("name" + i);
  const level = document.getElementById("level" + i);
  const hpCurrent = document.getElementById("hpCurrent" + i);
  const hpTotal = document.getElementById("hpTotal" + i);

  name.innerHTML = userSet[i].name;
  level.innerHTML = "Lv." + userSet[i].level;
  hpCurrent.innerHTML = userSet[i].hp;
  hpTotal.innerHTML = userSet[i].hp;

  name.style.left = position.name.X[i] * scale + "px";
  name.style.top = position.name.Y[i] * scale + "px";

  level.style.left = position.level.value.X[i] * scale + "px";
  level.style.top = position.level.value.Y[i] * scale + "px";

  hpCurrent.style.left = position.hpText.current.X[i] * scale + "px";
  hpCurrent.style.top = position.hpText.current.Y[i] * scale + "px";

  hpTotal.style.left = position.hpText.total.X[i] * scale + "px";
  hpTotal.style.top = position.hpText.total.Y[i] * scale + "px";
}
