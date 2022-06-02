import styles from "./main-content.module.css";

const MainContent = () => {
    return (
        <main className={styles["main-content"]}>
            <img  src="/images/background.png" alt="background cat" className={styles["background"]}/>
            <h1 className={styles["greeting-text"] + " " + styles["red-text"] + " animate__animated animate__fadeInDown"}>
                Hi, my name is
            </h1>
            <h2 className={styles['title'] + " animate__animated animate__fadeInDown animate__delay-1s"}>
                Santiago Olayo
            </h2>
            <h2 className={styles['subtitle'] + " animate__animated animate__fadeInDown animate__delay-1s"}>
                I develope software for the web
            </h2> 

            <div className={styles['information'] + " animate__animated animate__fadeInDown animate__delay-2s"}>
                <p className={styles['description']}>
                    I like learn everything about software development :D
                </p>
            </div>
            <a target='_blank' href="https://linkedin.com/in/santiago-jv" className={styles['button'] + " animate__animated animate__fadeInLeft animate__delay-3s"}>Check my LinkedIn</a>

            <div className={styles['social-networks'] + " animate__animated animate__fadeInUp animate__delay-4s"}>
                <ul>
                    <li className={styles['social-item']}>
                        <a target='_blank' href="https://github.com/santiago-jv" className={styles['social-link']}>
                            <i className="fab fa-github"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a target='_blank' href="https://twitter.com/santiago_jv4035" className={styles['social-link']}>
                            <i className="fab fa-twitter"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a target='_blank' href="mailto:santiagoolayojv@gmail.com" className={styles['social-link']}>
                            <i className="fas fa-envelope"></i>
                        </a>
                       
                    </li>
                    <li className={styles['social-item']}>
                        <a target='_blank' href="https://www.instagram.com/santiago_ojv" className={styles['social-link']}>
                            <i className="fab fa-instagram"></i>
                        </a>
                       
                    </li>
                    <hr className={styles['social-line']}></hr>
                </ul>
            </div>

        </main>
    )
};

export default MainContent;
