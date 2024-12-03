const puzzleGrid = document.getElementById("grid");
let puzzleTiles = [
  'puzzle_image/img1.jpg',
  'puzzle_image/img2.jpg',
  'puzzle_image/img3.jpg',
  'puzzle_image/img4.jpg',
  'puzzle_image/img5.jpg',
  'puzzle_image/img6.jpg',
  'puzzle_image/img7.jpg',
  'puzzle_image/img8.jpg',
  null // Empty space
];

function moveTileToEmpty(tileIndex) {
  const emptyIndex = puzzleTiles.indexOf(null);
  const possibleMoves = getAvailableMoves(emptyIndex);
  const adjacentMoves = getExtendedMoves(possibleMoves);

  if (possibleMoves.includes(tileIndex) || adjacentMoves.includes(tileIndex)) {
    [puzzleTiles[tileIndex], puzzleTiles[emptyIndex]] = [puzzleTiles[emptyIndex], puzzleTiles[tileIndex]];
    updateGrid();
  }
}

function getAvailableMoves(emptyIndex) {
  const moves = [];
  const row = Math.floor(emptyIndex / 3);
  const col = emptyIndex % 3;

  if (row > 0) moves.push(emptyIndex - 3); // Up
  if (row < 2) moves.push(emptyIndex + 3); // Down
  if (col > 0) moves.push(emptyIndex - 1); // Left
  if (col < 2) moves.push(emptyIndex + 1); // Right

  return moves;
}

function getExtendedMoves(validMoves) {
  const extendedMoves = new Set();

  puzzleTiles.forEach((tile, i) => {
    // Skip if the current tile is null (i.e., empty or invalid)
    if (tile !== null) {
      // Find all valid moves that can reach the current tile index
      const adjacentValidMoves = validMoves.filter(validMove =>
        getAvailableMoves(validMove).includes(i)
      );

      // If the current tile is adjacent to at least two valid moves, add it
      if (adjacentValidMoves.length >= 2) {
        extendedMoves.add(i); // Add the tile index to the set
      }
    }
  });

  // Convert the set to an array and return it
  return [...extendedMoves];
}


function checkSolvability(arr) {
  let inversionCount = 0;
  const tileNumbers = arr
    .filter(tile => tile !== null)
    .map(tile => parseInt(tile.match(/\d+/)[0]));

  for (let i = 0; i < tileNumbers.length - 1; i++) {
    for (let j = i + 1; j < tileNumbers.length; j++) {
      if (tileNumbers[i] > tileNumbers[j]) inversionCount++;
    }
  }

  return inversionCount % 2 === 0;
}

function shufflePuzzle() {
  let shuffledTiles;
  do {
    shuffledTiles = [...puzzleTiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }
  } while (!checkSolvability(shuffledTiles));

  puzzleTiles = shuffledTiles;
  updateGrid();
}

// Solve the puzzle and arrange tiles in the correct order
function solvePuzzle() {
  puzzleTiles = [
    null, 'puzzle_image/img8.jpg', 'puzzle_image/img7.jpg',
    'puzzle_image/img6.jpg', 'puzzle_image/img5.jpg', 'puzzle_image/img4.jpg',
    'puzzle_image/img3.jpg', 'puzzle_image/img2.jpg', 'puzzle_image/img1.jpg'
  ];
  updateGrid();
}

function updateGrid() {
  puzzleGrid.innerHTML = "";
  puzzleTiles.forEach((tile, index) => {
    const tileDiv = document.createElement("div");
    tileDiv.className = tile === null ? "tile empty" : "tile";

    if (tile) {
      const image = document.createElement("img");
      image.src = tile;
      tileDiv.appendChild(image);
    }

    tileDiv.addEventListener("click", () => moveTileToEmpty(index));
    puzzleGrid.appendChild(tileDiv);
  });
}

document.getElementById("shuffle").addEventListener("click", shufflePuzzle);
document.getElementById("solve").addEventListener("click", solvePuzzle);

updateGrid();
