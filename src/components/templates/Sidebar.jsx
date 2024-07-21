import { useStore } from "src/hooks/useStore";

import { IoReorderThreeOutline } from "react-icons/io5";

import icons from "src/contants/icons";

import styles from "./Sidebar.module.css";

function Sidebar({ data }) {
    const categoryStore = useStore(state => state.category);
    const setCategory = useStore(state => state.setCategory);

    console.log(data);

    return (
        <div>
            <h4 className={styles.title}>دسته ها</h4>
            <div className={styles.sidebar}>
                <div
                    className={
                        categoryStore === "all"
                            ? styles.category + " " + styles.active
                            : styles.category
                    }
                    onClick={() => setCategory("all")}
                >
                    <div className={styles.icon}>
                        <IoReorderThreeOutline />
                    </div>
                    <span>همه</span>
                </div>
                {data.map((category, index) => (
                    <div
                        className={
                            categoryStore === category._id
                                ? styles.category + " " + styles.active
                                : styles.category
                        }
                        key={index}
                        onClick={() => setCategory(category._id)}
                    >
                        <div className={styles.icon}>
                            {icons[category.icon] || icons.noIcone}
                        </div>
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
