import { useQuery } from "@tanstack/react-query";

import { useCategory, useProfile } from "src/hooks/queries";
import { getAllPosts } from "src/services/user";

import Main from "src/components/templates/Main";
import Sidebar from "src/components/templates/Sidebar";

import Loader from "src/components/modules/Loader";

import styles from "./HomePage.module.css";

function HomePage() {
    const { data: profile } = useProfile();

    const {
        data: categories,
        error: categoriesError,
        isPending: categoriesIsPending,
    } = useCategory();

    const {
        data: posts,
        error: postsError,
        isPending: postsIsPending,
    } = useQuery({
        queryKey: ["all-posts-list"],
        queryFn: getAllPosts,
    });


    if (postsIsPending || categoriesIsPending) return <Loader />;
    if (postsError || categoriesError) return <p>Error</p>;

    console.log("Home Page");
    return (
        <div className={styles.container}>
            <Sidebar data={categories.data} />
            <Main data={posts.data} />
        </div>
    );
}

export default HomePage;
