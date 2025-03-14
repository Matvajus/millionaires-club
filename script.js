let menuOpen = false;
let cart = [];

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menuOpen = !menuOpen;
    menu.classList.toggle('active');
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    if (menuOpen) toggleMenu(); // Close menu when a page is selected
}

function showNotification(message) {
    const modal = document.getElementById('notification-modal');
    const messageElement = document.getElementById('notification-message');
    messageElement.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('notification-modal');
    modal.style.display = 'none';
}

function addToCart(name, balance, price, button) {
    showLoading();
    setTimeout(() => {
        cart.push({ name, balance, price: parseFloat(price.replace('$', '')) });
        button.disabled = true;
        button.textContent = 'Added';
        hideLoading();
        updateCart();
        showNotification(`${name} has been added to your cart!`);
    }, 1000); // Simulate delay for loading effect
}

function removeFromCart(index) {
    const itemName = cart[index].name;
    showLoading();
    setTimeout(() => {
        cart.splice(index, 1);
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.textContent = 'Add to Cart';
        });
        hideLoading();
        updateCart();
        showNotification(`${itemName} has been removed from your cart.`);
    }, 1000); // Simulate delay for loading effect
}

function showLoading() {
    const loading = document.getElementById('cart-loading');
    loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.getElementById('cart-loading');
    loading.style.display = 'none';
}

function payWith(method) {
    if (method === 'Paypal') {
        // Redirect to the provided PayPal link
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        window.location.href = `https://paypal.me/EMatvajus?country.x=LT&locale.x=en_US`;
    } else if (method === 'Stripe') {
        // Placeholder for Stripe payment link
        showNotification('Stripe payment link will be provided soon.');
        // Uncomment and update the line below with the actual Stripe link once provided
        // window.location.href = 'YOUR_STRIPE_PAYMENT_LINK_HERE';
    } else {
        showNotification(`Proceeding to pay with ${method}. Please follow the instructions provided via Telegram (@matvajus).`);
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const totalPriceElement = document.getElementById('total-price');
    const orderIdElement = document.getElementById('order-id');

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.innerHTML = '';
        orderIdElement.innerHTML = '';
        cartFooter.style.display = 'none';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name} (${item.balance}) - $${item.price}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;

        const orderId = Math.floor(100000 + Math.random() * 900000);
        orderIdElement.innerHTML = `Order ID: ${orderId}`;
        cartFooter.style.display = 'block';
    }
}

// Initialize cart display
updateCart();