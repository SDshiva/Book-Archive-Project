const resultFound = document.getElementById('result-found');
const spinner = document.getElementById('spinner');
const booksContainer = document.getElementById('books-container')
const callData = () => {
    resultFound.innerHTML = '';
    booksContainer.innerHTML = '';
    spinner.style.display = 'block';
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    getData(inputText);
    inputField.value = '';
}

const getData = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data, data.docs))
}
// console.log(data?.numFound);
// console.log(book?.cover_i);
// console.log(book?.title);
// console.log(book?.author_name[0]);
// console.log(book?.publisher[0]);
// console.log(book?.first_publish_year);
const displayData = (data, books) => {
    const div1 = document.createElement('div');
    // console.log(books, books.length);
    if (books.length === 0) {
        div1.innerHTML = `<h5 class = "text-danger"> NO BOOKS FOUND!! </h5>`;
        resultFound.appendChild(div1);
        spinner.style.display = 'none';
    }
    else {
        div1.innerHTML = `
        <h5 class = "text-success"> Searched Results Found ${data?.numFound}, Showing ${books.length} Results Below!! </h5>
        `;
        resultFound.appendChild(div1);
        books.forEach(book => {
            const div2 = document.createElement('div');
            div2.classList.add('card', 'col-4');
            div2.innerHTML = `
            <img  src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top w-100 h-75" alt="...">
            <div class="card-body">
            <h5 class="card-title text-dark">${book?.title}</h5>
            <p>by <span class = "text-danger">${book?.author_name ? book.author_name[0] : 'Unknown Author'}</span></p>
            <p>Publisher: <span class = "text-warning">${book?.publisher ? book.publisher[0] : 'Unkhown Publisher'}</span></p>
            <p>1st Publish Year: <span class = "text-success">${book?.first_publish_year ? book.first_publish_year : "Unknown Publish Year"}</span></p>
            </div>
            `;
            booksContainer.appendChild(div2);
            spinner.style.display = 'none';
        });
    }
}