const fs = require("fs");

function getInput() {
  var input = [];
  try {
    var data = fs
      .readFileSync("./resources/day08/input.txt", "UTF-8")
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

function solve1() {
  const map = getInput();
  let locations = new Set();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const matches = map[y][x].match(/[a-zA-Z0-9]/);
      if (matches?.length > 0) {
        const antenna = matches[0];
        const sameAntennas = findSameAntennaPositions(x, y, map, antenna);

        sameAntennas.forEach(sameAntenna => {
          const vector = { x: sameAntenna.x - x, y: sameAntenna.y - y };
          const appliedVectorToNextAntenna = { x: sameAntenna.x + vector.x, y: sameAntenna.y + vector.y };
          const appliedReversedVectorToAntenna = { x: x - vector.x, y: y - vector.y };

          if (appliedVectorToNextAntenna.y >= 0 && appliedVectorToNextAntenna.y < map.length && appliedVectorToNextAntenna.x >= 0 && appliedVectorToNextAntenna.x < map[y].length) {
            locations.add(`${appliedVectorToNextAntenna.x},${appliedVectorToNextAntenna.y}`);
          }

          if (appliedReversedVectorToAntenna.y >= 0 && appliedReversedVectorToAntenna.y < map.length && appliedReversedVectorToAntenna.x >= 0 && appliedReversedVectorToAntenna.x < map[y].length) {
            locations.add(`${appliedReversedVectorToAntenna.x},${appliedReversedVectorToAntenna.y}`);
          }
        });
      }
    }
  }
  return locations.size;
}

function findSameAntennaPositions(_x, _y, map, antenna) {
  let sameAntennas = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === antenna && !(x === _x && y === _y)) {
        sameAntennas.push({x, y});
      }
    }
  }
  return sameAntennas;
}

function solve2() {
  const map = getInput();
  let locations = new Set();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const matches = map[y][x].match(/[a-zA-Z0-9]/);
      if (matches?.length > 0) {
        const antenna = matches[0];

        const sameAntennas = findSameAntennaPositions(x, y, map, antenna);

        sameAntennas.forEach(sameAntenna => {
          const vector = { x: sameAntenna.x - x, y: sameAntenna.y - y };

          let startPos = { x, y };
          let appliedVector = { x: startPos.x + vector.x, y: startPos.y + vector.y };

          while (true) {
            if (appliedVector.y >= 0 && appliedVector.y < map.length && appliedVector.x >= 0 && appliedVector.x < map[y].length) {
              locations.add(`${appliedVector.x},${appliedVector.y}`);
            } else {
              break;
            }

            startPos = {...appliedVector}
            appliedVector = { x: startPos.x + vector.x, y: startPos.y + vector.y };
          }
        });
      }
    }
  }

  return locations.size;
}

console.log("Part 1:", solve1());
console.log("Part 2:", solve2());
