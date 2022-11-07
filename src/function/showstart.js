import { textRenderer, textRendered } from "./textrenderer.js";
import dialogues from "../data/dialogue.json" assert { type: "json" };

function showNext() {
  nextId = document.querySelectorAll(".hidden");
  nextId[0].style.display = "block";
  nextId[0].classList.remove("hidden");
}

function showInvalid() {
  invalidId = document.querySelectorAll(".invalid");
  invalidId[0].style.display = "block";
}

function hideInvalid() {
  invalidId = document.querySelectorAll(".invalid");
  invalidId[0].style.display = "none";
}

document.addEventListener("keydown", hideStart);
let overlay = document.getElementById("overlay");
let texti = 0;

function hideStart() {
  let pressEnter = document.getElementById("press-enter");
  if (event.key === "Enter") {
    document.removeEventListener("keydown", hideStart);
    pressEnter.classList.remove("press-enter");
    pressEnter.classList.add("pressed-enter");
    overlay.classList.add("overlay");
    overlay.addEventListener("animationend", showStart);
  }
}

function showStart() {
  let textbox = document.getElementById("textbox");
  overlay.removeEventListener("animationend", showStart);
  document.body.classList.remove("container");
  document.getElementById("logo").style.display = "none";
  document.body.style.backgroundColor = "black";
  document.body.style.backgroundImage = "url()";
  overlay.classList.remove("overlay");
  void overlay.offsetWidth;
  overlay.classList.add("overlay");
  overlay.style.animationDirection = "reverse";
  overlay.style.animationFillMode = "none";
  textbox.classList.add("textbox");
  textbox.style.top = "45%";
  overlay.addEventListener("animationend", finishStart);
}

function finishStart() {
  overlay.removeEventListener("animationend", finishStart);
  overlay.style.display = "none";
  document.getElementById("press-enter").style.display = "none";
  textRenderer("intro", "typedtext");
  tutorialChoice();
}

function tutorialChoice() {
  let buttonY = document.getElementById("clickboxY");
  let buttonN = document.getElementById("clickboxN");
  buttonY.style.animationName = "fadein";
  buttonN.style.animationName = "fadein";
  buttonY.style.animationDuration = "1s";
  buttonN.style.animationDuration = "1s";
  buttonY.style.animationFillMode = "forwards";
  buttonN.style.animationFillMode = "forwards";
}