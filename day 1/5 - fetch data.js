const axios = require('axios')
const prompt = require('prompt-sync')()

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}

// Copy from Stackoverflow
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

fetchQuestions(10, (questions) => {
    let nCorrect = 0
    questions.forEach((data) => {
        // spread operator
        let answers = [...data.incorrect_answers, data.correct_answer]
        // let answers = [
        //     data.incorrect_answers[0],
        //     data.incorrect_answers[1],
        //     data.incorrect_answers[2],
        //     data.incorrect_answers[3],
        //     data.correct_answer
        // ]
        answers = shuffle(answers)

        console.log(data.question)
        console.log(`A. ${answers[0]}`)
        console.log(`B. ${answers[1]}`)

        if (data.type === 'multiple') {
            console.log(`C. ${answers[2]}`)
            console.log(`D. ${answers[3]}`)
        }

        const userAnswer = prompt('Your answer is: ')
        const userAnswerIndex = userAnswer.charCodeAt(0) - 65

        if (answers[userAnswerIndex] === data.correct_answer) {
            nCorrect += 1
            console.log('Your answer is correct!')
        } else {
            console.log(
                `Sorry but the correct answer is ${data.correct_answer}`
            )
        }
        console.log()
    })
    console.log(`You have ${nCorrect}/${questions.length} correct answers`)
})
