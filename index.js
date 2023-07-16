const fs = require('fs');
const prompt = require('prompt-sync')();
let colors = require('colors')

const alphaData = fs.readFileSync('data/alphabetical_work_ranking.txt', 'utf8').split('\0').map(line => line.split(":"));
const commanalityData = fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8').split('\0').map(line => line.split(":"))

let firstGuess = alphaData[0][0];

while (true) {
    console.log("First Try", firstGuess.red.bold.underline);

    let firstFeedBack = prompt('Feedback: ');
    if (firstFeedBack.length < 5) continue;

    // Second Try
    let knownPos = ['.', '.', '.', '.', '.'];
    let unknownLets = ['', '', '', '', ''];
    let shouldntLets = [];

    for (let i = 0; i < 5; i++) {
        if (firstFeedBack[i] == 'y') knownPos[i] = firstGuess[i];
        else if (firstFeedBack[i] == 'u') unknownLets[i] += firstGuess[i]
        else if (firstFeedBack[i] == 'x') shouldntLets.push(firstGuess[i])
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

    let filteredData = alphaData.filter(word => word[0].match(reg));
    for (let i = 0; i < unknownLets.length; i++) {
        filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
    }
    if (!filteredData) {
        console.log("Fresh Out of Words")
        continue;
    }
    let secondGuess = filteredData[0][0];
    console.log(filteredData);
    console.log("Second Try", secondGuess.red.bold.underline);
    let secondFeedBack = prompt('Feedback: ');
    if (secondFeedBack.length < 5) continue;

    // Third Try
    for (let i = 0; i < 5; i++) {
        if (secondFeedBack[i] == 'y') knownPos[i] = secondGuess[i];
        else if (secondFeedBack[i] == 'u') unknownLets[i] += secondGuess[i]
        else if (secondFeedBack[i] == 'x') shouldntLets.push(secondGuess[i])
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

    filteredData = commanalityData.filter(word => word[0].match(reg));
    for (let i = 0; i < unknownLets.length; i++) {
        filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
    }
    if (!filteredData) {
        console.log("Fresh Out of Words")
        continue;
    }
    let thirdGuess = filteredData[0][0];
    console.log(filteredData);
    console.log("Third Try", thirdGuess.red.bold.underline);
    let thirdFeedBack = prompt('Feedback: ');
    if (thirdFeedBack.length < 5) continue;

    // Fourth Try
    for (let i = 0; i < 5; i++) {
        if (thirdFeedBack[i] == 'y') knownPos[i] = thirdGuess[i];
        else if (thirdFeedBack[i] == 'u') unknownLets[i] += thirdGuess[i]
        else if (thirdFeedBack[i] == 'x') shouldntLets.push(thirdGuess[i])
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

    filteredData = commanalityData.filter(word => word[0].match(reg));
    for (let i = 0; i < unknownLets.length; i++) {
        filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
    }
    if (!filteredData) {
        console.log("Fresh Out of Words")
        continue;
    }
    let fourthGuess = filteredData[0][0];
    console.log(filteredData);
    console.log("Fourth Try", fourthGuess.red.bold.underline);
    let fourthFeedBack = prompt('Feedback: ');
    if (fourthFeedBack.length < 5) continue;

    // Fifth Try
    for (let i = 0; i < 5; i++) {
        if (fourthFeedBack[i] == 'y') knownPos[i] = fourthGuess[i];
        else if (fourthFeedBack[i] == 'u') unknownLets[i] += fourthGuess[i]
        else if (fourthFeedBack[i] == 'x') shouldntLets.push(fourthGuess[i])
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

    filteredData = commanalityData.filter(word => word[0].match(reg));
    for (let i = 0; i < unknownLets.length; i++) {
        filteredData = filteredData.filter(word => word[0].includes(unknownLets[i]))
    }
    if (!filteredData) {
        console.log("Fresh Out of Words")
        continue;
    }
    let fifthGuess = filteredData[0][0];
    console.log(filteredData);
    console.log("Fifth Try", fifthGuess.red.bold.underline);
    prompt('')
}