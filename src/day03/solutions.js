const fs = require('fs')

function readFile(fileName) {
  let lines = [];
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


function solve1() {
  const lines = readFile('./resources/day03/input.txt');
  const regex = /mul\(\d{1,3},\d{1,3}\)/mg;
  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    const input = lines[i];
    let matches = input.match(regex);
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];
      let nums = match.match(/\d{1,3}/g);
      result += parseInt(nums[0]) * parseInt(nums[1]);
    }
  }
  return result;

}



function solve2() {
  const lines = readFile('./resources/day03/input.txt');
  const regex = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/mg;
  let enabled = true
  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    const input = lines[i];
    let matches = input.match(regex);
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];
      if (match === 'do()') {
        enabled = true
      } else if (match === "don't()") {
        enabled = false;
      } else {
        if (!enabled) {
          continue;
        }
        let nums = match.match(/\d{1,3}/g);
        result += parseInt(nums[0]) * parseInt(nums[1])
      }
    }
  }

  return result
}



console.log(solve1())
console.log(solve2())
