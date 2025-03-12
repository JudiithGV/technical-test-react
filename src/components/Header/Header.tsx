import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <a className={styles.title} href="/">ShowFinder</a>
        </div>
    );
};

export default Header;