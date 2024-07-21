import { useStore } from "src/hooks/useStore";
import PostCard from "./PostCard";

import styles from "./Main.module.css";

function Main({ data }) {
    const category = useStore(state => state.category);

    return (
        <div>
            <h4 className={styles.title}>محصولات</h4>
            <div className={styles.list}>
                {!!data.posts?.length &&
                    data.posts.map(
                        (post, index) =>
                            (category === "all" || category === post.category) && (
                                <PostCard key={index} post={post} />
                            )
                    )}
            </div>
        </div>
    );
}

export default Main;
