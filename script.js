let resetBtn = document.querySelector("#reset");
let blackWhiteBtn = document.querySelector("#blackWhite");
let rainbowBtn = document.querySelector("#rainbow");
let darkerBtn = document.querySelector("#darker");
let eraserBtn = document.querySelector("#eraser");
let sizeSelector = document.querySelector("#sizeSelector");
let sizeValue = document.querySelectorAll(".sizeValue");
let container = document.querySelector("div.container");
let size = 16;
function drawTable(size) {
  container.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    let square = document.createElement("div");
    square.style.width = `${600 / size}px`;
    square.style.height = `${600 / size}px`;
    square.classList = "square";
    square.style.backgroundColor = "rgb(255, 255, 255)";
    container.appendChild(square);
  }
  container.childNodes.forEach((elem) =>
    elem.addEventListener("mouseover", selectLine)
  );
  sizeSelector.value = size;
  sizeValue.forEach((value) => (value.textContent = size));
}
function resetTable() {
  size = prompt("What dimensions?");
  size > 100
    ? alert("Dimensions are too big! Do not exceed 100!")
    : drawTable(size);
}
function blackLine(e) {
  e.target.style.backgroundColor = "rgb(0, 0, 0)";
}
function rainbowLine(e) {
  e.target.removeAttribute("data-darker-offset");
  const randomColor = () => Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()}`;
  e.target.style.borderColor = "black";
}
function darkerLine(e) {
  let colorsArray = e.target.style.backgroundColor.slice(4, -1).split(", ");
  if (!e.target.getAttribute("data-darker-offset")) {
    let offsetArray = colorsArray.map((color) => (color * 10) / 100);
    e.target.setAttribute("data-darker-offset", offsetArray);
  }
  offsetArray = e.target.getAttribute("data-darker-offset").split(",");
  const darker = (index) => Math.floor(colorsArray[index] - offsetArray[index]);
  e.target.style.backgroundColor = `rgb(${darker(0)},${darker(1)},${darker(
    2
  )})`;
}
function eraserLine(e) {
  e.target.style.backgroundColor = "rgb(255, 255, 255)";
}

let drawOption = "B&W";
function selectLine(e) {
  if (drawOption === "B&W") blackLine(e);
  else if (drawOption === "rainbow") rainbowLine(e);
  else if (drawOption === "darker") darkerLine(e);
  else if (drawOption === "eraser") eraserLine(e);
}

resetBtn.addEventListener("click", resetTable);
blackWhiteBtn.addEventListener("click", () => (drawOption = "B&W"));
rainbowBtn.addEventListener("click", () => (drawOption = "rainbow"));
darkerBtn.addEventListener("click", () => (drawOption = "darker"));
eraserBtn.addEventListener("click", () => (drawOption = "eraser"));
sizeSelector.addEventListener("change", (e) => drawTable(e.target.value));
sizeSelector.addEventListener("input", (e) =>
  sizeValue.forEach((value) => (value.textContent = e.target.value))
);
//blackWhiteBtn.classList.add("active-line");

drawTable(size);
