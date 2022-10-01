// search for products 
let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");
let searchResultsDiv = document.querySelector(".header-fill .search-results")


//when press enter and keyup
searchInput.addEventListener("keyup" , (e) => {
    let data = JSON.parse(localStorage.getItem("productDB"));
    matchSearch(data);
    if(e.keyCode === 13){
        window.location = "search-results.html";
    }
})

function matchSearch(data){
    if(searchInput.value != ""){
        searchResultsDiv.classList.add("active");
        let searchResult = data.filter((item) => {
            return item.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1;
        });
        localStorage.removeItem("search");
        localStorage.setItem("search" , JSON.stringify(searchResult));
        displaySearchItemsInDiv(searchResult);
    }else{
        searchResultsDiv.classList.remove("active");
    }
}


document.onclick = function (e){
    if(e.target.className != "search-results"){
        searchResultsDiv.classList.remove("active");
    }
}

function displaySearchItemsInDiv(results){
    searchResultsDiv.innerHTML = "";
    results.map((item) => {
        searchResultsDiv.innerHTML += `
        <div class="item">
        <div class="image-container">
            <img src="${item.image}" alt="">
        </div>
        <div class="desc">
            <span class="title">${item.title}</span>
            <span class="category">${item.category}</span>
        </div>
        </div>
        `
    })

}

// when clicking search 
searchBtn.addEventListener("click" , () => {
    window.location = "search-results.html";
});
