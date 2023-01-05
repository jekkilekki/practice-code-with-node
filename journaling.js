/**
 * journaling.js
 * 
 * Stdout.prompts.js (original)
 * 
 * This file works with stdout, stdin, and filestreams.
 */
const fs = require('fs');
const path = require('path');

let date = new Date();
let year = date.getFullYear();
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let day = ('0' + date.getDate()).slice(-2);
let today = year + '-' + month + '-' + day;
let hr = '\n----------------------------------------\n';

let questions = [
    "What did you do today?",
    "What went well?",
    "What needs improved?",
    "What are you grateful for?"
];

let answers = [];
let answerStream;

function journal(i = 0) {
    process.stdout.write(`${questions[i]}`);
    process.stdout.write(` > `);
}

// Welcome!
process.stdout.write(`\nJournal questions for ${today}:`);
process.stdout.write(hr);

// Begin questions
journal();

process.stdin.once('data', (data) => {
    let filename = `./journal/${today}.md`;
    if (fs.existsSync(filename)) {
        // Delete and start fresh
        fs.unlinkSync(filename);
    }
    answerStream = fs.createWriteStream(filename);
    answerStream.write(`# Journal entry for ${today}\n`);
});

// Record answers
process.stdin.on('data', function(data) {
    let answer = data.toString().trim();

    answerStream.write(
        `### ${questions[answers.length]}\n`
    );
    answerStream.write(
        `${answer}\n\n`, 
        function() {
            if (answers.length < questions.length) {
                journal(answers.length);
            } else {
                process.exit();
            }
        }
    );

    answers.push(answer);
});

function displayAnswers() {
    process.stdout.write(`\n\nJournal entries for ${today}`);
    process.stdout.write(hr);
    for (i = 0; i < answers.length; i++) {
        process.stdout.write(questions[i]);
        process.stdout.write('\n');
        process.stdout.write(answers[i]);
        process.stdout.write('\n\n');
    }
}

// Display
process.on('exit', function() {
    answerStream.close();
    console.log(`\nJournal entry for ${today} successfully created!`)
    // displayAnswers();
})