
let searchInNav = window.matchMedia("(min-width:995px)");
if(searchInNav.matches){
    let searchInput = document.querySelector("#search");
    let searchBtn = document.querySelector("#search-btn");
    let searchResultsDiv = document.querySelector(".search-results")
    startSearch(searchInput , searchBtn , searchResultsDiv)
    // when clicking search 
    searchBtn.addEventListener("click" , () => {
        window.location = "search-results.html";
    });
    document.onclick = function (e){
        if(e.target.className != "search-results"){
            searchResultsDiv.classList.remove("active");
        }
    }
}

function startSearch(input , btn , div){
    input.addEventListener("keyup" , (e) => {
        let data = JSON.parse(localStorage.getItem("productDB"));
        matchSearch(data,input , btn , div);
        if(e.keyCode === 13){
            window.location = "search-results.html";
        }
    })
}

function matchSearch(data,input , btn , div){
    if(input.value != ""){
        div.classList.add("active");
        let searchResult = data.filter((item) => {
            return item.title.toLowerCase().indexOf(input.value.toLowerCase()) != -1;
        });
        localStorage.removeItem("search");
        localStorage.setItem("search" , JSON.stringify(searchResult));
        displaySearchItemsInDiv(searchResult,input , btn , div);
    }else{
        div.classList.remove("active");
    }
}


function displaySearchItemsInDiv(results,input , btn , div){
    div.innerHTML = "";
    results.map((item) => {
        div.innerHTML += `
        <div class="item" onclick="addProductID(${item.id})">
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

//phone search
let mobileSearchInNav = window.matchMedia("(max-width:995px)");
if(mobileSearchInNav.matches){
    let searchInputMobile = document.querySelector("#search-mobile");
    let searchBtnMobile = document.querySelector("#search-btn-mobile");
    let searchResultsDivMobile = document.querySelector(".search-results-mobile")

    startSearch(searchInputMobile , searchBtnMobile , searchResultsDivMobile)
    // when clicking search 
    searchBtnMobile.addEventListener("click" , () => {
        window.location = "search-results.html";
    });
    document.onclick = function (e){
        if(e.target.className != "search-results-mobile"){
            searchResultsDivMobile.classList.remove("active");
        }
    }
}