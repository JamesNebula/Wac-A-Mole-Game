let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

// when page loads run setgame function i.e (start game)
window.onload = function () {
  setGame();
};

// construct the setGame function
function setGame() {
  // set up the grid for the game board in html (9 tunnels)
  for (let i = 0; i < 9; i++) {
    // create new divs
    let tile = document.createElement("div");
    // give new divs an id (i.toString is giving new id's from 0-8)
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    // insert the new tags inside the "board" div
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000); // show randomised mole every 1 seconds
  setInterval(setPlant, 2000); // show randomised mole every 2 seconds
}

// place mole on random tile
function getRandomTile() {
  // math.random returns number between 0-1 if we multiply by 9 the range becomes 0-9 then we round it down using math.floor we get an integer from 0 - 8
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

// mole character setup
function setMole() {
  // if the game is over dont set new mole
  if (gameOver) {
    return;
  }

  // clear previous tile(if mole moves to another hole it clears the last one)
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  // place mole on random tile
  let num = getRandomTile();

  // make sure both characters are not landing on same hole
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }

  // now we have a random number we are going to set the mole img to it
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

// create plant character
function setPlant() {
  // if the game is over dont set new plant
  if (gameOver) {
    return;
  }

  // clear previous tile(if plant moves to another hole it clears the last one)
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  // place plant on random tile
  let num = getRandomTile();

  // make sure both characters are not landing on same hole
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }

  // now we have a random number we are going to set the mole img to it
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  // if the game is over dont select new tile
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    // add 10 points to score
    score += 10;
    document.getElementById("score").innerText = score.toString(); // update score

    // if plant is clicked the game is over
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
  }
}
