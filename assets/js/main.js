// UI
let frm = document.querySelector('#frm');
let product = document.querySelector('#product');
let price = document.querySelector('#price');
let qty = document.querySelector('#qty');
let productlist = document.querySelector('#product-list');
let flashmsg = document.querySelector('.flashmsg');

// Event listiner
// add product
frm.addEventListener('submit', addProduct);
// removeProduct
productlist.addEventListener('click', removeProduct);
// get Content form localstorage
document.addEventListener('DOMContentLoaded', getProduct);


// addProduct Function
function addProduct(e) {
    // form validation

    if (product.value === "" || price.value === "" || qty.value === "") {
        flashmsg.innerText = "Please Fill the all required fild ";
        flashmsg.style.color = "#ff0000";
    }
    else {
        flashmsg.innerText = "";
        flashmsg.style.color = "#000";

        // create tr tag

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.value}</td>
            <td>${price.value}</td>
            <td>${qty.value}</td>
            <td><a href= "#">X</td>
        `;
        // append Child
        productlist.appendChild(tr);

        let productInfo = { product: product.value, price: price.value, qty: qty.value }
        storeinlocalstorage(productInfo);

    }

    product.value = '';
    price.value = '';
    qty.value = '';

    e.preventDefault();
}

// remove single product

function removeProduct(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are You Sure?")) {
            let dataElement = e.target.parentElement.parentElement;
            dataElement.remove();
            deleteInlocalstorage(dataElement);
        }
    }
    else {
        window.alert("Please Click Ancor");
    }

    e.preventDefault();
}

// store in localstorage
function storeinlocalstorage(list) {
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('items'));
    }
    item.push(list);
    localStorage.setItem('items', JSON.stringify(item));
    console.log(item);
}

// delete form localstorage

function deleteInlocalstorage(data) {
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('items'));
    }
    let tableProduct = data.children[0].textContent.trim();
    item.forEach((value, index) => {
        if (tableProduct === item[index].product) {
            item.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(item));
}

// get Product form local storage
function getProduct() {
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('items'));
    }

    // create tr tag
    item.forEach((value, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${item[index].product}</td>
        <td>${item[index].price}</td>
        <td>${item[index].qty}</td>
        <td><a href= "#">X</td>
    `;
        // append Child
        productlist.appendChild(tr);
    });


}