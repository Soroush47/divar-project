import { useState } from "react";

import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

import styles from "./Footer.module.css";

function Footer() {
    const [isFull, setIsFull] = useState(false);
    return (
        <footer className={styles.footer}>
            Developed by Soroush
            {isFull ? (
                <IoIosHeart className={styles.icon} onClick={() => setIsFull(false)} />
            ) : (
                <IoIosHeartEmpty
                    className={styles.icon}
                    onClick={() => setIsFull(true)}
                />
            )}
        </footer>
    );
}

export default Footer;
