import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import SearchBar from './searchBar';
import { searchItems } from '../other/usefulFunctions';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';
import LazyMedia from '../lazyMedia/LazyMedia';

function Navbar({ isAuthenticated, isAdmin, onLogout }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [menuIsToggled, setMenuIsToggled] = useState(false);
  const location = useLocation();

  const handleSubmit = async (searchVal) => {
    // to submit value
    const response = await sendRequest(`${serverDomain}/products/searchItem`, 'POST', { searchVal });
    return response
  }

  const toggleSearchInput = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${location.pathname === '/' ? styles["navbar-home"] : ''}`}>
        <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/'} className={styles["navbar-logo"]}>
          {/* <LazyMedia type={'image'} src={"./images/logos/Vector.svg"} alt='this is the company logo' /> */}
          <img src='./images/logos/Vector.svg' alt='this is the company logo' />
        </Link>

        <div className={`${styles["linksContainer"]} toggledMenu ${menuIsToggled ? styles.toggledMenu : ''}`}>
          <div className={`${styles["navbar-links"]} ${isSearchActive ? styles['inactive'] : ''}`}>
            <a href="/">Accueil</a>
            <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/boutique'}>Boutique</Link>
            <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/about'}>A propos</Link>
            <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/contact'}>Contact</Link>
          </div>

          <div className={`${styles["navbar-icons"]} ${isSearchActive ? styles['inactive'] : ''}`}>
            {/* Cart Link */}
            <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'cart'} className={styles["info-container"]}>
              {/* <i className="material-symbols-outlined">shopping_bag</i> */}
              {/* <LazyMedia type={'image'} src='./images/icons/cart.svg' alt='cart icon' /> */}
              <img src='./images/icons/cart.svg' alt='cart icon' />
              <div className={styles["info-text"]}>Panier</div>
            </Link>

            {/* Favorite Link */}
            <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'favorite'} className={styles["info-container"]}>
              {/* <i className="material-symbols-outlined">favorite</i> */}
              {/* <LazyMedia type={'image'} src='./images/icons/heart.svg' alt='heart icon' /> */}
              <img src='./images/icons/heart.svg' alt='heart icon' />
              <div className={styles["info-text"]}>Favoris</div>
            </Link>

            {/* Profile Link */}
            {isAuthenticated ? (
              <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/profile'} className={styles["info-container"]}>
                {/* <i className="material-symbols-outlined">person</i> */}
                {/* <LazyMedia type={'image'} src='./images/icons/person.svg' alt='person icon' /> */}
                <img src='./images/icons/person.svg' alt='person icon' />
                <div className={styles["info-text"]}>Profile</div>
              </Link>
            ) : (
              <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/signup'} className={styles["info-container"]}>
                {/* <i className="material-symbols-outlined">person</i> */}
                {/* <LazyMedia type={'image'} src='./images/icons/person.svg' alt='person icon' /> */}
                <img src='./images/icons/person.svg' alt='person icon' />
                <div className={styles["info-text"]}>Créer un compte</div>
              </Link>
            )}

            {/* Admin Link */}
            {isAdmin && (
              <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/admin'} className={styles["info-container"]}>
                {/* <i className="material-symbols-outlined">admin_panel_settings</i> */}
                {/* <LazyMedia type={'image'} src='./images/icons/admin_panel.svg' alt='admin_panel icon' /> */}
                <img src='./images/icons/admin_panel.svg' alt='admin_panel icon' />
                <div className={styles["info-text"]}>Panneau d'administration
                </div>
              </Link>
            )}

            {/* Logout or Login Link */}
            {isAuthenticated ? (
              <div className={styles["info-container"]} onClick={onLogout}>
                {/* <i className="material-symbols-outlined">logout</i> */}
                {/* <LazyMedia type={'image'} src='./images/icons/logout.svg' alt='logout icon' /> */}
                <img src='./images/icons/logout.svg' alt='logout icon' />
                <div className={styles["info-text"]}>Déconnexion</div>
              </div>
            ) : (
              <Link onClick={() => setMenuIsToggled(!menuIsToggled)} to={'/login'} className={styles["info-container"]}>
                {/* <i className="material-symbols-outlined">login</i> */}
                {/* <LazyMedia type={'image'} src='./images/icons/login.svg' alt='login icon' /> */}
                <img src='./images/icons/login.svg' alt='login icon' />
                <div className={styles["info-text"]}>Connexion</div>
              </Link>
            )}

            {/* Search Input (optional, as you have a toggle here) */}
            <div onClick={toggleSearchInput} className={styles["info-container"]}>
              {/* <i className="material-symbols-outlined">search</i> */}
              {/* <LazyMedia type={'image'} src='./images/icons/search.svg' alt='search icon' /> */}
              <img src='./images/icons/search.svg' alt='search icon' />
            </div>
          </div>

          <div onClick={() => setMenuIsToggled(!menuIsToggled)} className={`${styles["closeIcon"]} ${styles.closeBtnContainer}`}>
            {/* <LazyMedia type={'image'} src='./images/icons/close.svg' alt='close icon' /> */}
            <img src='./images/icons/close.svg' alt='close icon' />
            <div className={styles["info-text"]}>Fermer</div>
            {/* <i className={`material-symbols-outlined`}>
              close
            </i> */}
          </div>
        </div>

        <div className={styles["mobile-logo"]}>
          {/* <LazyMedia type={'image'} src='./images/logos/HeatzLogo.png' alt='Heatz Logo' /> */}
          <img src='./images/logos/HeatzLogo.png' alt='Heatz Logo' />
        </div>
        <SearchBar handleSubmit={handleSubmit} toggleSearchInput={toggleSearchInput} isActive={isSearchActive} />
        <div onClick={() => setMenuIsToggled(!menuIsToggled)} className={`${styles.hamburger} ${styles["info-container"]}`}>
          {/* <i className={`material-symbols-outlined`}>menu</i> */}
          {/* <LazyMedia type={'image'} src='./images/icons/Menu.svg' alt='menu icon' /> */}
          <img src='./images/icons/Menu.svg' alt='menu icon' />
          <div className={styles["info-text"]}>Menu</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;