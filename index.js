const fs = require('fs');

const data = fs.readFileSync('words.txt', 'utf8').split('\n');

let letterRanking = Array(26).fill(0);
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        letterRanking[data[i][j].charCodeAt(0) - 97]++;
    }
}
console.log("ranking", letterRanking);

let wordRanking = [];
for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < data[i].length; j++) {
        sum += letterRanking[data[i][j].charCodeAt(0) - 97];
    }
    wordRanking[i] = [data[i], sum];
}

wordRanking.sort((a, b) => {
    const hasRepeatA = hasRepeatedLetters(a[0]);
    const hasRepeatB = hasRepeatedLetters(b[0]);
    if (hasRepeatA && !hasRepeatB) {
        return 1;
    } else if (!hasRepeatA && hasRepeatB) {
        return -1;
    }
    return b[1] - a[1];
});

let firstGuess = wordRanking[0][0];
console.log("First Try", firstGuess);
let feedback = 'xxxux';



// Second Try
let knownPos = ['.', '.', '.', '.', '.'];
let unknownLets = ['', '', '', '', ''];
let shouldntLets = [];

for (let i = 0; i < 5; i++) {
    if (feedback[i] == 'y') knownPos[i] = firstGuess[i];
    else if (feedback[i] == 'u') unknownLets[i] += firstGuess[i]
    else if (feedback[i] == 'x') shouldntLets.push(firstGuess[i])
}
console.log("Knowns", knownPos);
console.log("Unknowns", unknownLets);
console.log("Shouldnt", shouldntLets);

let regStr = '^'
for (let i = 0; i < 5; i++) {
    if (knownPos[i] != '.') regStr += knownPos[i];
    else {
        regStr += `[^${unknownLets[i]}${shouldntLets.join('')}]`
    }
}

let reg = new RegExp(regStr + '$')

let filteredData = wordRanking.filter(word => word[0].match(reg));
for (let i = 0; i < unknownLets.length; i++) {
    filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
}
let secondGuess = filteredData[0][0];
console.log(filteredData);
console.log("Second Try", secondGuess);
feedback = 'yyxxx';


// Third Try
for (let i = 0; i < 5; i++) {
    if (feedback[i] == 'y') knownPos[i] = secondGuess[i];
    else if (feedback[i] == 'u') unknownLets[i] += secondGuess[i]
    else if (feedback[i] == 'x') shouldntLets.push(secondGuess[i])
}
console.log("Knowns", knownPos);
console.log("Unknowns", unknownLets);
console.log("Shouldnt", shouldntLets);

regStr = '^'
for (let i = 0; i < 5; i++) {
    if (knownPos[i] != '.') regStr += knownPos[i];
    else {
        regStr += `[^${unknownLets[i]}${shouldntLets.join('')}]`
    }
}

reg = new RegExp(regStr + '$')

filteredData = wordRanking.filter(word => word[0].match(reg));
for (let i = 0; i < unknownLets.length; i++) {
    filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
}
let thirdGuess = filteredData[0][0];
console.log(filteredData);
console.log("Third Try", thirdGuess);
feedback = 'yyyxy';



// Fourth Try
for (let i = 0; i < 5; i++) {
    if (feedback[i] == 'y') knownPos[i] = thirdGuess[i];
    else if (feedback[i] == 'u') unknownLets[i] += thirdGuess[i]
    else if (feedback[i] == 'x') shouldntLets.push(thirdGuess[i])
}
console.log("Knowns", knownPos);
console.log("Unknowns", unknownLets);
console.log("Shouldnt", shouldntLets);

regStr = '^'
for (let i = 0; i < 5; i++) {
    if (knownPos[i] != '.') regStr += knownPos[i];
    else regStr += `[^${unknownLets[i]}${shouldntLets.join('')}]`;
}

reg = new RegExp(regStr + '$')

filteredData = wordRanking.filter(word => word[0].match(reg));
for (let i = 0; i < unknownLets.length; i++) {
    filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
}
let fourthGuess = filteredData[0][0];
console.log(filteredData);
console.log("Fourth Try", fourthGuess);
feedback = 'yyxxy';



// Fifth Try
for (let i = 0; i < 5; i++) {
    if (feedback[i] == 'y') knownPos[i] = fourthGuess[i];
    else if (feedback[i] == 'u') unknownLets[i] += fourthGuess[i]
    else if (feedback[i] == 'x') shouldntLets.push(fourthGuess[i])
}
console.log("Knowns", knownPos);
console.log("Unknowns", unknownLets);
console.log("Shouldnt", shouldntLets);

regStr = '^'
for (let i = 0; i < 5; i++) {
    if (knownPos[i] != '.') regStr += knownPos[i];
    else regStr += `[^${unknownLets[i]}${shouldntLets.join('')}]`;
}

reg = new RegExp(regStr + '$')

filteredData = wordRanking.filter(word => word[0].match(reg));
for (let i = 0; i < unknownLets.length; i++) {
    filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
}
let fifthGuess = filteredData[0][0];
console.log(filteredData);
console.log("Fifth Try", fifthGuess);
feedback = 'xyyxy';





function hasRepeatedLetters(word) {
    const letterCount = new Map();
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (letterCount.has(letter)) {
            return true;
        }
        letterCount.set(letter, true);
    }
    return false;
}
