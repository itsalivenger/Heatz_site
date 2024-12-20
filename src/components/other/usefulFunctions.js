import sendRequest from "./sendRequest";
import { serverDomain } from "./variables";


async function getCart() {
    const user = getUser();
    const cart = await sendRequest(`${serverDomain}/cart/${user._id}`, 'GET');

    // mochkil f connexion mora signup
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
    return response
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

// Function to handle and validate form data
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
        togglePopup({ title: 'Error', content: 'Vous devez vous connecter d\'abord.' });
        return false;
    };

    const response = await sendRequest(`${serverDomain}/cart`, 'POST', { product_Id: product._id, user_id });
    if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });
        const user = JSON.parse(localStorage.getItem('user'));
        user.cart.push({ ...product, quantity: 1 });
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        togglePopup({ title: 'Error', content: response.error });
    }
};



export { addToCart, getCart, getTotal, getUser, isFormFilled, updateCartInServer, getFavoriteItems, searchItems, formValidation };