import React, { useState } from 'react';
import styles from './addProductForm.module.css';
import sendRequest from '../../components/other/sendRequest';
import Popup from '../../components/popup/popup';
import { serverDomain } from '../../components/other/variables';


const AddProductForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        category: '',
        description: '',
        productImage: null,
        previewImage: null
    });
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                productImage: file,
                previewImage: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a FormData object
        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('productImage', formData.productImage);
        
        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        // Handle form submission logic here (e.g., send data to the backend)
        const response = await sendRequest(`${serverDomain}/products/addProduct`, 'POST', data, {}, true);
        if (!response.error) {
            // Handle success, e.g., show success message
            setContent({ title: <><span className={`${styles.icon} ${styles.success} material-symbols-outlined`}>check</span> Ajout effectué</>, content: response.message });
            setIsOpen(true);
        } else {
            // Handle error, e.g., show error message
            setContent({ title: <><span className={`${styles.icon} ${styles.failure} material-symbols-outlined`}>close</span> Ajout echoué</>, content: response.error });
            setIsOpen(true);
        }
    };

    
    

    return (
        <div className={styles.container}>
            <Popup title={content.title} content={content.content} isOpen={isOpen} onClose={() => { setIsOpen(false); setContent('') }} />
            <h2 className={styles.title}>Add New Product</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="productName" className={styles.label}>
                        Nom du produit:
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder='Entrer le nom du produit...'
                    />
                </div>

                {/* Price */}
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>
                        Prix:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder='Entrer le prix du produit...'
                    />
                </div>

                {/* Category */}
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        catégorie:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className={styles.select}
                    >
                        <option value="">Choisir une catégorie</option>
                        <option value="Écouteurs">Écouteurs</option>
                        <option value="Câbles">Câbles</option>
                        <option value="Chargeurs">chargeurs</option>
                        <option value="Power banks">Power Banks</option>
                        <option value="Batteries">Batteries</option>
                        <option value="Chargeur de voiture">Chargeur de voiture</option>
                        <option value="Supports">Supports</option>
                        <option value="Modulateur">Modulateur</option>
                        <option value="Haut-parleurs">Haut-parleurs</option>
                        <option value="Montres">Montres</option>
                        <option value="Powerbank">Powerbank</option>
                    </select>
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className={styles.textarea}
                        placeholder='Entrer la description du produit...'
                    ></textarea>
                </div>

                {/* Product Image */}
                <div className={styles.formGroup}>
                    <label htmlFor="productImage" className={styles.label}>
                        Image du produit:
                    </label>
                    <input
                        type="file"
                        id="productImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                    {/* Image Preview */}
                    {formData.previewImage && (
                        <img
                            src={formData.previewImage}
                            alt="Product Preview"
                            className={styles.imagePreview}
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Ajouter le produit:
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
