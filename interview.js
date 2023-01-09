/**
 * interview.js
 * 
 * A script that asks user questions and gathers input.
 */
const collectAnswers = require('./lib/collectAnswers');

const questions = [
    "Why does working in this office suck?",
    "Why does working in this office NOT suck?"
];

const answerEvents = collectAnswers(questions, (answers) => {
    console.log("Nice answers~");
    console.log(answers);
    process.exit();
});

answerEvents.on('answer', answer => console.log(`Answer is: ${answer}`));