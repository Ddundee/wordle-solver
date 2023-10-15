import inquirer from 'inquirer';
import { solver } from './wordle_solver.js'

const choices = ['Wordle Simulator', 'Wordle Solver', 'EXIT']

inquirer.prompt([{
    type: 'list',
    name: 'service',
    message: 'What service would you like?',
    choices,
},
]).then((answer) => {
    if (answer['service'] === choices[1]) solver();
    else if (answer['service'] === choices[2]) process.exit()
});