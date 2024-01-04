// add products to website

let list = document.querySelector(".list");

let products = [
    {
        id: 1,
        name: "Cappuccino",
        description: "Hot Cappuccino",
        image: "cappuccino.webp",
        price: 12
    },
    {
        id: 2,
        name: "Americano",
        description: "Hot Americano",
        image: "americano.webp",
        price: 15
    },
    {
        id: 3,
        name: "Cheesecake",
        description: "Delicious Cheesecake",
        image: "cheesecake.jpg",
        price: 20
    },
    {
        id: 4,
        name: "Milky Coffee",
        description: "Coffee with Milk",
        image: "coffeewithmilk.webp",
        price: 13
    },
    {
        id: 5,
        name: "Croissant",
        description: "Hot and Fresh Croissant",
        image: "croissant.jpeg",
        price: 19
    },
    {
        id: 6,
        name: "Espresso",
        description: "Hot Espresso",
        image: "espresso.webp",
        price: 9
    },
    {
        id: 7,
        name: "Filter Coffee",
        description: "Hot and Filtered Coffee",
        image: "filteredcoffee.webp",
        price: 12
    },
    {
        id: 8,
        name: "Cheesecake",
        description: "Delicious Cheesecake with Raspberry",
        image: "framcheesecake.jpg",
        price: 26
    },
    {
        id: 9,
        name: "Latte",
        description: "Foamy Coffee",
        image: "latte.jpg",
        price: 8
    },
    {
        id: 10,
        name: "Cheesecake",
        description: "Delicious Cheesecake with Lemon",
        image: "lemoncheesecake.webp",
        price: 23
    },
    {
        id: 11,
        name: "San Sebastian",
        description: "Delicious Cheesecake with Chocolate",
        image: "sansebastian.webp",
        price: 30
    },
    {
        id: 12,
        name: "Turkish Coffee",
        description: "Turkish coffee cooked on embers",
        image: "turkishcoffee.jpeg",
        price: 11
    }
];

let productsCart = [];

function initDetails() {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <div class="img-box">
                <img src="./images/${value.image}" alt="product">
                <span class="rate">4.2 <i class="bx bxs-star"></i></span>
            </div>

            <div class="infoCard">
                <div class="topInfo">
                    <div class="title">${value.name}</div>
                    <div class="price">$${value.price}</div>
                </div>
                <div class="downInfo">
                    <p class="description">${value.description}</p>
                    <div class="add-to-cart" onclick="addToCart(${key})">
                        <i class="bx bx-shopping-bag bx-tada"></i>
                    </div>
                </div>
            </div>
        `;


        list.appendChild(newDiv);
        // console.log(newDiv);
    });
}

initDetails();


// open-close cart
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#cart-close");
let shoppingCartIcon = document.querySelector(".shopping-cart-icon");

shoppingCartIcon.addEventListener("click", () => {
    cart.style.right = "0px";
});

cartClose.addEventListener("click", () => {
    cart.style.right = "-200%";
});



// order date in cart
function addCurrentDate() {
    // Şu anki tarihi al
    let currentDate = new Date();

    // Tarih bilgisini formatla (örneğin: "Thursday, 04 January 2024")
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let formattedDate = `${days[currentDate.getDay()]}, ${String(currentDate.getDate()).padStart(2, '0')} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // HTML içindeki p elementini seç
    let dateElement = document.querySelector('.date');

    // Tarih bilgisini p elementinin içine ekle
    dateElement.textContent = formattedDate;
}

// Sayfa yüklendiğinde fonksiyonu çağır
addCurrentDate();


// content of cart

let listCart = document.querySelector(".listCart");
let total = document.querySelector(".total-price");
let quantity = document.querySelector(".quantity");

function addToCart(key) {
    if (productsCart[key] == null) {
        productsCart[key] = JSON.parse(JSON.stringify(products[key]));
        productsCart[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    listCart.innerHTML = "";
    let count = 0;
    let totalPrice = 0;
    productsCart.forEach((value, key) => {
        // products counter
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement("div");
            newDiv.classList.add("cart-box");
            newDiv.innerHTML = `
                <div class="cart-details">
                    <img src="./images/${value.image}" alt="Ordered Product">
                    <div class="detail-box">
                        <div class="cart-product-title">
                            ${value.name}
                        </div>
                        <div class="cart-product-price">
                            $${value.price.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div class="custom-number-input">
                    <button type:button onclick="dynamicQuantity(${key},${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button type:button onclick="dynamicQuantity(${key},${value.quantity + 1})">+</button>
                </div>
            `;

            listCart.appendChild(newDiv);
            console.log(newDiv);
        }
    });

    total.innerText = "$" + totalPrice.toLocaleString();
    quantity.innerText = count;
}

// delete, increase or decrease product on the cart

function  dynamicQuantity(key,quantity){
    if(quantity == 0){
        delete productsCart[key];
    }else{
        productsCart[key].quantity = quantity;
        productsCart[key].price = quantity * products[key].price;
    }
    reloadCart();
}


// show/hide navlist
const menuIcon = document.querySelector("#menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("hide");
}
