import { useCallback, useEffect, useState } from 'react';
import styles from './adminSideNav.module.css';
import DashboardAdmin from '../dashboardAdmin/dashboardAdmin';
import ProductManagement from '../ProductManagement/ProductManagement';
import OrdersAdmin from '../../pages/OrdersAdmin/OrdersAdmin';
import AddProductForm from '../addProductForm/addProductForm';
import NewsletterDashboard from '../NewsletterDashboard/NewsletterDashboard';
import LazyMedia from '../lazyMedia/LazyMedia';



function  AdminSideNav({ handleContent }) {
    const [open, setOpen] = useState(false);
    const toggleSideNav = () => {
        setOpen(!open);
    }

    const [toggled, setToggled] = useState(false);
    const toggleProductsCrud = () => {
        setToggled(!toggled);
    }

    const stableHandleContent = useCallback(() => {
        handleContent(<DashboardAdmin />);
    }, [handleContent]);

    useEffect(() => {
        stableHandleContent();
    }, []);

    return (
        <div className={`${styles.sidenav} ${open ? styles.open : ''}`}>
            <div onClick={toggleSideNav} className={`${styles.toggleButton} ${open ? styles.openMenu : ''}`}>
                <i className={`${styles.icon} material-symbols-outlined`}>menu</i>
            </div>

            <div className={styles.logo}>
                <LazyMedia type={'image'} src='./images/logos/HeatzLogo.png' alt='Heatz logo' className={styles.logoText} />
                <i className={`${styles.icon} material-symbols-outlined`}></i>
            </div>
            <nav className={styles.navMenu}>
                <div className={styles.navGroup}>
                    <a href="#orders" className={styles.navItem} onClick={() => { handleContent(<DashboardAdmin />) }}>
                        <i className={`${styles.icon} material-symbols-outlined`}>dashboard</i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#orders" className={styles.navItem} onClick={() => { handleContent(<OrdersAdmin />) }}>
                        <i className={`${styles.icon} material-symbols-outlined`}>orders</i>
                        <span>Commandes</span>
                    </a>
                    <a onClick={() => { toggleProductsCrud() }} href="#products" className={styles.navItem}>
                        <i className={`${styles.icon} material-symbols-outlined`}>inventory_2</i>
                        <span>Produits {toggled ? <i className={`${styles.icon} material-symbols-outlined`}>expand_less</i> : <i className={`${styles.icon} material-symbols-outlined`}>expand_more</i>}
                        </span>
                    </a>

                    <div className={`${styles.dropDown} ${toggled ? styles.toggled : ''}`}>
                        <a href="#products" className={styles.navItem} onClick={() => { handleContent(<AddProductForm />) }}>
                            <i className={`${styles.icon} material-symbols-outlined`}>add_shopping_cart</i>
                            <span>Ajouter des Produits</span>
                        </a>
                        <a href="#products" className={styles.navItem} onClick={() => { handleContent(<ProductManagement />) }}>
                            <i className={`${styles.icon} material-symbols-outlined`}>edit_note</i>
                            <span>Manager les Produits</span>
                        </a>
                    </div>

                    <a href="#promotions" className={styles.navItem} onClick={() => { handleContent(<></>) }}>
                        <i className={`${styles.icon} material-symbols-outlined`}>local_offer</i>
                        <span>Promotions</span>
                    </a>
                    <a href="#analytics" className={styles.navItem} onClick={() => { handleContent(<NewsletterDashboard />) }}>
                        <i className={`${styles.icon} material-symbols-outlined`}>campaign</i>
                        <span>Promouvoir vos produits</span>
                    </a>
                    <a href="#statements" className={`${styles.navItem}`} onClick={() => { handleContent(<></>) }}>
                        <i className={`${styles.icon} material-symbols-outlined`}>description</i>
                        <span>Relevés de compte</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default AdminSideNav;