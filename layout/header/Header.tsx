import React, { useEffect, useRef } from 'react';
import styles from './header.module.css';
import { NavigationItem } from '@/types/global';

const Header: React.FC = () => {
    const navbarReference = useRef<HTMLElement>(null);
    const backgroundReference = useRef<HTMLDivElement>(null);
    const headerReference = useRef<HTMLElement>(null);
    const lastScrollValue = useRef<number>(0);

    const navigationItems: NavigationItem[] = [
        { label: "About me", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact me", href: "#contact" }
    ];

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScroll = window.pageYOffset;
            if (currentScroll === 0) {
                headerReference.current?.classList.remove(styles['header--hidden']);
                return;
            }
            
            if (currentScroll > lastScrollValue.current) {
                headerReference.current?.classList.add(styles['header--hidden']);
            } 
            else if (currentScroll < lastScrollValue.current) {  
                headerReference.current?.classList.remove(styles['header--hidden']);  
            }
            lastScrollValue.current = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup event listener to prevent memory leaks
        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavbar = (): void => {
        navbarReference.current?.classList.toggle(styles['header__navbar--open']);
        backgroundReference.current?.classList.toggle(styles['background--show']);
    };

    const handleNavItemClick = (item: NavigationItem): void => {
        if (item.href) {
            const element = document.querySelector(item.href);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        }
        handleNavbar(); // Close mobile menu after selection
    };

    return (
        <>
            <header 
                ref={headerReference} 
                className={`${styles['header']} animate__animated animate__fadeInDown animate__delay-3s`}
            >
                <img 
                    className={styles['logo']} 
                    src="images/logo.svg" 
                    alt="Santiago Olayo Logo"
                />

                <nav ref={navbarReference} className={styles['header__navbar']}>
                    <header className={styles['navbar__header']}>
                        <h1 className={styles['navbar__title']}>
                            Menu
                        </h1>
                        <button 
                            onClick={handleNavbar} 
                            className={styles['navbar__close-icon']}
                            aria-label="Close navigation menu"
                            type="button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </header>
                    <ul className={styles['navbar__items']}>
                        {navigationItems.map((item) => (
                            <li key={item.label} className={styles['navbar__item']}>
                                <button 
                                    className={styles['navbar__link']} 
                                    type="button"
                                    onClick={() => handleNavItemClick(item)}
                                    aria-label={`Navigate to ${item.label}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button 
                    onClick={handleNavbar} 
                    className={styles['header__menu-button']} 
                    aria-label="Open navigation menu"
                    type="button"
                >
                    <i className="fas fa-bars"></i>
                </button>
            </header>
            <div 
                ref={backgroundReference} 
                onClick={handleNavbar} 
                className={styles['background']}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleNavbar();
                    }
                }}
                aria-label="Close navigation menu"
            />
        </>
    );
};

export default Header;
