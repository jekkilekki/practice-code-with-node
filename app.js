/**
 * app.js
 * 
 * This script records the user input to various questions
 * (asked at different times of the day) into a Markdown
 * journal entry for that day.
 */

// Import custom helper functions.
const getQuestions = require('./lib/getQuestions');
const collectAnswers = require('./lib/collectAnswers');

// Import Node libraries.
const fs = require('fs');
const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
// Get the date.
let date = new Date();
let year = date.getFullYear();
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let day = ('0' + date.getDate()).slice(-2);
let today = year + '-' + month + '-' + day;
let time = date.getHours();

// Prepare answerStream.
let answerStream;
const questions = getQuestions();
let answers = [];
 
const answerEvents = collectAnswers(questions, (answers) => {
    // const answers = [];

    let filename = `./journal/${today}.md`;
    if (fs.existsSync(filename)) {
        // Delete and start fresh
        // fs.unlinkSync(filename);
        console.log('File exists! Appending...')
        answerStream = fs.createWriteStream(filename, {flags: 'a'}); // 'a' for append to (existing?) file
    } else {
        answerStream = fs.createWriteStream(filename);
        answerStream.write(`# Journal entry for ${today}\n\n`);
    }
    
    // Begin with the time period's header.
    if (time < 12) {
        answerStream.write(`## Good Morning!\n\n`);
    } else if (time < 18) {
        answerStream.write(`## Good Afternoon!\n\n`);
    } else {
        answerStream.write(`## Good Night!~\n\n`);
    }

    // Now, answer the questions.
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
});
 
// answerEvents = (questions, (answers) => {
//     console.log('Done!');
//     console.log(answers);
//     process.exit();
// });