const axios = require('axios')
const prompt = require('prompt-sync')()
function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
fetchQuestions(10, (questions) => {
    questions.forEach((element) => {
        const Answer = [
            element.correct_answer,
            element.incorrect_answers[0],
            element.incorrect_answers[1],
            element.incorrect_answers[2],
        ]
        const Choose = ['A', 'B', 'C', 'D']
        const shuffledAnswers = shuffleArray(Answer)
        console.log(element.question)
        shuffledAnswers.forEach((Answer, index) => {
            console.log(`${Choose[index]}. ${Answer}`)
        })

        const userInput = prompt('What is your answer: ')
        if (userInput === element.correct_answer)
            console.log(`Your ${userInput} is correct`)
        else
            console.log(`Your ${userInput} is Incorrect , right answer is ${element.correct_answer}`)
    })
})
