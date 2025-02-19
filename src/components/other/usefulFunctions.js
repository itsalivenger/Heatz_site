import sendRequest from "./sendRequest";
import { serverDomain } from "./variables";


async function getCart() {
    const user = getUser();

    if (user._id) {
        // Fetch cart from backend if user is logged in
        const cart = await sendRequest(`${serverDomain}/cart/${user._id}`, 'GET');
        return cart;
    } 
    
    // Return local cart if user is not logged in
    return { cart: JSON.parse(localStorage.getItem('cart')) || [] };
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
    return user ? JSON.parse(user) : {};
}

const isFormFilled = function (formData) {
    return Object.values(formData).every(val => val !== '')
}

const updateCartInServer = async function (cart) {
    const user = getUser();
    const response = await sendRequest(`${serverDomain}/cart`, 'PUT', { cart, user });
    user.cart = cart;
    localStorage.setItem('user', JSON.stringify(user));
    return response;
}

const getFavoriteItems = async function () {
    const user = getUser();
    if (!user) return {}
    const response = await sendRequest(`${serverDomain}/favorite/${user._id}`, 'GET');
    return response
}

const searchItems = async function (query) {
    const response = await sendRequest(`${serverDomain}/products/getProducts/${query}`, 'GET');
    return response
}

const getDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Function to handle and validate form data
function formValidation(formData) {
    const { email, password, phoneNumber } = formData;

    // Validation results
    const errors = [];

    // Validate email
    if (!email) {
        errors.push("L'email est requis.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Format d'email invalide.");
    }

    // Validate password
    if (!password) {
        errors.push("Le mot de passe est requis.");
    } else if (password.length < 8) {
        errors.push("Le mot de passe doit comporter au moins 8 caractères.");
    }

    // Validate phone number
    if (!phoneNumber) {
        errors.push("Le numéro de téléphone est requis.");
    } else if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
        errors.push("Format de numéro de téléphone invalide.");
    }

    // Return results
    return {
        success: errors.length === 0,
        errors: (
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        ),
    };
}

const addToCart = async (user_id, togglePopup, product) => {
    if (!user_id) {
        // Save to localStorage if the user is not connected
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productExists = cart.some(item => item._id === product._id);

        if (!productExists) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            togglePopup({ title: 'Success', content: 'Produit ajouté au panier (hors ligne).' });
        } else {
            togglePopup({ title: 'Info', content: 'Le produit est déjà dans le panier.' });
        }
        return;
    }

    // Send request to backend
    const response = await sendRequest(`${serverDomain}/cart`, 'POST', { product_Id: product._id, user_id });

    if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });

        // Update local user cart
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            user.cart.push({ ...product, quantity: 1 });
            localStorage.setItem('user', JSON.stringify(user));
        }
    } else {
        togglePopup({ title: 'Error', content: response.error });
    }
};


const addToFavorite = async (product_Id, user_id, togglePopup) => {
    // if (!isConnected()) return;
    const response = await sendRequest(`${serverDomain}/favorite`, 'POST', { product_Id, user_id });
    if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });
        const user = JSON.parse(localStorage.getItem('user'));
        user.favorite.push(product_Id);
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        togglePopup({ title: 'Error', content: response.error });
    }
};

export {
    addToCart, addToFavorite, getCart, getTotal, getUser, isFormFilled, updateCartInServer,
    getFavoriteItems, searchItems, formValidation, getDate
};