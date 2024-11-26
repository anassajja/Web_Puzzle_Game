const grid = document.getElementById('grid'); // Get the grid element

// Array of tile images, with one slot being null for the empty space
let tiles = [
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

// Function to render the grid
function renderGrid() {
  grid.innerHTML = ''; // Clear existing grid
  tiles.forEach((tile, index) => { // Loop through each tile
    const tileDiv = document.createElement('div'); // Create a div element for each tile
    tileDiv.className = tile === null ? 'tile empty' : 'tile'; // Set the class for empty space

    if (tile) { // If the tile is not empty, create an image element
      const img = document.createElement('img'); // If the tile is not empty, create an image element
      img.src = tile; // Set the image source
      tileDiv.appendChild(img); // Append the image to the tile div
    }

    tileDiv.addEventListener('click', () => moveTile(index)); // Add click event to move the tile
    grid.appendChild(tileDiv); // Append the tile div to the grid
  }); 
}

// Initial render
renderGrid();

// Function to move the tile into the empty space
function moveTile(index) { // Function to move the tile into the empty space
  const emptyIndex = tiles.indexOf(null); // Get the index of the empty space
  const validMoves = [index - 1, index + 1, index - 3, index + 3]; // Adjacent indices: left, right, up, down

  // Check if the move is valid and the empty space is adjacent
  if (validMoves.includes(emptyIndex) && isValidPosition(index, emptyIndex)) { // Check if the move is valid and the empty space is adjacent
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]]; // Swap the tiles
    renderGrid(); // Re-render the grid with the updated positions
  }
}

// Check if the move is within bounds (no wrapping around rows)
function isValidPosition(index, emptyIndex) { // Check if the move is within bounds (no wrapping around rows)
  if (index % 3 === 0 && emptyIndex === index - 1) return false; // Left edge
  if (index % 3 === 2 && emptyIndex === index + 1) return false; // Right edge
  return true; // Valid move
}

// Shuffle the tiles
document.getElementById('random').addEventListener('click', () => { // Add click event to shuffle the tiles
  // Shuffle tiles randomly while keeping the empty space intact
  do { // Keep shuffling until the puzzle is solvable
    tiles = tiles // Shuffle tiles randomly while keeping the empty space intact
      .map(value => ({ value, sort: Math.random() })) // Randomize tiles
      .sort((a, b) => a.sort - b.sort) // Sort the tiles
      .map(({ value }) => value); // Get the sorted tiles
  } while (isPuzzleSolvable() === false); // Ensure the puzzle is solvable
  renderGrid(); // Re-render the grid with shuffled tiles
});

// Check if the puzzle is solvable (optional)
function isPuzzleSolvable() { // Count the number of inversions
  let inversions = 0;   // Count the number of inversions
  const flatTiles = tiles.filter(t => t !== null); // Flatten the tiles and remove the empty space
  for (let i = 0; i < flatTiles.length; i++) { // Count inversions
    for (let j = i + 1; j < flatTiles.length; j++) { // Count inversions
      if (flatTiles[i] > flatTiles[j]) inversions++; // Count inversions
    }
  }
  return inversions % 2 === 0; // Puzzle is solvable if inversions are even
}

// Resolve the puzzle (reset to the solved state)
document.getElementById('resolve').addEventListener('click', () => { // Add click event to resolve the puzzle
  tiles = [
    null, // Empty space
    'puzzle_image/img8.jpg',
    'puzzle_image/img7.jpg',
    'puzzle_image/img6.jpg',
    'puzzle_image/img5.jpg',
    'puzzle_image/img4.jpg',
    'puzzle_image/img3.jpg',
    'puzzle_image/img2.jpg',
    'puzzle_image/img1.jpg'
  ];
  renderGrid(); // Re-render the grid to its solved state
});
