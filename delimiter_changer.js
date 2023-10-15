const fs = require('fs');

let data = fs.readFileSync('data/possible_answer.txt', 'utf8')
    .split('\0')
    .join('\n')

fs.writeFileSync('data/temp.txt', data)
