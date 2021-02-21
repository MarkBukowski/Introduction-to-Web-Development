if (document.readyState == - 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    const deleteButton = document.querySelectorAll('.btn-danger');
    for (let i = 0; i < deleteButton.length; i++) {
        const button = deleteButton[i];
        button.addEventListener('click', removeCartItem)
    }

    const qtyInput = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < qtyInput.length; i++) {
        const input = qtyInput[i];
        input.addEventListener('change', qtyChanged)
    }
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
    updateTotal()
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
        console.log(price * qty);
        total += price * qty;
    }
    total = (Math.round(total * 100) / 100).toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
}