let ids = [];
let checkCount = 0;
let penalty = 0;
let lastCheck = 0;
let gameOver = false;

bonus;
let trapLocation = Math.floor(Math.random() * 25);
let treasureLocation;
do {
  treasureLocation = Math.floor(Math.random() * 25);
} while (treasureLocation === trapLocation);

const penaltyElement = document.getElementById("penalty");

for (let i = 0; i < 25; i++) {
  ids.push(`card-${i}`);
}

//step 11
const check = (position) => {
  if (!gameOver) {
    const cardElement = document.getElementById(ids[position]);
    // change src
    if (position === treasureLocation) {
      cardElement.src = "treasure.jpg";
      gameOver = true;
      penalty -= 3;
    } else if (position === trapLocation) {
      cardElement.src = "trap.jpg";
      gameOver = true;
      penalty += 4;
    } else {
      cardElement.src = "Skull.jpg";
    }

    checkCount++;
    penalty++;
    lastCheck = position;
    document.getElementById(
      "location"
    ).textContent = `Number of locations checked is ${checkCount}`;
    penaltyElement.textContent = `Penalty is ${penalty}`;
  }
};
//step 12
const help = () => {
  if (gameOver) return;
  const rowTreasurePosition = Math.floor(treasureLocation / 5);
  const rowLastCheckPosition = Math.floor(lastCheck / 5);
  const colTreasurePosition = treasureLocation % 5;
  const colLastCheckPosition = lastCheck % 5;
  const rowDiff = Math.abs(rowTreasurePosition - rowLastCheckPosition);
  const colDiff = Math.abs(colTreasurePosition - colLastCheckPosition);
  let helpText = "";
  if (rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0)) {
    helpText = "Can smell it";
  } else if (rowDiff + colDiff === 2) {
    helpText = "Close Matie";
    penalty += 2;
  } else {
    helpText = "Step faster";
    penalty += 2;
  }
  document.getElementById("help").textContent = `Help report: ${helpText}`;
  penaltyElement.textContent = `Penalty is ${penalty}`;
};

const reset = () => {
  checkCount = 0;
  penalty = 0;
  lastCheck = 0;
  gameOver = false;

  trapLocation = Math.floor(Math.random() * 25);
  treasureLocation = Math.floor(Math.random() * 25);
  while (trapLocation === treasureLocation) {
    treasureLocation = Math.floor(Math.random() * 25);
  }
  document.getElementById("location").textContent =
    "Number of location checked is zero";
  penaltyElement.textContent = "Penalty is zero";
  document.getElementById("help").textContent = "Help report";
};
