const fs = require('fs');

let wordBank = new Set(fs.readFileSync('data/alphabetical_work_ranking.txt', 'utf8').split('\0').map(line => line.split(":")[0]));
let dataDir = fs.readdirSync('data/unfiltered', err => err);


// Input all words that are in the 'work_bank.txt' into data/data.txt
if (dataDir) {
    let unfilteredDataDirSize = dataDir.length;
    let filteredDataDirSize = fs.readdirSync('data/filtered', err => err).length;

    do {
        try {
            for (let i = 0; i < dataDir.length; i++) {
                let fileInput = ""
                let percentFiles = (i / unfilteredDataDirSize) * 100;
                const data = require(`./data/unfiltered/${dataDir[i]}`);
                for (let j = 0; j < data.length; j++) {
                    fileInput += data[j].text.toLowerCase().split(' ').filter(word => wordBank.has(word)).join('\0') + '\0';
                }
                console.log(`Processing Data:: Files: ${percentFiles.toFixed(4)}% (${filteredDataDirSize}+${i}/${unfilteredDataDirSize})`);
                fs.renameSync(`data/unfiltered/${dataDir[i]}`, `data/filtered/${dataDir[i]}`, err => err);
                fs.writeFileSync(`data/processed/data${fs.readdirSync('data/processed').length}.txt`, fileInput, 'utf-8', err => err);
                fileInput = '';
            }
        } catch (error) { console.log("Memory allocation error", error) }
    } while (!(fs.readdirSync('data/unfiltered').length == 0))
}

// Generate Word Ranks
const files = fs.readdirSync('data/processed');
let fileDataArr = [];

console.log(fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8').split('\0').length, fs.readFileSync('data/alphabetical_work_ranking.txt', 'utf-8').split('\0').length)
if (fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8').split('\0').length < fs.readFileSync('data/alphabetical_work_ranking.txt', 'utf-8').split('\0').length) {
    files.slice(0, 100).forEach(fileName => {
        fileDataArr.push(fs.readFileSync(`data/processed/${fileName}`, 'utf-8').split('\0'));
        console.log(`Reading Files: ${fileName}`);
    });

    if (!fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8').trim()) {
        fs.writeFileSync('data/commanality_word_ranking.txt', '')

        wordBank.forEach(word => {
            let count = 0;

            fileDataArr.forEach(fileData => {
                count += fileData.filter(file_word => file_word === word).length;


            });
            console.log(`Indexing Files: ${word}-${count}`);
            fs.appendFileSync('data/commanality_word_ranking.txt', `${word}:${count}\0`)
        });
    }
    else {
        let currentCommon = new Set(fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8').split('\0').map(element => element.split(':')[0]))
        let diffData = fs.readFileSync('data/alphabetical_work_ranking.txt', 'utf-8').split('\0').map(element => element.split(':')[0]).filter(word => !currentCommon.has(word))
        diffData.forEach(word => {
            let count = 0;

            fileDataArr.forEach(fileData => {
                count += fileData.filter(file_word => file_word === word).length;
            })
            console.log(`Indexing Files: ${word}-${count}`);
            fs.appendFileSync('data/commanality_word_ranking.txt', `${word}:${count}\0`)
        })
    }

}

// Sort by commanality
const sortingData = fs.readFileSync('data/commanality_word_ranking.txt', 'utf-8')
    .split('\0')
    .map(line => line.split(":"))
    .sort(([x, num1], [y, num2]) => num2 - num1)
    .map(line => line.join(":"))
    .join('\0')

fs.writeFileSync('data/commanality_word_ranking.txt', sortingData);