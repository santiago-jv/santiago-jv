import styles from "./main-content.module.css";
import { SocialLink } from "@/types/global";

const MainContent: React.FC = () => {
    const socialLinks: SocialLink[] = [
        {
            href: "https://github.com/santiago-jv/santiago-jv",
            icon: "fab fa-github",
            label: "GitHub Profile",
            platform: "github"
        },
        {
            href: "https://twitter.com/santiago_jv4035",
            icon: "fab fa-twitter", 
            label: "Twitter Profile",
            platform: "twitter"
        },
        {
            href: "mailto:santiagoolayojv@gmail.com",
            icon: "fas fa-envelope",
            label: "Email Contact",
            platform: "email"
        },
        {
            href: "https://www.instagram.com/santiago_ojv",
            icon: "fab fa-instagram",
            label: "Instagram Profile", 
            platform: "instagram"
        }
    ];

    return (
        <main id="about" className={styles["main-content"]}>
            <img 
                src="/images/background.png" 
                alt="Decorative background illustration" 
                className={styles["background"]}
            />
            <h1 className={`${styles["greeting-text"]} ${styles["red-text"]} animate__animated animate__fadeInDown`}>
                Hi, my name is
            </h1>
            <h2 className={`${styles['title']} animate__animated animate__fadeInDown animate__delay-1s`}>
                Santiago Olayo
            </h2>
            <h2 className={`${styles['subtitle']} animate__animated animate__fadeInDown animate__delay-1s`}>
                Semi Senior Backend Engineer
            </h2> 

            <div className={`${styles['information']} animate__animated animate__fadeInDown animate__delay-2s`}>
                <p className={styles['description']}>
                    Specialized in building robust backend systems with NestJS, Spring Boot, and cloud technologies
                </p>
            </div>
            <a 
                target='_blank' 
                rel='noreferrer noopener' 
                href="https://linkedin.com/in/santiago-jv" 
                className={`${styles['button']} animate__animated animate__fadeInLeft animate__delay-3s`}
                aria-label="Check my LinkedIn profile"
            >
                Check my LinkedIn
            </a>


        </main>
    );
};

export default MainContent;
