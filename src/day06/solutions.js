const fs = require("fs");

function getInput() {
  var input = [];
  try {
    var data = fs
      .readFileSync("./resources/day06/input.txt", "UTF-8")
      .split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        // line parsing
        input.push(line);
      }
    });
  } catch (err) {
    console.error(err);
  }

  return input;
}

function findGuardPosition(input) {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "^") {
        return { x, y };
      }
    }
  }
  return { x: -1, y: -1 };
}

function getVisited(input) {
  let { x, y } = findGuardPosition(input);
  const visited = new Set();
  let direction = "up";
  let dx = 0;
  let dy = -1;

  while (true) {
    visited.add(`${x},${y}`);

    if (
      y + dy < 0 ||
      y + dy >= input.length ||
      x + dx < 0 ||
      x + dx >= input[y + dy].length
    ) {
      break;
    }

    if (input[y + dy][x + dx] === "#") {
      if (direction === "up") {
          direction = "right";
          dx = 1;
          dy = 0;
      } else if (direction === "right") {
          direction = "down";
          dx = 0;
          dy = 1;
      } else if (direction === "down") {
          direction = "left";
          dx = -1;
          dy = 0;
      } else if (direction === "left") {
          direction = "up";
          dx = 0;
          dy = -1;
      }
    }

    x += dx;
    y += dy;
  }
  return visited;
}

function solve1() {
  const input = getInput();

  return getVisited(input).size;
}

function solve2() {
  const input = getInput();

  const possibilities = getAltedPathsLooping(input);
  return possibilities.size;
}

function getAltedPathsLooping(input) {
  let { x, y } = findGuardPosition(input);
  let direction = "up";
  let { dx, dy } = getMoveDeltas(direction);
  let possibleAlteredPaths = new Set();

  while (true) {
    if (y + dy < 0 || y + dy >= input.length || x + dx < 0 || x + dx >= input[y + dy].length) {
      break;
    }

    if (input[y + dy][x + dx] === '#') {
      direction = changeDirection(direction);
      let deltas = getMoveDeltas(direction);
      dx = deltas.dx;
      dy = deltas.dy;
      continue;
    }

    let alteredPath = input.map(row => [...row]);
    alteredPath[y + dy][x + dx] = "#";
    if (isPathLooping(alteredPath)) {
      possibleAlteredPaths.add(`${x + dx},${y + dy}`);
    }

    x = x + dx;
    y = y + dy;
  }
  return possibleAlteredPaths;
}


function isPathLooping(input) {
  let { x, y } = findGuardPosition(input);
  let direction = "up";
  let { dx, dy } = getMoveDeltas(direction);
  const visitedDetailed = new Set();

  while (true) {
    if (y + dy < 0 || y + dy >= input.length || x + dx < 0 || x + dx >= input[y + dy].length) {
      break;
    }

    if (visitedDetailed.has(`${x},${y},${direction}`)) {
      return true;
    }
    visitedDetailed.add(`${x},${y},${direction}`);

    if (input[y + dy][x + dx] === '#') {
      direction = changeDirection(direction);
      let deltas = getMoveDeltas(direction);
      dx = deltas.dx;
      dy = deltas.dy;
      continue;
    }

    x = x + dx;
    y = y + dy;
  }
  return false;
}


function changeDirection(currentDirection) {
  const directions = ['up', 'right', 'down', 'left'];
  let index = directions.indexOf(currentDirection);
  index = (index + 1) % 4;
  return directions[index];
}

function getMoveDeltas(direction) {
  const deltas = {
      'up': {dx: 0, dy: -1},
      'right': {dx: 1, dy: 0},
      'down': {dx: 0, dy: 1},
      'left': {dx: -1, dy: 0}
  };
  return deltas[direction];
}

console.log("Part 1:", solve1());
console.log("Part 2:", solve2());
