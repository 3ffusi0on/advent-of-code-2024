const fs = require('fs')

function readFile(fileName) {
  var orderingRules = [];
  var updates = [];

  try {
    const data = fs.readFileSync(fileName, 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {

        if (line.match(/\|/)) {
          orderingRules.push(line.match(/\d+/g).map(Number));
        } else {
          updates.push(line.match(/\d+/g).map(Number));
        }

      }
    });
  } catch (err) {
      console.error(err);
  }
  return {orderingRules, updates};
}


function solve1() {
  const {orderingRules, updates} = readFile('./resources/day05/input.txt');
  var total = 0;
  var valid;
  for (let i = 0; i < updates.length; i++) {
    valid = true;
    for (let j = 0; j < updates[i].length; j++) {
      if (!validateRules(updates[i][j], orderingRules, updates[i])) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      continue;
    }
    total += updates[i][Math.floor((updates[i].length -1) / 2)]

  }
  return total
}

function validateRules(number, orderingRules, currentUpdate) {
  let valid = true;
  const numberIndex = currentUpdate.indexOf(number);
  for (let i = 0; i < orderingRules.length; i++) {
    const rule = orderingRules[i];
    const compatisonIndex = currentUpdate.indexOf(rule[1])
    if (compatisonIndex === -1) {
      continue
    }
    if (number === rule[0] && numberIndex < compatisonIndex) {
      // console.log("Valid:", number, rule)
      valid &= true;
    } else if (number === rule[0] && number > compatisonIndex) {
      // console.log("Invalid:", number, rule)
      valid = false;
    }
  }
  return valid;
}


function solve2() {
  const {orderingRules, updates} = readFile('./resources/day05/input.txt');
  var total = 0;
  const fixedUpdates = new Set();

  var iterator = 1;

  for (let i = 0; i < updates.length; i = i + iterator) {
    iterator = 1;
    for (let j = 0; j < updates[i].length; j++) {
      const newUpdate = validateRulesOrSwitch(updates[i][j], orderingRules, updates[i])
      if (newUpdate !== null) {
        fixedUpdates.add(i)
        iterator = 0;
        break;
      }
    }
  }

  fixedUpdates.forEach((index) => {
    total += updates[index][Math.floor((updates[index].length -1) / 2)]
  })
  return total
}

function validateRulesOrSwitch(number, orderingRules, currentUpdate) {
  const numberIndex = currentUpdate.indexOf(number);
  for (let i = 0; i < orderingRules.length; i++) {
    const rule = orderingRules[i];
    const compatisonIndex = currentUpdate.indexOf(rule[1])
    if (compatisonIndex === -1) {
      continue
    }
    if (number === rule[0] && numberIndex < compatisonIndex) {
      continue
    } else if (number === rule[0] && number > compatisonIndex) {
      const temp = currentUpdate[numberIndex]
      currentUpdate[numberIndex] = currentUpdate[compatisonIndex]
      currentUpdate[compatisonIndex] = temp
      return currentUpdate
    }
  }
  return null;
}

// console.log("Part 1:", solve1())
console.log("Part 2:", solve2())
