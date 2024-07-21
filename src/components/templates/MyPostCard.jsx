import { useQueryClient } from "@tanstack/react-query";
import styles from "./MyPostCard.module.css";
import { deletPost } from "src/services/user";

const baseUrl = import.meta.env.VITE_BASE_URL;

function MyPostCard({ post }) {
    const queryClient = useQueryClient();
    console.log(post);

    const deleteHandler = async id => {
        try {
            const res = await deletPost(id);
            console.log(res);
            res.status === 200 &&
                queryClient.invalidateQueries({ queryKey: ["my-posts-list"] }) &&
                queryClient.invalidateQueries({
                    queryKey: ["all-posts-list"],
                    refetchType: "all",
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.post}>
            <div className={styles.items}>
                <img
                    src={
                        post.images[0] ? `${baseUrl}/${post.images[0]}` : "/no-image.png"
                    }
                />
                <div>
                    <h5>{post.options?.title || "عنوان ندارد"}</h5>
                    <span>{post.options?.content || "محتوا ندارد"}</span>
                </div>
            </div>
            <div className={styles.items}>
                <div className={styles.price}>
                    <h5>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</h5>
                    <span>{post.amount.toLocaleString("fa-IR")} تومان </span>
                </div>
                <button onClick={() => deleteHandler(post._id)}>حذف</button>
            </div>
        </div>
    );
}

export default MyPostCard;
