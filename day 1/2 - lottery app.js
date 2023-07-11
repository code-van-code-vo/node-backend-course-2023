// SIMPLE LOTTERY APP
//
// Input:
//   users: array of users
// Output:
//   pick a random winning user in users

const users = [
    { name: 'khoa', age: 20 }
]

function insertUser(n, a) {
    const user = {
        name: n,
        age: a,
    }
    users.push(user)
}

function randElementInArray(arr) {
    const randomIndex = Math.floor(Math.random()*arr.length)
    return arr[randomIndex]
}

insertUser('Binh', 21)
insertUser('Giang', 19)
insertUser('Tan', 18)

const winningUser = randElementInArray(users)
console.log(`${winningUser.name} has won a lottery ticket at age ${winningUser.age}`)