// Check to make sure that the whole document is loaded
if (document.readyState == - 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Event listener for all the elements that are already loaded
function ready() {
    const deleteButton = document.querySelectorAll('.btn-danger');
    for (let i = 0; i < deleteButton.length; i++) {
        const button = deleteButton[i];
        button.addEventListener('click', removeCartItem);
    }

    const qtyInput = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < qtyInput.length; i++) {
        const input = qtyInput[i];
        input.addEventListener('change', qtyChanged);
    }

    const addToCartButton = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButton.length; i++) {
        const button = addToCartButton[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// Interaction events
function purchaseClicked() {
    alert('Thank you for purchasing!');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}

function removeCartItem(evt) {
    const buttonClicked = evt.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

function qtyChanged(evt) {
    const input = evt.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addToCartClicked(evt) {
    const button = evt.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, image);
    updateTotal();
}

// Add items alongside with event listeners (very important) to update the data correctly
function addItemToCart(title, price, image) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in the cart.');
            return
        }
    }
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', qtyChanged);
}

function updateTotal() {
    const cartContainer = document.getElementsByClassName('cart-items')[0]
    const cartRows = cartContainer.getElementsByClassName('cart-row')
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const priceElement = cartRow.getElementsByClassName('cart-price')[0];
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const qtyElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        const qty = qtyElement.value;
        total += price * qty;
    }
    total = (Math.round(total * 100) / 100).toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
}