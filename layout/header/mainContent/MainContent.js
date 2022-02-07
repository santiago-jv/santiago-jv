import styles from "./main-content.module.css";

const MainContent = () => {
    return (
        <main className={styles["main-content"]}>
            <img  src="/images/background.png" alt="background cat" className={styles["background"]}/>
            <h1 className={styles["greeting-text"] + " " + styles["red-text"]}>
                Hola, mi nombre es
            </h1>
            <h2 className={styles['title']}>
                Santiago Olayo
            </h2>
            <h2 className={styles['subtitle']}>
                Desarrollo software para la web
            </h2> 

            <div className={styles['information']}>
                <p className={styles['description']}>
                    Soy estudiante de Ingeniería de Sistemas residente en Colombia y ocasionalmente
                    dedico parte de mi tiempo a aprender y pulir mis conocimientos en algunas tecnologías.

                </p>
            </div>
            <a href="https://linkedin.com/in/santiago-jv" className={styles['button']}>Revisa mi LinkeIn</a>

            <div className={styles['social-networks']}>
                <ul>
                    <li className={styles['social-item']}>
                        <a href="https://github.com/santiago-jv" className={styles['social-link']}>
                            <i className="fab fa-github"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a href="https://" className={styles['social-link']}>
                            <i className="fab fa-twitter"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a href="mailto:santiagoolayojv@gmail.com" className={styles['social-link']}>
                            <i class="fas fa-envelope"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a href="https://www.instagram.com/santiago_ojv" className={styles['social-link']}>
                            <i class="fab fa-instagram"></i>
                        </a>
                       
                    </li>
                    <hr className={styles['social-line']}></hr>
                </ul>
            </div>

        </main>
    )
};

export default MainContent;
