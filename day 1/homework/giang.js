const axios = require('axios')
const prompt = require('prompt-sync')()

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}

fetchQuestions(10, (questions) => {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
        console.log(questions[i].question)
        let arr = [questions[i].correct_answer, ...questions[i].incorrect_answers]
        shuffle(arr)
        let key = ''
        
        for (let j = 0; j < arr.length; j++) {
            console.log(String.fromCharCode(65 + j) + '. ' + arr[j] )
            if(arr[j] == questions[i].correct_answer) {
                key = String.fromCharCode(65 + j)
            }
        }
        const userInput = prompt('Your answer is: ')
        for (let j = 0; j < arr.length; j++) {
            if (userInput == key) {
                console.log('Your answer is correct')
                count = count + 1
                break
            }
            else {
                console.log(`Sorry but the correct answer is ${questions[i].correct_answer}`)
                break
            }
        }
    }
    console.log(`You have ${count} correct answers`)
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}