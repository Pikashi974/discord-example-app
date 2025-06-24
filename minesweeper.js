/**
 *
 * @param {number} size
 * @param {number} bombs
 */
export function MineSweeper(size, bombs) {
  // We want the grid to have at least a 2x2 size

  if (size < 2) {
    throw new Error("Size can't be under 2");
  }
  if (bombs >= Math.pow(size, 2)) {
    throw new Error("Too many bombs for this size");
  }
  // We create the square that will serve as minesweeper
  let grid = Array.from({ length: size }, (x, i) =>
    Array.from({ length: size }, (x, i) => 0)
  );
  let index = 0;
  let positions = [];
  // We place bombs randomly (and try until all are placed)
  while (index < bombs) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    if (grid[x][y] != -1) {
      grid[x][y] = -1;
      index += 1;
      // We save the coordinates for the "warning" parts
      positions.push([x, y]);
    }
  }
  //   console.log(positions);
  // Warning : for x, you choose the array in the grid, then y choose the position in said array
  // It doesn't actually follow x,y coordinates in graphs
  positions.forEach((position) => {
    let [x, y] = position;
    // Since the grid is a square, we can check if we leave using grid.length
    let maxX = x + 1 >= grid.length;
    let maxY = y + 1 >= grid.length;
    // We can check if we leave using 0
    let minX = x == 0;
    let minY = y == 0;
    // Check for corners
    // If there's a bomb next to another, we don't increment the zone
    if (minX && minY) {
      // Upper left
      grid[0][1] = grid[0][1] == -1 ? -1 : grid[0][1] + 1;
      grid[1][0] = grid[1][0] == -1 ? -1 : grid[1][0] + 1;
      grid[1][1] = grid[1][1] == -1 ? -1 : grid[1][1] + 1;
    } else if (maxX && maxY) {
      //Lower right
      grid[x][y - 1] = grid[x][y - 1] == -1 ? -1 : grid[x][y - 1] + 1;
      grid[x - 1][y] = grid[x - 1][y] == -1 ? -1 : grid[x - 1][y] + 1;
      grid[x - 1][y - 1] = grid[x][y - 1] == -1 ? -1 : grid[x - 1][y - 1] + 1;
    } else if (minX && maxY) {
      // Upper right
      grid[0][y - 1] = grid[0][y - 1] == -1 ? -1 : grid[0][y - 1] + 1;
      grid[1][y] = grid[1][y] == -1 ? -1 : grid[1][y] + 1;
      grid[1][y - 1] = grid[1][y - 1] == -1 ? -1 : grid[1][y - 1] + 1;
    } else if (maxX && minY) {
      // Lower left
      grid[x][1] = grid[x][1] == -1 ? -1 : grid[x][1] + 1;
      grid[x - 1][0] = grid[x - 1][0] == -1 ? -1 : grid[x - 1][0] + 1;
      grid[x - 1][1] = grid[x - 1][1] == -1 ? -1 : grid[x - 1][1] + 1;
    }
    // Bomb is on the top side of the square
    else if (minX) {
      // We will pass over 2 lines and increase all non-bombs
      for (let index = y - 1; index <= y + 1; index++) {
        grid[0][index] = grid[0][index] == -1 ? -1 : grid[0][index] + 1;
        grid[1][index] = grid[1][index] == -1 ? -1 : grid[1][index] + 1;
      }
    }
    // Bomb is on the bottom side of the square
    else if (maxX) {
      for (let index = y - 1; index <= y + 1; index++) {
        grid[x][index] = grid[x][index] == -1 ? -1 : grid[x][index] + 1;
        grid[x - 1][index] =
          grid[x - 1][index] == -1 ? -1 : grid[x - 1][index] + 1;
      }
    }
    // Bomb is on the left side of the square
    else if (minY) {
      for (let index = x - 1; index <= x + 1; index++) {
        grid[index][0] = grid[index][0] == -1 ? -1 : grid[index][0] + 1;
        grid[index][1] = grid[index][1] == -1 ? -1 : grid[index][1] + 1;
      }
    }
    // Bomb is on the right side of the square
    else if (maxY) {
      for (let index = x - 1; index <= x + 1; index++) {
        grid[index][y] = grid[index][y] == -1 ? -1 : grid[index][y] + 1;
        grid[index][y - 1] = grid[index][1] == -1 ? -1 : grid[index][y - 1] + 1;
      }
    }
    // Bomb is surrounded by 8 squares
    else {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          grid[i][j] = grid[i][j] == -1 ? -1 : grid[i][j] + 1;
        }
      }
    }
  });
  return grid;
}

// console.log(MineToString(MineSweeper(6, 8)));

/**
 *
 * @param {Array} grid
 * @returns
 */
export function MineToString(grid) {
  let texte = "";
  for (let index = 0; index < grid.length; index++) {
    const element = grid[index];
    element.forEach((row) => {
      texte += row == -1 ? `||:bocchithepipebomb:||` : `||:number_${row}:||`;
    });
    texte += "\n";
  }
  return texte;
}
