let books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 2, title: 'title 2', author: 'author 2' }
]

export function getBooks() {
    return books
}

export function addBook(book) {
    books.push(book)
}

export function findBookById(bookId) {
    return books.find(book => {
        return book.id === bookId
    })
}

export function deleteBookById(bookId) {
    books = books.filter(book => {
        return book.id !== bookId
    })
}

export function updateBook(book) {
    const bookIndex = books.findIndex(eachBook => {
        return eachBook.id === book.id
    })
    books[bookIndex].title = book.title
    books[bookIndex].author = book.author
}
