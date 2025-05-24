// Database Produk
let product = [
    {
        sku: 1,
        nama: 'Adidas',
        harga: 10000,
        img: 'product-1.jpg',
    },
    {
        sku: 2,
        nama: 'Nike',
        harga: 30000,
        img: 'product-2.jpg',
    },
    {
        sku: 3,
        nama: 'Screamous',
        harga: 20000,
        img: 'product-3.jpg',
    },
    {
        sku: 4,
        nama: 'Pull And Bear',
        harga: 80000,
        img: 'product-4.jpg',
    },
    {
        sku: 5,
        nama: 'Cosmic',
        harga: 40000,
        img: 'product-5.jpg',
    },
    {
        sku: 6,
        nama: 'Bloods',
        harga: 70000,
        img: 'product-6.jpg',
    },
    {
        sku: 7,
        nama: 'Smith',
        harga: 90000,
        img: 'product-7.jpg',
    },
    {
        sku: 8,
        nama: 'Converse',
        harga: 10000,
        img: 'product-8.jpg',
    },
]


// Buat Fungsi LoadProduct
function loadProduk() {
    product.forEach(d => {
        $('#data-product').append(`
            <div class="product-box">
                <div class='img-box mb-3'>
                    <img src='img/${d.img}'/>
                </div>
                <h5 class='product-title mb-1'>${d.nama}</h5>
                <div class='price-and-cart'>
                    <span class='price mb-0'>Rp ${d.harga}</span>
                    <i class='ri-shopping-bag-line add-cart'></i>
                </div>
            </div>
        `)
    });
}


// Jalankan Fungsi LoadProduct
loadProduk();


// Buat Fungsi Untuk Buka Tutup Keranjang
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


// BUat Fungsi Untuk Tambah Keranjang 
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle  = productBox.querySelector(".product-title").textContent;
    const productPrice  = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Produk sudah ada di keranjang");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-qty">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);


    // Buat Fungsi Hapus Produk
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        
        cartBox.remove();

        let pqty  = cartBox.querySelector(".number").textContent;
        updateCartCount(-pqty);

        updateTotalPrice();
    
    });


    // Buat Fungsi Untuk Quantity
    cartBox.querySelector(".cart-qty").addEventListener("click", event => {
        const numberElement   = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity          = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            updateCartCount(-1);
            if (quantity === 1) {
                decrementButton.style.Color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            updateCartCount(1);
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();

    }); 

    updateCartCount(1);

    updateTotalPrice();
   
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("Rp ", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });

    totalPriceElement.textContent = `Rp ${total}`;
};


// Fungsi Update Cart Badge
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

// Fungsi Klik Beli
const btnBuy = document.querySelector(".btn-buy");
btnBuy.addEventListener("click", () => {
    alert("Terimaksih sudah belanja");
    return;
});
