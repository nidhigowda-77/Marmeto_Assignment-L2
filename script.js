
async function startWebsite(){

// data of the API
const DATA_API = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

// function that fetches data
async function getData(){

    try{
        const info = await fetch(DATA_API);
        const json = await info.json();
        return json;
    }
    catch(err){
        console.log("Error fetching data", err);
        return "Error fetching data";
    }
    
}

const data = await getData();

// targeting the required elements
const tumbnailContainer = document.querySelector(".tumbnail-container");
const vendor = document.querySelector(".vendor");
const title = document.querySelector(".title");
const price = document.querySelector(".price");
const percentOff = document.querySelector(".percent-off");
const compareAtPrice = document.querySelector(".compare-at-price");
const colorContainer = document.querySelector(".select-color");
const sizeContainer = document.querySelector(".select-size");
const description = document.querySelector(".para");

// variables
let sizeIndex = 0;
let borderIndex = 0;
let colorIndex = 0;

// function to calculate percentOff
function calculatePercentOff(markedPrice, sellingPrice){

    const mp = Number(markedPrice.slice(1));
    const sp = Number(sellingPrice.slice(1));

    const discount = Math.floor(100 - ((sp/mp)*100));
    return discount;
}

vendor.innerHTML = data?.product?.vendor;
title.innerHTML = data?.product?.title;
price.innerHTML = data?.product?.price + ".00";
percentOff.innerHTML = calculatePercentOff(data?.product?.compare_at_price, data?.product?.price) + "% Off";
compareAtPrice.innerHTML = data?.product?.compare_at_price + ".00";

// to iterate over each color provided in the API and show it in UI
const colors = data?.product?.options[0]?.values;
console.log(Object.keys(colors[0]));

colors.map( (color, idx) => {

    const wrapper = document.createElement("div");

    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = Object.values(color)[0];

    wrapper.appendChild(colorElement);
    wrapper.style.padding = "5px";
    wrapper.style.border = "2px solid white";
    
    if(idx === 0)
    {
        const img = document.createElement("img");
        img.src = "./assets/check.png";
    
        colorElement.appendChild(img); 
        wrapper.style.border = "2px solid " + Object.values(color)[0];       
    }

    

    colorContainer.appendChild(wrapper);
})

// to iterate over each size provided in the API and show it in UI
const sizes = data?.product?.options[1]?.values;
console.log(sizes);
sizes.map( (size, idx) => {

    const sizeElement = document.createElement("div");

    const left =  document.createElement("div");
    left.classList.add("size-circle")
    const insideLeft = document.createElement("div");
    insideLeft.classList.add("size-fill");


    left.appendChild(insideLeft);

    const right = document.createElement("div");
    right.innerHTML = size;

    sizeElement.appendChild(left);
    sizeElement.appendChild(right);  
    
    sizeElement.classList.add("size-option");

    sizeContainer.appendChild(sizeElement);

    if(idx == 0)
    {
        insideLeft.style.backgroundColor = "#284b7c";
        left.style.border = "1px solid #284b7c";

        right.style.color = "#284b7c";
        right.parentElement.style.backgroundColor = "#e4ebf4";
    }
})

description.innerHTML = data?.product?.description;


// event listeners

// to navigate the images 
const tumbnailList = document.querySelectorAll(".tumbnail");
const tumbnailArr = Array.from(tumbnailList);


tumbnailArr.map((ele, idx)=>{
    ele.addEventListener("click", ()=>{
        tumbnailArr[borderIndex].style.border = "none";

        ele.style.border = "3px solid #284b7c";
        borderIndex = idx;

        mainImg.src = images[idx].src;
    })
})

// to increase and decrease the quantity of the product
const count = document.querySelector(".count");
const decrease = document.querySelector(".decrease");
const increase = document.querySelector(".increase");

increase.addEventListener("click", ()=>{
    count.innerHTML = Number(count.innerHTML) + 1;
})

decrease.addEventListener("click", ()=>{
    const temp = Number(count.innerHTML);

    if(temp > 1)
    {
        count.innerHTML = temp - 1;        
    }
})


// to select the color
const colorList = document.querySelectorAll(".color");
const colorArr = Array.from(colorList);


colorArr.map((ele, idx) => {
    ele.addEventListener("click", ()=>{
        colorArr[colorIndex].parentElement.style.border = "white";
        colorArr[colorIndex].innerHTML = "";

        ele.parentElement.style.border = "2px solid " + Object.values(colors[idx])[0];
        
        const img = document.createElement("img");
        img.src = "./assets/check.png";
        
        ele.appendChild(img); 
        
        colorIndex = idx;        
    })
})

// to choose size
const sizeList = document.querySelectorAll(".size-option");
const sizeArr = Array.from(sizeList);


sizeArr.map((ele, idx)=>{
    
    ele.addEventListener("click", ()=>{
        sizeArr[sizeIndex].style.backgroundColor = "#eee";
        sizeArr[sizeIndex].firstChild.style.border = "1px solid black";
        sizeArr[sizeIndex].firstChild.firstChild.style.backgroundColor = "transparent";
        sizeArr[sizeIndex].lastChild.style.color = "black";
        
        ele.style.backgroundColor = "#e4ebf4";
        ele.firstChild.style.border = "1px solid #284b7c";
        ele.firstChild.firstChild.style.backgroundColor = "#284b7c";
        ele.lastChild.style.color = "#284b7c";
        
        sizeIndex = idx;
    })
})

// to give added to cart message
const cartMsg = document.querySelector(".cart-msg");
const addToCart = document.querySelector(".add-to-cart");

addToCart.addEventListener("click", ()=>{
    cartMsg.innerHTML = "Embrace Sideboard with color "+ (Object.keys(colors[colorIndex])[0]).toLowerCase() +" and size " + sizes[sizeIndex].toLowerCase() + " added to cart";
    cartMsg.style.display = "block";
})

}

startWebsite();








