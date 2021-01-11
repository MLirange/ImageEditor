import Filter from "./filters.js";

window.addEventListener("load", () => {
  //Element variables
  const img = document.getElementById("img");
  const slider = document.getElementById("slider");
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
  slider.onchange = adjustSettings;

  //Pass range slider value to selection's applyChange method
  function adjustSettings(e) {
    const newVal = e.target.value;
    filters[selection].applyChange(img, newVal);
  }

  //Apply click listeners to each button
  //Update 'selection' variable to value of clicked button
  //Update slider based on values for the corresponding filter object
  btns.forEach((elem) => {
    elem.addEventListener("click", () => {
      selection = elem.value;
      filters[selection].changeSelection(slider);
    });
  });
});
