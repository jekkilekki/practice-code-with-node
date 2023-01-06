/**
 * morningPages.js
 * 
 * This script asks the user to prioritize today's tasks, 
 * then stores the answers in a file for later reference.
 */
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let date = new Date();
let year = date.getFullYear();
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let day = ('0' + date.getDate()).slice(-2);
let today = year + '-' + month + '-' + day;
let hr = '\n----------------------------------------\n';

const questions = [
    "What do you need to do today? > ",
    "What is priority #1? (urgent + important) > ",
    "What is 'nice to do' but not that urgent / important? > " 
];

let answerStream;

function collectAnswers(questions, done) {
    const answers = [];

    let filename = `./journal/${today}.md`;
    if (fs.existsSync(filename)) {
        // Delete and start fresh
        fs.unlinkSync(filename);
    }
    answerStream = fs.createWriteStream(filename);
    answerStream.write(`# Journal entry for ${today}\n\n`);
    answerStream.write(`## Good Morning!\n\n`);

    const questionAnswered = (ans) => {
        let answer = ans.toString().trim();

        answerStream.write(
            `### ${questions[answers.length]}\n`
        );
        answerStream.write(
            `${answer}\n\n`, 
            function() {
                if (answers.length < questions.length) {
                    rl.question(questions[answers.length], questionAnswered);
                } else {
                    return done(answers);
                }
            }
        );

        answers.push(answer);
    };

    rl.question(questions[0], questionAnswered);
}

collectAnswers(questions, (answers) => {
    console.log('Done!');
    console.log(answers);
    process.exit();
});