const fs = require('fs')

function readFile(fileName) {
  var lines = [];
  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const content = data.split(/\r?\n/);
    content.forEach((line) => {
      if (line.length > 0) {
        lines.push(line);
      }
    });
  } catch (err) {
    console.error(err);
  }
  return lines;
}

function solve1() {
  var list1 = [];
  var list2 = [];
  var difference = 0;

  var lines = readFile('./resources/day01/input.txt');
  for (var i = 0; i < lines.length ; i++) {
    const digits = lines[i].split("   ");
    list1.push(parseInt(digits[0]));
    list2.push(parseInt(digits[1]));
  }

  list1.sort(function(a, b){return a-b});
  list2.sort(function(a, b){return a-b});

  for (var i = 0; i < list1.length ; i++) {
    difference += Math.abs(list1[i] - list2[i]);
  }

  return difference;
}

function solve2() {
  var list1 = [];
  var list2 = [];
  var difference = 0;

  var lines = readFile('./resources/day01/input.txt');
  for (var i = 0; i < lines.length ; i++) {
    const digits = lines[i].split("   ");
    list1.push(parseInt(digits[0]));
    list2.push(parseInt(digits[1]));
  }

  var count = {};
  list2.forEach(function(i) { count[i] = (count[i]||0) + 1; });

  for (var i = 0; i < list1.length ; i++) {
    difference += list1[i] * (count[list1[i]] || 0);
  }

  return difference;
}

console.log(solve1())
console.log(solve2())
