import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import SearchBar from './searchBar';
import { searchItems } from '../other/usefulFunctions';

function Navbar({ isAuthenticated, isAdmin, onLogout }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [menuIsToggled, setMenuIsToggled] = useState(false);
  const [setDropdownItems] = useState([]);

  const handleSubmit = async (val) => {
    // to submit value
    console.log(val);
    const response = await searchItems(val);
    setDropdownItems(response);

    // setDropdownItems(dropdownItems);
  }
  
  const toggleSearchInput = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <>
      <nav className={`${styles.navbar}`}>
        <Link to={'/'} className={styles["navbar-logo"]}>
          <img src={"./public/images/logos/vector.svg"} alt='this is the company logo dedrno2' />
        </Link>

        <div className={`${styles["linksContainer"]} toggledMenu ${menuIsToggled ? styles.toggledMenu : ''}`}>
          <div className={`${styles["navbar-links"]} ${isSearchActive ? styles['inactive'] : ''}`}>
            <Link to={'/'}>Acceuil</Link>
            <Link to={'/boutique'}>Boutique</Link>
            <Link to={'/'}>Categories</Link>
            <Link to={'contact'}>Contact</Link>
          </div>

          <div className={`${styles["navbar-icons"]} ${isSearchActive ? styles['inactive'] : ''}`}>
            {/* Cart Link */}
            <Link to={'cart'} className={styles["info-container"]}>
              <i className="material-symbols-outlined">shopping_bag</i>
              <div className={styles["info-text"]}>Panier</div>
            </Link>

            {/* Favorite Link */}
            <Link to={'favorite'} className={styles["info-container"]}>
              <i className="material-symbols-outlined">favorite</i>
              <div className={styles["info-text"]}>Favoris</div>
            </Link>

            {/* Profile Link */}
            {isAuthenticated ? (
              <Link to={'/profile'} className={styles["info-container"]}>
                <i className="material-symbols-outlined">person</i>
                <div className={styles["info-text"]}>Profile</div>
              </Link>
            ) : (
              <Link to={'/signup'} className={styles["info-container"]}>
                <i className="material-symbols-outlined">person</i>
                <div className={styles["info-text"]}>Créer un compte</div>
              </Link>
            )}

            {/* Admin Link */}
            {isAdmin && (
              <Link to={'/admin'} className={styles["info-container"]}>
                <i className="material-symbols-outlined">admin_panel_settings</i>
                <div className={styles["info-text"]}>Panneau d'administration
                </div>
              </Link>
            )}

            {/* Logout or Login Link */}
            {isAuthenticated ? (
              <div className={styles["info-container"]} onClick={onLogout}>
                <i className="material-symbols-outlined">logout</i>
                <div className={styles["info-text"]}>Déconnexion</div>
              </div>
            ) : (
              <Link to={'/login'} className={styles["info-container"]}>
                <i className="material-symbols-outlined">login</i>
                <div className={styles["info-text"]}>Connexion</div>
              </Link>
            )}

            {/* Search Input (optional, as you have a toggle here) */}
            <div onClick={toggleSearchInput} className={styles["info-container"]}>
              <i className="material-symbols-outlined">search</i>
            </div>
          </div>

          <div className={`${styles["closeIcon"]} ${styles.closeBtnContainer}`}>
            <i onClick={() => setMenuIsToggled(!menuIsToggled)} className={`material-symbols-outlined`}>
              close
              <div className={styles["info-text"]}>Fermer</div>
            </i>
          </div>
        </div>

        <div className={styles["mobile-logo"]}>
          <img src='./images/logos/HeatzLogo.png' alt='Heatz Logo'  />
        </div>
        <SearchBar handleSubmit={handleSubmit} toggleSearchInput={toggleSearchInput} isActive={isSearchActive} />
        <div onClick={() => setMenuIsToggled(!menuIsToggled)} className={`${styles.hamburger} ${styles["info-container"]}`}>
          <i className={`material-symbols-outlined`}>menu</i>
          <div className={styles["info-text"]}>Menu</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;