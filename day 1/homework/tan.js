const axios = require('axios');
const { log } = require('console');
const prompt = require('prompt-sync')();

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}
fetchQuestions(10, (questions) => {
    console.log(questions)
    let score = 0
    questions.forEach(element => {
        let arr = []
        let arrIn = element.incorrect_answers
        arrIn.forEach(element => {
            arr.push(element)
        });
        arr.push(element.correct_answer)
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        console.log(element.question)
        const map = new Map()
        map.set("A", arr[0])
        map.set("B", arr[1])
        map.set("C", arr[2])
        map.set("D", arr[3])
        map.forEach((value, key) => {
            console.log(key + ' ' + value);
        });
        let useriput = prompt('Your answer: ').toUpperCase()
        if (map.get(useriput) == element.correct_answer) {
            console.log('Correct');
            score += 1
        } else {
            console.log('Incorrect');
        }
    });
    console.log('Your Score: ' + score);
})
