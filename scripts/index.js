import Filter from "./filters.js";

window.addEventListener("load", () => {
  //Element variables
  const img = document.getElementById("img");
  const slider = document.getElementById("slider");
  const sliderMin = document.getElementById("slider-min");
  const sliderMax = document.getElementById("slider-max");
  const sliderBubble = document.getElementById("slider-bubble");
  const currentFilter = document.getElementById("current-filter");
  const btns = document.querySelectorAll(".btn");

  //Create Filter objects
  const filters = {
    blur: new Filter(0, 20, 0, "blur", "px"),
    brightness: new Filter(0, 200, 100, "brightness", "%"),
    contrast: new Filter(0, 200, 100, "contrast", "%"),
    grayscale: new Filter(0, 100, 0, "grayscale", "%"),
    hueRotate: new Filter(0, 360, 0, "hue-rotate", "deg"),
    invert: new Filter(0, 100, 0, "invert", "%"),
    opacity: new Filter(0, 100, 100, "opacity", "%"),
    saturate: new Filter(0, 200, 100, "saturate", "%"),
    sepia: new Filter(0, 100, 0, "sepia", "%"),
  };

  //Start selection on blur
  let selection = "blur";

  //apply filters when user adjusts range slider
  slider.oninput = adjustSettings;

  //Pass range slider value to selection's applyChange method
  function adjustSettings(e) {
    const newVal = e.target.value;
    moveBubble(newVal);
    filters[selection].applyChange(img, newVal);
  }

  //function to adjust position of slider bubble
  function moveBubble(val) {
    //(${8 - newVal * 0.15}px)
    const newVal = (val / filters[selection].max) * 100;
    sliderBubble.style.left = `calc(${newVal}% + (${7 - newVal * 0.15}px))`;
    sliderBubble.textContent = val;
  }

  //Apply click listeners to each button
  //Update 'selection' variable to value of clicked button
  //Update slider based on values for the corresponding filter object
  btns.forEach((elem) => {
    elem.addEventListener("click", () => {
      //Remove selected class from any element which has it
      btns.forEach((elem) => {
        if (elem.classList.contains("selectedBtn")) {
          elem.classList.remove("selectedBtn");
        }
      });

      //Apply selected styles to current element
      elem.classList.add("selectedBtn");
      elem.focus();

      selection = elem.value;
      filters[selection].changeSelection(sliderMin, sliderMax, slider, currentFilter, elem.textContent, sliderBubble);
    });
  });
});