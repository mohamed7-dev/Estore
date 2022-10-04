let clickedCatFromLS = JSON.parse(localStorage.getItem("clickedCat"));

function filterCat(){
    let productsFromLS = JSON.parse(localStorage.getItem("productDB"));
    let filtered = productsFromLS.filter((item) => {
        return item.mainCategory == clickedCatFromLS;
    })
    return filtered;
}

function handleFilterCat(){
    let filtered = filterCat();
    displayCatItems(filtered);
    handleFilterByCat(filtered);
    handleFilterByseller(filtered);
    handleFilterByBrand(filtered);
}

handleFilterCat();

function displayCatItems(items) {
    let parentElement = document.querySelector(".section-area .products-container");
    parentElement.innerHTML = "";
    items.map((item , index) => {
        parentElement.innerHTML += `
        <div class="product-card swiper-slide">
            <div class="image-container" onclick="addProductID(${item.id})">
                <img src="${item.image}" alt="">
            </div>
            <i class="fa-regular fa-heart fav-icon-${item.id}" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${item.id})"></i>
            <div class="describtion" onclick="addProductID(${item.id})">
                <span class="product p-name">${item.title}</span>
                <div class="cat-price-row">
                    <small class="p-category">${item.category}</small>
                    <samp class="p-price">${item.price}</samp>
                </div>
            </div>
            <div class="button">
                <button class="add-to-cart" onclick="userAddToCartAbility(${item.id})">add to cart</button>
            </div>
        </div> 
        ` 
    })
}

function handleFilterByCat(items){
    let filteredCat = items.map((item) => {
        return item.category;
    })
    let unique = getUniqueFilters(filteredCat);
    let id = "cat";
    let subCategory = document.querySelector("#sub-category");
    displayFilter(unique,subCategory,id);
}

function handleFilterByseller(items){
    let filteredSeller = items.map((item) => {
        return item.seller;
    })

    let unique = getUniqueFilters(filteredSeller);
    let id = "seller";
    let sellerFilter = document.querySelector("#seller-filter");
    displayFilter(unique,sellerFilter,id);
}

function handleFilterByBrand(items){
    let filteredBrand = items.map((item) => {
        return item.brand;
    })
    let unique = getUniqueFilters(filteredBrand);
    let id = "brand";
    let brandFilter = document.querySelector("#brand-filter");
    displayFilter(unique,brandFilter,id);
}

function getUniqueFilters(filtered){
    filtered = filtered.filter((item) => {
        return item != undefined;
    })
    let uniqueFilters = [];
    for(let i = 0; i < filtered.length; i++){
        if(filtered.length > 1){
            for(let j = 1 ; j <= filtered.length; j++){
                if(filtered[i] === filtered[j]){
                    continue;
                }else{
                    if(uniqueFilters.includes(filtered[i])){
                        continue;
                    }else{
                        uniqueFilters.push(filtered[i]);
                    }
                }
            }
        }else{
            uniqueFilters.push(filtered[i]);
        }
    }
    return uniqueFilters;
}

function displayFilter(items , parent , id){
    parent.innerHTML = "";
    items.map((item, index, Arr) => {
        parent.innerHTML += `
        <li>
            <input type="checkbox" class="filter-item" id="${index}-${id}">
            <label for="${index}-${id}">${item}</label>
        </li>
        `
    })
}

//filter items using filters from db
// let filterItems = Array.from(document.querySelectorAll("li .filter-item"));

// function handleFilter(){
//     let filterArray=[];
//     filterItems.forEach((item) => {
//             item.addEventListener("change" , (e)=>{
//                 let targetText = e.target.nextElementSibling.textContent;
//                 let targetcat = e.target.parentElement.parentElement.previousElementSibling.textContent;
//                 let filterObj = {
//                     [targetcat]:targetText,
//                 }
//                 filterArray.push(filterObj);
//                 displayCatItems(filterArray);

//                 // filterByClicked(filterArray);
//             });
//     })
// }
// handleFilter()

// function filterByClicked(filters){
//     let Arr = [];
//     let filteredMainCat = filterCat();
//     for(let item of filteredMainCat){
//         for(let filter  of filters ){
//             for(let obj in filter){
//                 let key = obj;
//                 if(item[`${key}`] == filter[obj]){
//                     let filtered  = item;
//                     Arr.push(filtered);
//                     // console.log(filtered)
//                     handleReapeat(filtered,Arr);
//                 }
//             }
//         }
//     }


// }

// function handleReapeat(Arr){
//     let uniqueArray = [];
//     for(let i = 0; i < Arr.length; i++){
//         if(Arr.length > 1){
//             for(let j = 1 ; j <= Arr.length; j++){
//                 if(Arr[i] === Arr[j]){
//                     continue;
//                 }else{
//                     if(uniqueArray.includes(Arr[i])){
//                         continue;
//                     }else{
//                         uniqueArray.push(Arr[i]);
//                     }
//                 }
//             }
//         }else{
//             uniqueArray.push(Arr[i]);
//         }
//         console.log(uniqueArray);
//     }
// }

