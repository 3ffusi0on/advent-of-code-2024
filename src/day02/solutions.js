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

function solve1() {
  var lines = readFile('./resources/day02/input.txt');
  var reports = [];

  for (var i = 0; i < lines.length ; i++) {
    const digits = lines[i].split(" ").map((val) => parseInt(val));
    reports.push(digits);
  }

  var validCount = 0;
  for (var i = 0; i < reports.length ; i++) {

    validCount += isValidReportLine(reports[i]) ? 1 : 0;
  }
  return validCount;
}

function isValidReportLine(report) {
  let valid = false
    const increasing = report.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val);
    const decreasing = report.every((val, idx, arr) => idx === 0 || arr[idx - 1] > val);

    for (var j = 0; j < report.length -1; j++) {
      if ((increasing || decreasing) && Math.abs(report[j] - report[j + 1]) <= 3 && Math.abs(report[j] - report[j + 1]) >= 1) {
        valid = true;
      } else {
        valid = false;
        break;
      }
    }
    return valid;
}

function solve2() {
  var lines = readFile('./resources/day02/input.txt');
  var reports = [];

  for (var i = 0; i < lines.length ; i++) {
    const digits = lines[i].split(" ").map((val) => parseInt(val));
    reports.push(digits);
  }


  var validCount = 0;
  for (var i = 0; i < reports.length ; i++) {
    let valid = false
    const report = reports[i];

    const increasingErrors = new Set();
    const increasing = report.every((val, idx, arr) => {
      if (idx === 0 || arr[idx - 1] < val) {
        return true;
      } else {
        increasingErrors.add(idx);
        return false;
      }
    });

    const decreasingErrors = new Set();
    const decreasing = report.every((val, idx, arr) => {
      if (idx === 0 || arr[idx - 1] > val) {
        return true;
      } else {
        decreasingErrors.add(idx);
        return false;
      }
    });

    for (var j = 0; j < report.length -1; j++) {
      if (Math.abs(report[j] - report[j + 1]) <= 3 && Math.abs(report[j] - report[j + 1]) >= 1) {
        valid &= true;
      } else {
        valid &= false;
        increasingErrors.add(j);
        decreasingErrors.add(j);
      }
    }

    if ((increasing || decreasing) && valid) {
      console.log(`Report ${report} is valid`);
      validCount += 1;
    } else if (increasingErrors.size > 2 && decreasingErrors.size > 2) {
      console.log(`Report ${report} is invalid because of increasing errors: ${[...increasingErrors]} and decreasing errors: ${[...decreasingErrors]}`);
    } else if (decreasingErrors.size > 2) {
      console.log(`Report ${report} is invalid because of decreasing errors: ${[...decreasingErrors]}`);
    } else if (increasingErrors.size > 2) {
      console.log(`Report ${report} is invalid because of increasing errors: ${[...increasingErrors]}`);
    } else {
      let reportCopy = [...report];
      reportCopy.splice([...increasingErrors][0], 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }
      reportCopy = [...report];
      reportCopy.splice([...increasingErrors][0] -1, 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }
      reportCopy = [...report];
      reportCopy.splice([...increasingErrors][0] +1, 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }

      reportCopy = [...report];
      reportCopy.splice([...decreasingErrors][0], 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }
      reportCopy = [...report];
      reportCopy.splice([...decreasingErrors][0] -1, 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }
      reportCopy = [...report];
      reportCopy.splice([...decreasingErrors][0] +1, 1);
      if (isValidReportLine(reportCopy)) {
        validCount += 1;
        continue
      }

      console.log(`Report ${report} is complitly invalid`);

    }
  }
  return validCount;
}

// console.log(solve1())
console.log(solve2())
