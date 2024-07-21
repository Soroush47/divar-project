import { useQuery } from "@tanstack/react-query";

import { getMyPosts } from "src/services/user";
import Loader from "../modules/Loader";
import MyPostCard from "./MyPostCard";

import styles from "./MyPostsList.module.css";

function MyPostsList() {
    const { data, error, isPending } = useQuery({
        queryKey: ["my-posts-list"],
        queryFn: getMyPosts,
    });

    if (isPending) return <Loader />;
    if (error) return <p>Error</p>;

    return (
        <div className={styles.list}>
            <h3
            >
                آگهی های شما
            </h3>
            {data.data.posts.map((post, index) => (
                <MyPostCard key={index} post={post} />
            ))}
        </div>
    );
}

export default MyPostsList;
