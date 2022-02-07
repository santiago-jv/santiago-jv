import React, { useEffect, useRef } from 'react';
import styles from './header.module.css';
const Header = () => {
    const navbarReference = useRef()
    const backgroundReference = useRef()
    const headerReference = useRef()
    const lastScrollValue = useRef(0)
    useEffect(()=>{
        window.addEventListener('scroll', (event) =>{
            const currentScroll = window.pageYOffset;
            if (currentScroll == 0) {
                headerReference.current.classList.remove(styles['header--hidden']);
                return;
            }
            
            if (currentScroll > lastScrollValue.current ) {
                headerReference.current.classList.add(styles['header--hidden']);
            } 
            else if (currentScroll < lastScrollValue.current) {  
              headerReference.current.classList.remove(styles['header--hidden']);  
            }
            lastScrollValue.current = currentScroll;
          
        })
    },[])

    const handleNavbar = () => {
        navbarReference.current.classList.toggle(styles['header__navbar--open']);
        backgroundReference.current.classList.toggle(styles['background--show']);
    }
  return (
    <>
        <header ref={headerReference} className={styles['header']}>
        
            <img className={styles['logo']} src="images/logo.svg" alt="Nest js"/>
            

            <nav ref={navbarReference} className={styles['header__navbar']}>
                <header className={styles['navbar__header']}>
                    <h1 className={styles['navbar__title']}>
                        Menu
                    </h1>
                    <i onClick={handleNavbar} className={'fas fa-times '+styles['navbar__close-icon']}></i>
                </header>
                <ul className={styles['navbar__items']}>
                    <li className={styles['navbar__item']}>
                        <a href="#" className={styles['navbar__link']}>
                            Sobre mi
                        </a>
                    </li>
                    <li className={styles['navbar__item']}>
                        <a href="#" className={styles['navbar__link']}>
                            Proyectos
                        </a>
                    </li>
                    <li className={styles['navbar__item']}>
                        <a href="#" className={styles['navbar__link']}>
                            Contáctame
                        </a>
                    </li>
                </ul>
            </nav>

            <i onClick={handleNavbar} className={"fas fa-bars " + styles['header__menu-button']}></i>
        </header>
        <div ref={backgroundReference} onClick={handleNavbar} className={styles['background']}></div>
    </>
  )
};

export default Header;
