// Simple Loterry app (Extended)
// Input:
//   users: array of users (input from file)
// Output:
//   pick a random winning user in users

// Homework: Enhance the program with the following features
//   1. only pick user has age greater than 17 (using .filter())
//   2. generate id for each user when inserting (brainstorm your own idea)

const fs = require('fs')

let users = []

function randElementInArray(arr) {
    const randomIndex = Math.floor(Math.random()*arr.length)
    return arr[randomIndex]
}

function insertUser(n, a) {
    const user = {
        name: n,
        age: a,
    }
    users.push(user)
}

function getUsersFromFile(filename, callback) {

    fs.readFile(filename, 'utf8', (err, data) => {
        callback(data)
    })
}

getUsersFromFile('3 - users.txt', (data) => {
    const lines = data.split('\n')
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(' ')
        let name = line[0]
        let age = line[1]
        insertUser(name, age)
    }
    users = users.filter(user => {
        if (user.age < 18) {
            return false
        } else {
            return true
        }
    })
    console.log(users)
    const winningUser = randElementInArray(users)
    console.log(`${winningUser.name} has won a lottery ticket at age ${winningUser.age}`)
})