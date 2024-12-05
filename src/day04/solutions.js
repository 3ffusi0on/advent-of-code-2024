const fs = require('fs')

function readFile(fileName) {
  var lines = [];
  try {
    const data = fs.readFileSync(fileName, 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        lines.push(line);
      }
    });
  } catch (err) {
      console.error(err);
  }
  return lines;
}

var input = [];
const word = 'XMAS';
function solve1() {
  input = readFile('./resources/day04/input.txt');
  var valid = 0;

  for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[y].length; x++) {
      if (input[y][x] === word[0]) {
        // search in all 8 possible directions
        if (searchWord(x, y, 0, 1, 0)) { valid++; }// right
        if (searchWord(x, y, 0, -1, 0)) { valid++; }// left
        if (searchWord(x, y, 0, 0, 1)) { valid++; }// down
        if (searchWord(x, y, 0, 0, -1)) { valid++; }// up
        if (searchWord(x, y, 0, 1, 1)) { valid++; }// diagonally down-right
        if (searchWord(x, y, 0, -1, 1)) { valid++; }// diagonally down-left
        if (searchWord(x, y, 0, -1, -1)) { valid++; }// diagonally up-left
        if (searchWord(x, y, 0, 1, -1)) { valid++; }// diagonally up-right
      }
    }
  }
  return valid;
}

function searchWord(x, y, level, dx, dy) {
  if (input[y][x] !== word[level]) {
    return false;
  }
  if (level === word.length - 1) {
    return true;
  }
  var newX = x + dx;
  var newY = y + dy;
  if (newX >= 0 && newX < input[0].length && newY >= 0 && newY < input.length) {
    return searchWord(newX, newY, level + 1, dx, dy);
  }
  return false;
}

function solve2() {
  var input = readFile('./resources/day04/input.txt');
  var valid = 0;

  for (var y = 1; y < input.length - 1; y++) {
    for (var x = 1; x < input[y].length - 1 ; x++) {
      if (input[y][x] === 'A') {
        // search diagonals up to down
        if (input[y - 1][x - 1] === 'M' && input[y + 1][x + 1] === 'S' &&
            input[y - 1][x + 1] === 'M' && input[y + 1][x - 1] === 'S') {
          valid++; continue;
        }
        // search diagonals down to up
        if (input[y - 1][x - 1] === 'S' && input[y + 1][x + 1] === 'M' &&
            input[y - 1][x + 1] === 'S' && input[y + 1][x - 1] === 'M') {
          valid++; continue;
        }
        // search diagonals left to right
        if (input[y - 1][x - 1] === 'M' && input[y + 1][x + 1] === 'S' &&
            input[y - 1][x + 1] === 'S' && input[y + 1][x - 1] === 'M') {
          valid++; continue;
        }
        // search diagonals down to up
        if (input[y - 1][x - 1] === 'S' && input[y + 1][x + 1] === 'M' &&
            input[y - 1][x + 1] === 'M' && input[y + 1][x - 1] === 'S') {
          valid++; continue;
        }
      }
    }
  }
  return valid;
}

console.log("Part 1:", solve1())
console.log("Part 2:", solve2())
