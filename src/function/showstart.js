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
