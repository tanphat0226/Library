// HTML Elements
const tableBodyEl = document.querySelector('#table-body')
const dialog = document.getElementById('myDialog')
const openBtn = document.getElementById('openBtn')
const closeBtn = document.getElementById('closeBtn')
const addForm = document.querySelector("#add-form")



// App variable
const myLibrary = []

function Book(title, author, genre, status) {
   this.id = crypto.randomUUID()
   this.title = title
   this.author = author
   this.genre = genre
   this.status = status
}

function addBookToLibrary(title, author, genre, status) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, genre, status)
  myLibrary.push(newBook)
}

function displayLibrary(library) {
    tableBodyEl.innerHTML = library.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.status}</td>
            <td>
                <button class="btn-remove btn btn--medium btn--remove" data-id="${book.id}">Remove</button>
                <button class="btn-toggle btn btn--medium btn--edit" data-id="${book.id}">Toggle Status</button>
            </td>
        </tr>
    `).reverse().join('')
}

function handleRemove(id) {
    const removeBook = myLibrary.find(book => book.id === id)
    const index = myLibrary.indexOf(removeBook)
    
    if (index !== -1) {
        myLibrary.splice(index, 1)
    }
    updateDisplay()
}

function toggleStatus(id) {
    const book = myLibrary.find(item => item.id == id)
    if (book) {
        book.status = book.status.toLowerCase() === 'read' ? 'Unread' : 'Read'
        // Cập nhật lại giao diện
        updateDisplay()
    }
}

function updateDisplay() {
    tableBodyEl.innerHTML = ''
    displayLibrary(myLibrary)
}


// Event listion
openBtn.addEventListener('click', () => {
    dialog.showModal()
})

closeBtn.addEventListener('click', () => {
    dialog.close()
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    
    const formData = new FormData(addForm)     

    const title = formData.get('title')
    const author = formData.get('author')
    const genre = formData.get('genre')
    const status = formData.get('status')
    
    addBookToLibrary(title, author, genre, status)
    dialog.close()
    addForm.reset()
    updateDisplay()
})

tableBodyEl.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-toggle')) {
        const id = e.target.getAttribute('data-id')
        // Gọi hàm xử lý toggle ở đây
        toggleStatus(id)
    }

     if (e.target && e.target.classList.contains('btn-remove')) {
        const id = e.target.getAttribute('data-id')
 
        handleRemove(id)
    }
})


document.addEventListener('DOMContentLoaded', () => {
    //  Example
    addBookToLibrary('Lược Sử Thời Gian', 'Stephen Hawking', 'Khoa học thường thức', 'Read')
    addBookToLibrary('Nhà Giả Kim', 'Paulo Coelho', 'Tiểu thuyết, Triết lý', 'Unread')
    addBookToLibrary('Đắc Nhân Tâm', 'Dale Carnegie', ' Phát triển bản thân', 'Read')

    
    displayLibrary(myLibrary)
})