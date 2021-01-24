export default class Filter {
  //prettier-ignore
  constructor(min, max, currVal, action, unit, label) {
    this.min = min, 
    this.max = max, 
    this.currVal = currVal, 
    this.action = action, 
    this.unit = unit,
    this.label = label
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
}
