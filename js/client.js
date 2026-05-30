let topMenu = document.querySelector(".header-top-menu .menu-item");
let btnTMenu = document.querySelector(".top-menu-more");
let bottomMenu = document.querySelector(".header-bottom-menu .menu-item ");
let btnBMenu = document.querySelector(".bottom-menu-more");
let resizeTimer;
let menus = document.querySelectorAll(".menu-item");



//Đóng tất cả menu đang hoạt động
function closeAllMenus() {
    menus.forEach(menu => {
        menu.classList.remove("show");
    });
}

//Xóa tất cả các active
function removeAllActive() {
    document.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
}

//kiểm tra xem nó có đang disply: none hay k?
function isDisplayNone(element) {
    return window.getComputedStyle(element).display === "none";
}


//Mở menu header top
function toggleTopMenu() {

    let isOpen = topMenu.classList.contains("show");
    closeAllMenus();
    removeAllActive();

    if (!isOpen) {
        btnTMenu.classList.add("active");
        topMenu.classList.add("show");
        topMenu.style.transition = "all 0.2s ease";
    } else {
        topMenu.classList.remove("show");
        btnTMenu.classList.remove("active");
    }
}


//Mở menu header bottom
function toggleBottomMenu() {

    let isOpen = bottomMenu.classList.contains("show");
    closeAllMenus();
    removeAllActive();
    if (!isOpen) {
        btnBMenu.classList.add("active");
        bottomMenu.classList.add("show");
        bottomMenu.style.transition = "all 0.2s ease";
    } else {
        bottomMenu.classList.remove("show");
        btnBMenu.classList.remove("active");
    }

}

window.addEventListener("resize", () => {
    topMenu.classList.remove("show");
    closeAllMenus();
}
)



//Khi resize thì tạm tắt animation
window.addEventListener("resize", () => {
    document.body.classList.add("resizing");

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resizing");
    }, 150);
});





//slider card
const slider = document.querySelectorAll(".slider")

slider.forEach(section => {
    const list = section.querySelector(".card-list");
    const cards = section.querySelectorAll(".card");
    const dots = section.querySelectorAll(".dot");
    const nextbtn = section.querySelector(".next-btn");
    const prevbtn = section.querySelector(".prev-btn");

    let index = 0;

    //cập nhật slider
    function updateSlider() {
        list.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => {
            dot.classList.remove("active");

        });

        dots[index].classList.add("active");
    }


    //chuyển sang card tiếp theo
    nextbtn.addEventListener("click", () => {
        index++;

        if (index >= cards.length)
            index = 0;
        updateSlider();
    });

    //sang về card trc
    prevbtn.addEventListener("click", () => {
        index--;

        if (index < 0)
            index = cards.length - 1;
        updateSlider();
    });


    //mấy cục tròn ở dưới
    dots.forEach((dot,i)=>{
        dot.addEventListener("click",()=>{
            index = i;
            updateSlider();

        });

    });
});


//Thêm vào giỏ hàng
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm vào giỏ hàng!");
}

//load dữ liệu giỏ hàng
function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");

    let total = 0;

    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>${item.price.toLocaleString()}đ</p>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("total-price").innerText =
        "Total: " + total.toLocaleString() + "đ";
}


//Xóa sp
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

//Tự động load khi mở cart
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});