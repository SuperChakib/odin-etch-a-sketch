let resetBtn = document.querySelector("#reset");
let monoSelector = document.querySelector("#monoSelector");
let monochromeBtn = document.querySelector("#blackWhite");
let rainbowBtn = document.querySelector("#rainbow");
let darkerBtn = document.querySelector("#darker");
let eraserBtn = document.querySelector("#eraser");
let allBtns = document.querySelectorAll(".modLine");
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
  size >= 1 && size <= 100
    ? drawTable(size)
    : alert("Please enter a dimension between 1 and 100!");
}
let monoColor = "rgb(0, 0, 0)";
function monoLine(e) {
  e.target.style.backgroundColor = monoColor;
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

let drawOption = "mono";
function selectLine(e) {
  if (drawOption === "mono") monoLine(e);
  else if (drawOption === "rainbow") rainbowLine(e);
  else if (drawOption === "darker") darkerLine(e);
  else if (drawOption === "eraser") eraserLine(e);
}

function activeBtn(e) {
  allBtns.forEach((button) => button.classList.remove("active-line"));
  e.target.classList.add("active-line");
}

resetBtn.addEventListener("click", resetTable);
monoSelector.addEventListener("change", (e) => (monoColor = e.target.value));
monochromeBtn.addEventListener("click", () => (drawOption = "mono"));
rainbowBtn.addEventListener("click", () => (drawOption = "rainbow"));
darkerBtn.addEventListener("click", () => (drawOption = "darker"));
eraserBtn.addEventListener("click", () => (drawOption = "eraser"));
allBtns.forEach((button) => button.addEventListener("click", activeBtn));
sizeSelector.addEventListener("change", (e) => drawTable(e.target.value));
sizeSelector.addEventListener("input", (e) =>
  sizeValue.forEach((value) => (value.textContent = e.target.value))
);
//blackWhiteBtn.classList.add("active-line");

drawTable(size);
