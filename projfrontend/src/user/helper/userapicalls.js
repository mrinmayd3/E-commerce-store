const { API } = require("../../backend");

export const purchaseList = (userId, token) => {
    return fetch(`${API}/orders/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
        .catch(err => console.log(err))
}