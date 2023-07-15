const prompt = require('prompt-sync')()
const axios = require('axios')

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}

fetchQuestions(3, (questions) => {
    let score = 0

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question
        const correctAnswer = questions[i].correct_answer
        const incorrectAnswers = questions[i].incorrect_answers

        console.log(`Câu hỏi ${i + 1}: ${question}`)

        const answers = [correctAnswer, ...incorrectAnswers]
        answers.sort(() => Math.random() - 0.5)

        for (let j = 0; j < answers.length; j++) {
            console.log(`  ${String.fromCharCode(65 + j)}. ${answers[j]}`)
        }

        const userAnswer = prompt(
            'Câu trả lời của bạn (A, B, C, D):'
        ).toUpperCase()

        if (
            userAnswer ===
            String.fromCharCode(65 + answers.indexOf(correctAnswer))
        ) {
            console.log('Câu trả lời chính xác!\n')
            score++
        } else {
            console.log(`Sai rồi, kết quả đúng là ${correctAnswer}\n`)
        }
    }

    console.log(`Tổng điểm: ${score}/${questions.length}`)
})
