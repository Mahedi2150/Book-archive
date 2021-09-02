
const buttonClick = () => {
    const searchField = document.getElementById("searchItem")
    const searchText = searchField.value;
    
    searchField.value = "";
    const searchResult = document.getElementById("resultCart")
    searchResult.textContent = ""
    document.getElementById("bookFound").innerText = ""
    document.getElementById("totalBookFound").innerText = ""
    if (searchText.length === 0 ) {
        // Error Message
        const errorMessage = document.getElementById("resultCart");
        errorMessage.innerHTML = `
        <div class="card mx-auto   " >
        <div class="card-body ">
          <h4 class="card-title text-center ">Please enter a Book name...</h4> 
        </div>
        </div>

        `;
    } else {
        document.getElementById("spinner").classList.remove("d-none");
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayResult(data));
    }
}



const displayResult = books => {
    document.getElementById("spinner").classList.add("d-none");
    const searchResult = document.getElementById("resultCart")
    searchResult.textContent = ""
    // console.log(books.numFound)
    document.getElementById("totalBookFound").innerText = `Total Book : ${books.numFound}`
    document.getElementById("bookFound").innerText = `Book Found : ${books.docs.length}`
    // console.log(books.docs.length);
    const allBook = books.docs

    if (allBook.length === 0) {
        const errorMessage = document.getElementById("resultCart");
        errorMessage.innerHTML = `
        <div class="card mx-auto   " >
        <div class="card-body ">
          <h4 class="card-title text-center ">Not found.</h4> 
        </div>
        </div>

        `;
    } else {
        allBook.forEach(book => {

            const resultDiv = document.getElementById("resultCart")

            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
        <div class="card">
        <img  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  class="card-img-top " alt="" />
        <div class="card-body">
          <h4 class="card-title">${book.title ? book.title : ""}</h4>
          <p><small><b>Author:</b><i> ${book.author_name ? book.author_name : ""}</i></small></p>
          <p><b>First publish year :</b> ${book.first_publish_year ? book.first_publish_year : ""}</p>
          <p><b>Publisher :</b> ${book.publisher ? book.publisher : ""}</p>
          <p class="card-text">
           
          </p>
        </div>
      </div>
        `;
            resultDiv.appendChild(div)
            
        });
    }
}