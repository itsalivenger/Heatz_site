import React, { useState } from 'react';
import styles from './searchBar.module.css';

const SearchBar = ({ toggleSearchInput, isActive, handleSubmit }) => {
    const [searchVal, setSearchVal] = useState('');

    return (
        <div className={`${styles.searchBarContainer} ${isActive ? styles.active : ''}`}>
            <div className={styles.searchBar}>
                <div onClick={toggleSearchInput} className={`${styles['closeIcon']} ${styles.icons}`}>
                    <i className={`material-symbols-outlined`}>close</i>
                </div>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search..."
                    onChange={(e)=> setSearchVal(e.target.value)}
                    value={searchVal}
                />
                <div onClick={()=> handleSubmit(searchVal)} className={`${styles['searchIcon']} ${styles.icons}`}>
                    <i className={`material-symbols-outlined`}>search</i>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;