export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1 //without count my code is working fine
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

// load cart on cart page
export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
}

// remove item from cart array (localStorage)
export const removeItemFromCart = (productId) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((product, index) => {
            if (product._id === productId) {
                return cart.splice(index, 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

// empty the cart
export const cartEmpty = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');
        let cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}