const axios = require('axios')

const arrayAns = [
    {
        key: 'A',
        value: ''
    },
    {
        key: 'B',
        value: ''
    },
    {
        key: 'C',
        value: ''
    },
    {
        key: 'D',
        value: ''
    }
]

const arrayAns2 = [
    {
        key: 'A',
        value: 'True'
    },
    {
        key: 'B',
        value: 'False'
    },
]

function fetchQuestions(nQ, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQ}`).then((res) => {
        callback(res.data.results)
    })
}
const prompt = require('prompt-sync')()
const numQues = prompt('Number of questions? ')

fetchQuestions(numQues, (question) => {
    let countCorrectAns = 0
    question.forEach(element => {
        console.log(element.question) //hien thi cau hoi
        const arrAnsOfQuestion = []

        //lay dap an tu data, bo vao mang chua dap an
        element.incorrect_answers.forEach(e => {
            arrAnsOfQuestion.push(e)
        })
        arrAnsOfQuestion.push(element.correct_answer)

        //random dap an
        if (arrAnsOfQuestion.length == 2) {
            arrayAns2.forEach(e => {
                console.log(`${e.key}. ${e.value}`)
            })
        } else {
            arrayAns.forEach(e => {
                const index = Math.floor(Math.random() * arrAnsOfQuestion.length)
                e.value = arrAnsOfQuestion[index]
                arrAnsOfQuestion.splice(index, 1)

                console.log(`${e.key}. ${e.value}`)
            });

        }

        //nguoi dung nhap dap an
        const ansInput = prompt('What is your answer? ')

        //check dap an
        if (arrAnsOfQuestion.length == 2) {
            arrayAns2.forEach(e => {
                if (ansInput.toUpperCase() == e.key) {
                    if (e.value == element.correct_answer) {
                        countCorrectAns++;
                        console.log('Correct!')
                    } else {
                        console.log(`Sorry. The correct answer is ${element.correct_answer}`)
                    }
                }
            });
        } else {
            arrayAns.forEach(e => {
                if (ansInput.toUpperCase() == e.key) {
                    if (e.value == element.correct_answer) {
                        countCorrectAns++;
                        console.log('Correct!')
                    } else {
                        console.log(`Sorry. The correct answer is ${element.correct_answer}`)
                    }
                }
            });
        }
        console.log('\r')
    })
    console.log(`Your score: ${countCorrectAns}`)
})
