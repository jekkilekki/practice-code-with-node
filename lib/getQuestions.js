/**
 * getQuestions.js
 * 
 * A script that exports all the questions for this app.
 * Questions returned are based on the time of day.
 */
let morningPages = [
    "What do you need to do today? > ",
    "What is priority #1? (urgent + important) > ",
    "What is 'nice to do' but not that urgent / important? > " 
];

let journal = [
    "What did you do today? > ",
    "What went well? > ",
    "What needs improved? > "
];

let nightlyReview = [
    "What are you grateful for? > ",
    "What needs done tomorrow? > ",
    "Final word to yourself tonight? > "
];

let time = new Date().getHours();

module.exports = () => {
    console.log(`The time is now after ${time}:00.`);
    if (time < 12) {
        return morningPages;
    } else if (time < 18) {
        return journal;
    } else {
        return nightlyReview;
    }
};