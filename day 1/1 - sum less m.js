// Input:
//   arr: array of integers
//   m: a fixed integer
// Output:
//   print sum of odd element less than m,
//   and sum of even element less than m

let arr = [1, 2, 3, 5, 6, 7, 101]
let m = 12

let sumOdd = 0
let sumEven = 0

for (let i = 0; i < arr.length; i++) {
    // if current element less than m
    if (arr[i] < m) {
        // if current element is even
        if (arr[i] % 2 === 0) {
            sumEven = sumEven + arr[i]
        } else {
            sumOdd = sumOdd + arr[i]
        }
    }
}
console.log(sumEven, sumOdd)