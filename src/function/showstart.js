import { typewriter } from "./textrenderer.js";

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

function hideStart() {
  let pressEnter = document.getElementById("press-enter");
  document.removeEventListener("keydown", hideStart);
  pressEnter.classList.remove("press-enter");
  pressEnter.classList.add("pressed-enter");
  overlay.classList.add("overlay");
  overlay.addEventListener("animationend", showStart);
}

function showStart() {
  overlay.removeEventListener("animationend", showStart);
  document.body.classList.remove("container");
  document.body.style.backgroundImage = "url('/src/img/start_background.jpg')";
  overlay.classList.remove("overlay");
  void overlay.offsetWidth;
  overlay.classList.add("overlay");
  overlay.style.animationDirection = "reverse";
  overlay.style.animationFillMode = "none";
  document.getElementById("textbox").classList.add("textbox");
  overlay.addEventListener("animationend", typewriter);
}
