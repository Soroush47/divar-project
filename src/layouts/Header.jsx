import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { FaRegUser } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { setCookie } from "src/utils/cookie";

import * as stylex from "@stylexjs/stylex";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";

// const styles = stylex.create({
//     container: {
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "10px 5px",
//         alignItems: "center",
//         marginBottom: "20px",
//     },
// });

function Header() {
    const queryClient = useQueryClient();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const closeHandler = e => {
            !menuButtonRef?.current?.contains(e.target) &&
                (menuRef?.current?.contains(e.target)
                    ? setTimeout(() => setShowMenu(false), 80)
                    : setShowMenu(false));
        };

        document.addEventListener("mouseup", closeHandler);

        return () => {
            document.removeEventListener("mouseup", closeHandler);
        };
    }, []);

    const removeHandler = () => {
        const cookies = document.cookie.split(";");
        console.log({ cookies });
        for (let i = 0; i < cookies.length; i++) {
            document.cookie = cookies[i] + "=; expires=" + new Date(0).toUTCString();
        }

        queryClient.invalidateQueries({ queryKey: ["profile"] });
        navigate("/");
    };

    const data = queryClient.getQueryData(["profile"]);

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div>
                    <Link to="/" className={styles.logo}>
                        <img src="divar.svg" />
                    </Link>
                    <span>
                        <img src="location.svg" />
                        <p>تهران</p>
                    </span>
                </div>
                <div>
                    <span
                        ref={menuButtonRef}
                        onClick={() => setShowMenu(showMenu => !showMenu)}
                        className={showMenu ? styles.active : styles.inActive}
                    >
                        <FaRegUser className={styles.icon} />
                        <p>دیوار من</p>
                    </span>
                    {showMenu && (
                        <div className={styles.menu} ref={menuRef}>
                            {data?.data?.role === "ADMIN" && (
                                <span onClick={() => navigate("/admin")}>
                                    <RiAdminLine className={styles.icon} />
                                    <p>پنل ادمین</p>
                                </span>
                            )}
                            <span onClick={removeHandler} className={styles.logout}>
                                <RxExit className={styles.icon} />
                                <p>خروج</p>
                            </span>
                        </div>
                    )}
                    <span onClick={() => navigate("/")}>صفحه اصلی</span>
                    <Link to="/dashboard" className={styles.button}>
                        ثبت آگهی
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
