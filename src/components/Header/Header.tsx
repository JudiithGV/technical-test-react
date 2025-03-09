import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <a className={styles.title} href="/">ShowFinder</a>
            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
            <Image src="/avatar.png"
                alt="Avatar"
                width={30}
                height={30}   />
        </div>
    );
};

export default Header;