import Filter from "./filters.js";

window.addEventListener("load", () => {
  //Element variables
  const canvas = document.getElementById("canvas");
  const uploader = document.getElementById("uploader");
  const saveBtn = document.getElementById("save");
  const options = document.getElementById("options");

  //Create Filter objects
  const filters = {
    blur: new Filter(0, 20, 0, "blur", "px", "blur"),
    brightness: new Filter(0, 200, 100, "brightness", "%", "brightness"),
    contrast: new Filter(0, 200, 100, "contrast", "%", "contrast"),
    grayscale: new Filter(0, 100, 0, "grayscale", "%", "grayscale"),
    hueRotate: new Filter(0, 360, 0, "hue-rotate", "deg", "hue rotation"),
    invert: new Filter(0, 100, 0, "invert", "%", "invert"),
    //opacity: new Filter(0, 100, 100, "opacity", "%"),
    saturate: new Filter(0, 200, 100, "saturate", "%", "saturation"),
    sepia: new Filter(0, 100, 0, "sepia", "%", "sepia"),
  };

  //Create filter option elements
  for (let prop in filters) {
    //Create parent element
    const menuOption = document.createElement("div");
    if (prop === "blur") menuOption.classList.add("selectedBtn");
    menuOption.classList.add("btn");
    menuOption.value = prop;
    menuOption.textContent = filters[prop].label;

    //Create slider group
    const sliderGroup = document.createElement("div");
    sliderGroup.classList.add("slider-container");
    if (prop !== "blur") sliderGroup.classList.add("slider-hidden");

    const sliderMin = document.createElement("span");
    sliderMin.classList.add("slider-span");
    sliderMin.textContent = "0";
    sliderGroup.appendChild(sliderMin);

    const sliderAndBubble = document.createElement("div");
    sliderAndBubble.classList.add("slider-and-bubble");

    const slider = document.createElement("input");
    slider.classList.add("slider");
    slider.setAttribute("type", "range");
    slider.setAttribute("name", prop);
    slider.setAttribute("id", prop);
    slider.setAttribute("min", filters[prop].min);
    slider.setAttribute("max", filters[prop].max);
    slider.setAttribute("value", filters[prop].currVal);
    sliderAndBubble.appendChild(slider);

    sliderGroup.appendChild(sliderAndBubble);

    const sliderMax = document.createElement("span");
    sliderMax.classList.add("slider-span");
    sliderMax.textContent = filters[prop].max;
    sliderGroup.appendChild(sliderMax);

    menuOption.appendChild(sliderGroup);

    options.appendChild(menuOption);
  }

  //generate nodelists of new elements
  const btns = document.querySelectorAll(".btn");
  const sliders = document.querySelectorAll(".slider");

  //Draw image on canvas
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = "./img/static.jpg";
  image.addEventListener("change", renderImage(image));

  function renderImage(image) {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
  }

  //handle file uploads, redraw canvas
  uploader.addEventListener("change", (e) => {
    if (e.target.files) {
      const newImage = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(newImage);
      reader.onloadend = (e) => {
        image.src = e.target.result;
        image.onload = () => {
          renderImage(image);
          resetVals();
        };
      };
    } else {
      alert("Upload failed");
    }
  });

  //Reset all values on upload
  //Keep user on current filter selection
  function resetVals() {
    for (let prop in filters) {
      let newVal = 0;
      switch (prop) {
        case "brightness":
        case "contrast":
        case "opacity":
        case "saturate":
          newVal = 100;
          break;
      }
      filters[prop].applyChange(ctx, image, newVal);
    }

    sliders.forEach((elem) => {
      elem.value = filters[elem.id].currVal;
    });
  }

  //Save Image
  saveBtn.addEventListener("click", () => {
    saveBtn.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    saveBtn.download = "ImageEditor.png";
  });

  //apply filters when user adjusts range slider
  sliders.forEach((elem) => {
    elem.addEventListener("input", (e) => {
      const newVal = e.target.value;
      const selection = e.target.id;
      adjustSettings(newVal, selection);
    });
  });

  //Pass range slider value to selection's applyChange method
  function adjustSettings(newVal, selection) {
    //moveBubble(newVal);
    filters[selection].applyChange(ctx, image, newVal);
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
          elem.firstElementChild.classList.add("slider-hidden");
        }
      });

      //Apply selected styles to current element
      elem.classList.add("selectedBtn");
      elem.firstElementChild.classList.remove("slider-hidden");
      elem.focus();
    });
  });
});
