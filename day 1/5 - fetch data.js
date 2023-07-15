

const axios = require('axios')
const prompt = require('prompt-sync')();

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}

fetchQuestions(2, (questions) => {
    // 2 lines below is how we can get user input from keyboard
    // let userInput = prompt('question: ')
    // console.log(userInput)

    console.log(questions)
})
