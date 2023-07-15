const numbers = [2,3,-1,1,7,6,-2]

numbers.forEach(number => {
    console.log(number)
})

const evenNumbers = numbers.filter(number => {
    if (number % 2 === 0) {
        return true
    } else {
        return false
    }
    // return number % 2 === 0
})

const firstNegativeNumberIndex = numbers.findIndex(number => {
    if (number < 0) {
        return true
    } else {
        return false
    }
    // return number < 0
})


console.log(firstNegativeNumberIndex)
console.log(evenNumbers)