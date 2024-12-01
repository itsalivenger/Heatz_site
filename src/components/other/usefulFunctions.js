import sendRequest from "./sendRequest";
import { serverDomain } from "./variables";


async function getCart() {
    const user = getUser();
    const cart = await sendRequest(`${serverDomain}/cart/${user._id}`, 'GET');
    return cart;
}

function getTotal(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const isFormFilled = function(formData){
    return Object.values(formData).every(val => val !== '')
}

const updateCartInServer = async function(cart){
    const user = getUser();
    const response = await sendRequest(`${serverDomain}/cart`, 'PUT', { cart, user });
    user.cart = cart;
    localStorage.setItem('user', JSON.stringify(user));
    return response
}

const getFavoriteItems = async function(){
    const user = getUser();
    const response = await sendRequest(`${serverDomain}/favorite/${user._id}`, 'GET');
    return response
}

const searchItems = async function(query){
    const response = await sendRequest(`${serverDomain}/products/getProducts/${query}`, 'GET');
    return response
}

export { getCart, getTotal, getUser, isFormFilled, updateCartInServer, getFavoriteItems, searchItems };