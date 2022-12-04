import dialogues from "../data/dialogue.json" assert { type: "json" }; // import text that will be shown to the player
export { textRenderedFinal, choice }; // export variables that will be used in other files

let textRenderedFinal = false; // boolean to check if the all the text from a dialogue group has been rendered
let textRendered = false; // boolean to check if the current text line from a dialogue group has been rendered
let textSkipped = false; // boolean to check if the current text line from a dialogue group has been skipped
let choice = undefined; // variable to store the player's choice if a question is asked

const widthTestCanvas = element("widthTestCanvas"); // canvas element to calculate the width of the text
const widthCtx = widthTestCanvas.getContext("2d"); // make sure the canvas is 2D so it can be used with text
widthCtx.font = "3em pokeFont"; // set the proper font
void widthCtx.measureText("M"); // measure the width of a single character to make sure the font is loaded

let scale;

if (Math.floor(window.innerWidth - (window.innerWidth % 256) - 128) > 1024) {
  scale = 4;
} else {
  scale = Math.floor(
    (window.innerWidth - (window.innerWidth % 256) - 128) / 256
  );
}

export function element(element) {
  // function to get an element from the DOM (this just makes the code easier to read and write)
  return document.getElementById(element); // return the element
}

export function fadeIn(element, duration, delay) {
  // function to fade in an element
  duration = duration || "1s"; // set the duration to 1 second if no duration is provided
  delay = delay || "0s"; // set the delay to 0 seconds if no delay is provided
  element.style.transition = `opacity ${duration} ${delay}`; // set the transition for the element using the parameters
  element.style.opacity = "1"; // set the opacity to 1 to fade in the element
}

export function fadeOut(element, duration, delay) {
  // function to fade out an element (same as the fadeIn function but with opacity set to 0)
  duration = duration || "1s";
  delay = delay || "0s";
  element.style.transition = `opacity ${duration} ${delay}`;
  element.style.opacity = "0";
}

export function show(element) {
  // function to show an element
  element.style.display = "block"; // set the display to block to show the element (again, this just makes the code easier to read and write)
} // I use the display property instead of the visibility property because the visibility property still takes up space
export function hide(element) {
  // function to hide an element (same as the show function but with display set to none)
  element.style.display = "none";
}

export function textRenderer(textGroup, destinationId, textIndex, speed) {
  // function to render text to the textbox
  speed = speed || 20; // set the speed to 20 milliseconds if no speed is provided
  textIndex = textIndex || 0; // set the text index to 0 if no text index is provided (you would use this if you want to render a specific line of text from a dialogue group)
  let type = dialogues[textGroup].type; // get the type of dialogue group (this is used to determine if the dialogue group is a question or not)
  let displayText = dialogues[textGroup].line[textIndex]; // get the actual text from the dialogue group
  let text = Array.from(displayText); // convert the text to an array so each letter can be rendered individually
  let destination = element(destinationId); // get the destination element from the DOM

  // get the specified elements from the DOM (using the element function)
  const buttonY = element("buttonY");
  const buttonN = element("buttonN");
  const selectorY = element("selectorY");
  const selectorN = element("selectorN");
  const textbox = element("textbox");
  const textboxText = element("textboxText");
  const textboxArrow = element("textboxArrow");

  // reset the variables to their default values
  choice = undefined;
  textSkipped = false;
  textRendered = false;
  textRenderedFinal = false;

  function clearText() {
    // function to clear the text from the textbox
    destination.innerHTML = ""; // set the innerHTML of the destination element to an empty string
  }

  // get the width of the textbox minus the margins
  let textBoxWidth =
    textbox.offsetWidth -
    textboxText.offsetLeft -
    parseInt(window.getComputedStyle(textboxText).marginRight);

  if (type === "multiShort") {
    textBoxWidth = parseInt(window.getComputedStyle(gameCanvas).width) / 2;
    widthCtx.font = "16px pokeFont";
  }

  let checkArray = []; // array to store the text so its width can be checked
  let found = false; // boolean to check if the text has been found

  text.forEach((letter) => {
    // loop through each letter in the text array
    checkArray.push(letter); // add the current letter to the check array
    let textWidth = widthCtx.measureText(checkArray.join("")).width; // turn the array into a string and measure the width of the text in the test canvas
    if (!found && textWidth > textBoxWidth) {
      // if the text has not been found and the width of the text is greater than the width of the textbox
      found = true; // set the found boolean to true
      let replaceAt = checkArray.lastIndexOf(" "); // get the index of the last space in the check array
      text[replaceAt] = "<br>"; // replace the space with a line break
    }
  }); // this makes the text print more nicely by adding line breaks when the text is too long instead of adding letters on one line then jumping to the next line

  if (type !== "multiShort") {
    document.addEventListener("keyup", skipText); // add an event listener to the document to check if the player has pressed a key to skip the text
    document.addEventListener("click", skipText); // same thing but checks if the player has clicked the mouse
  }

  function skipText(e) {
    // function to skip the text ("e" is the event that triggered the function)
    if (e.key === "Enter" || e.key === " " || e.type === "click") {
      // if the player has pressed the enter key, spacebar, or clicked the mouse
      // remove the event listeners from the document
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);

      destination.innerHTML = displayText; // set the innerHTML of the destination element directly to the text (this skips the text rendering)
      destination.scrollTo(0, 100); // scrolls the text to the bottom if the text is too long (this is to make sure the player can see the whole text)

      textSkipped = textRendered = true; // set the text skipped and text rendered booleans to true
    }
  }

  const textInterval = setInterval(() => {
    // set an interval to render the text letter by letter
    if (text.length > 0 && !textRendered && !textSkipped) {
      // if there is still text to render and the text has not been rendered or skipped
      let currentLetter = text.shift(); // get and store the first letter in the text array then remove it from the array
      destination.innerHTML += currentLetter; // add the current letter to the innerHTML of the destination element
    } else {
      // if there is no more text to render or the text has been rendered or skipped
      // remove the event listeners from the document
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);

      clearInterval(textInterval); // clear the interval
      //destination.innerHTML = displayText; // set the innerHTML of the destination element directly to the text (just to make sure the text is fully rendered)
      textRendered = true; // set the text rendered boolean to true

      if (type === "multiShort" && textRendered) {
        setTimeout(() => {
          nextText();
        }, 1000);
      }

      if (type === "multi" || type === "choice") {
        // make sure the dialogue is valid
        if (textIndex < dialogues[textGroup].line.length - 1) {
          // if the current line of text is not the last line of text
          show(textboxArrow); // show the textbox arrow

          // add event listeners to the document to check if the player has pressed a key to go to the next line of text
          document.addEventListener("keyup", nextText);
          document.addEventListener("click", nextText);
        } else {
          // if the current line of text is the last line of text
          textRenderedFinal = true; // set the text rendered final boolean to true
          hide(textboxArrow); // hide the textbox arrow

          if (type === "choice") {
            // if the dialogue is a choice
            // fade in the buttons
            fadeIn(buttonY, "1s", "0.2s");
            fadeIn(buttonN, "1s", "0.2s");

            // add event listeners to the buttons to check if the player has clicked the buttons
            buttonY.addEventListener("click", yesChoice);
            buttonN.addEventListener("click", noChoice);
          }
        }
      }
    }
  }, speed); // the speed is the amount of time between each letter being rendered

  function yesChoice() {
    // function to handle the player choosing yes
    // remove the event listeners from the buttons
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);

    show(selectorY); // show the selector for the yes button
    hide(selectorN);
    selectorY.style.animation = "selector 0.4s step-start 0s infinite"; // animate the selector

    // fade out the buttons and the selector
    fadeOut(buttonY, "0.5s", "0.6s");
    fadeOut(buttonN, "0.5s", "0.6s");

    buttonY.addEventListener("animationend", removeButtons); // add an event listener to the yes button to check when the animation has ended then hide the buttons

    setTimeout(() => {
      // set a timeout to wait for the animation delay
      choice = "yes"; // set the choice variable to "yes" (this one gets exported)
      clearText(); // clear the text from the textbox
    }, 600);
  }

  function noChoice() {
    // function to handle the player choosing no (same as the yes choice function but with the no button)
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);

    show(selectorN);
    hide(selectorY);
    selectorN.style.animation = "selector 0.4s step-start 0s infinite";

    fadeOut(buttonY, "0.5s", "0.6s");
    fadeOut(buttonN, "0.5s", "0.6s");

    buttonN.addEventListener("animationend", removeButtons);

    setTimeout(() => {
      choice = "no";
      clearText();
    }, 600);
  }

  function removeButtons() {
    // function to remove the buttons from the DOM
    // hides the buttons
    hide(buttonY);
    hide(buttonN);
  }

  function nextText() {
    // function to go to the next line of text in the dialogue group
    if (type !== "multiShort") {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.type === "click"
      ) {
        // if the player has pressed the enter key, spacebar, or clicked the mouse
        // remove the event listeners from the document
        document.removeEventListener("keyup", nextText);
        document.removeEventListener("click", nextText);

        hide(textboxArrow); // hide the textbox arrow
      }
    }
    if (textIndex < dialogues[textGroup].line.length - 1) {
      // if the current line of text is not the last line of text
      clearText(); // clear the text from the textbox
      textRenderer(textGroup, destinationId, textIndex + 1); // render the next line of text
    } else {
      // if the current line of text is the last line of text
      textRendered = true; // set the text rendered boolean to true
      clearText(); // clear the text from the textbox
    }
  }

  setInterval(() => {
    // set an interval to scroll the text to the bottom if the text is too long
    if (!textRendered) {
      // if the text has not been rendered
      textboxText.scrollTo(0, 100); // scroll the text to the bottom
    }
  }, speed); // the interval is the same speed as the text rendering interval
}
