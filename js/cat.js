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
    console.log(filtered);
}

handleFilterCat();

function displayCatItems(items) {
    let parentElement = document.querySelector(".sliding-wrapper .products-container");
    parentElement.innerHTML = "";
    items.map((item , index) => {
        parentElement.innerHTML += `
        <div class="product-card">
            <div class="image-container" onclick="addProductID(${item.id})">
                <img src="${item.image}" alt="">
            </div>
            <i class="fa-regular fa-heart" style="font-weight:${item.like == true? "bold" : "normal"}" onclick="userAddToFavouriteAbility(${index})"></i>
            <div class="describtion" onclick="addProductID(${item.id})">
                <span class="product p-name">${item.title}</span>
                <small class="product p-category">${item.category}</small>
                <samp class="product p-price">${item.price}</samp>
            </div>
            <div class="button">
                <button class="add-to-cart" onclick="userAddToCartAbility(${index})">add to cart</button>
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
    console.log(filtered)
    filtered = filtered.filter((item) => {
        return item != undefined;
    })
    let uniqueFilters = [];
    for(let i = 0; i < filtered.length; i++){
        console.log(filtered.length>1)
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
    console.log(items)
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

let filterItems = Array.from(document.querySelectorAll("li .filter-item"));

console.log(clickedCatFromLS , filterItems)
function handleFilter(){
    filterItems.forEach((item) => {
            item.addEventListener("change" , (e)=>{
                let targetText = e.target.nextElementSibling.textContent;
                filterByClicked(targetText);
            });
    })
}

handleFilter()

function filterByClicked(target){
    let filteredMainCat = filterCat();
    let checkedItems = filteredMainCat.filter((item) => {
        console.log(item.category , target)
        return item.category == target;
    })

    displayCatItems(checkedItems)
    console.log(checkedItems);
}