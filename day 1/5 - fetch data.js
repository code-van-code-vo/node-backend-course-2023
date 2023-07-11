const axios = require('axios')

function fetchQuestions(nQuestion, callback) {
    axios.get(`https://opentdb.com/api.php?amount=${nQuestion}`).then((res) => {
        callback(res.data.results)
    })
}
