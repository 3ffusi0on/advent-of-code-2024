const fs = require("fs");

function getInput() {
  var input = [];
  try {
    var data = fs
      .readFileSync("./resources/day07/input.txt", "UTF-8")
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
  const input = getInput();
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const { value, numbers } = getLineInfo(input[i]);
    if (tryToFindValue(value, numbers[0], numbers.slice(1))) {
      total += value
    }
  }
  return total;
}

function tryToFindValue(value, currentValue, remainingNumbers, withContact = false) {
  if (remainingNumbers.length === 0) {
    return currentValue === value;
  }

  // console.log("value", value, "currentValue", currentValue, "remainingNumbers", remainingNumbers);
  const newCurrentValueWithAddition = currentValue + remainingNumbers[0];
  const newCurrentValueWithMultiplication = currentValue * remainingNumbers[0];
  if (withContact) {
    const newCurrentValueWithConcat = parseInt('' + currentValue + remainingNumbers[0]);
    const newRemainingNumbers = remainingNumbers.slice(1);
    return (
      tryToFindValue(value, newCurrentValueWithAddition, newRemainingNumbers, withContact) ||
      tryToFindValue(value, newCurrentValueWithMultiplication, newRemainingNumbers, withContact) ||
      tryToFindValue(value, newCurrentValueWithConcat, newRemainingNumbers, withContact)
    );
  }

  const newRemainingNumbers = remainingNumbers.slice(1);

  return (
    tryToFindValue(value, newCurrentValueWithAddition, newRemainingNumbers) ||
    tryToFindValue(value, newCurrentValueWithMultiplication, newRemainingNumbers)
  );
}

function getLineInfo(line) {
  const match = line.match(/(\d+): ((?:\d+\s*)+)/);
  const value = Number(match[1]);
  const numbers = match[2].trim().split(/\s+/).map(Number);
  return { value, numbers };
}

function solve2() {
  const input = getInput();
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const { value, numbers } = getLineInfo(input[i]);
    if (tryToFindValue(value, numbers[0], numbers.slice(1), true)) {
      total += value
    }
  }
  return total;
}

// Wrong implementation -> "All operators are still evaluated left-to-right" GG, you got me...
function tryToFindValueWithConcat(value, currentValue, previousNumber, remainingNumbers) {
  if (remainingNumbers.length === 0) {
    return currentValue === value;
  }

  const newCurrentValueWithAddition = currentValue + remainingNumbers[0];
  const newCurrentValueWithMultiplication = currentValue * remainingNumbers[0];

  if (remainingNumbers.length > 1) {
    const newCurrentValueWithConcat =  parseInt('' + previousNumber + remainingNumbers[0]);
    const newRemainingNumbers = remainingNumbers.slice(1);
    return (
      tryToFindValueWithConcat(value, newCurrentValueWithAddition, remainingNumbers[0], newRemainingNumbers) ||
      tryToFindValueWithConcat(value, newCurrentValueWithMultiplication, remainingNumbers[0], newRemainingNumbers) ||
      tryToFindValueWithConcat(value, newCurrentValueWithConcat, newCurrentValueWithConcat, newRemainingNumbers)
    );
  } else {
    return (
      newCurrentValueWithAddition === value ||
      newCurrentValueWithMultiplication === value ||
      parseInt('' + previousNumber + remainingNumbers[0]) === value
    );
  }
}

console.log("Part 1:", solve1());
console.log("Part 2:", solve2());
