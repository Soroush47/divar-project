import { useState } from "react";
import styles from "./PostCard.module.css";

function PostCard({ post }) {
    const [imgSrc, setImgSrc] = useState(
        post.images[0]
            ? `${import.meta.env.VITE_BASE_URL}/${post.images[0]}`
            : "no-image.png"
    );

    return (
        <div className={styles.post}>
            <div className={styles.items}>
                <p>{post.options.title}</p>
                <div>
                    <span>{post.amount.toLocaleString("fa-IR")}</span>
                    <span>{post.options.city}</span>
                </div>
            </div>
            <img
                src={imgSrc}
                onError={() => setImgSrc("no-image.png")}
            />
        </div>
    );
}

export default PostCard;
