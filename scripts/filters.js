export default class Filter {
  //prettier-ignore
  constructor(min, max, currVal, action, unit) {
    this.min = min, 
    this.max = max, 
    this.currVal = currVal, 
    this.action = action, 
    this.unit = unit
  }

  //Function to add filters to image element
  applyChange = (ctx, image, value) => {
    //do not allow values larger than max
    value = value <= this.max ? value : this.max;

    //Filter to be applied
    const newFilter = `${this.action}(${value}${this.unit})`;

    //Establish filter if none exists
    if (ctx.filter === "none") {
      ctx.filter = newFilter;
    }

    //Check if current selection already exists
    //Update string if filter has already been applied
    //Otherwise append new filter to existing style
    if (ctx.filter.indexOf(this.action) !== -1) {
      const index = ctx.filter.indexOf(this.action);
      const lastIndex = ctx.filter.indexOf(")", index) + 1;
      const subStr = ctx.filter.substring(index, lastIndex);
      const updatedFilter = ctx.filter.replace(subStr, newFilter);

      ctx.filter = updatedFilter;
    } else {
      ctx.filter += newFilter;
    }

    //Update current value of selection
    this.currVal = value;

    ctx.drawImage(image, 0, 0);
  };

  //Update range slider based on current selection
  changeSelection = (sliderMin, sliderMax, slider, currentFilter, filterText, sliderBubble) => {
    const newVal = (this.currVal / this.max) * 100;
    sliderMin.textContent = this.min;
    sliderMax.textContent = this.max;
    currentFilter.textContent = filterText.toUpperCase();
    sliderBubble.textContent = this.currVal;
    sliderBubble.style.left = `calc(${newVal}% + (${7 - newVal * 0.15}px))`;
    slider.min = this.min;
    slider.max = this.max;
    slider.value = this.currVal;
  };
}
