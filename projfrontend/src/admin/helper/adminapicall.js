const { API } = require("../../backend");

// create calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

// get a single category
export const getACategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// delete category
export const deleteCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: category
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// product calls

// create product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// read a product
export const getAProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    }).then(response => response.json())
        .catch(err => console.log(err));
}


// read all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => response.json())
        .catch(err => console.log(err));
}


// delete a product
export const deleteProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => response.json())
        .catch(err => console.log(err));
}

// calls for orders

// read all orders
export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
        .catch(err => console.log(err))
}