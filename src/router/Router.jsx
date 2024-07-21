import { Navigate, Route, Routes } from "react-router-dom";
import { useProfile } from "src/hooks/queries";

import HomePage from "src/pages/HomePage";
import AuthPage from "src/pages/AuthPage";
import AdminPage from "src/pages/AdminPage";
import DashboardPage from "src/pages/DashboardPage";
import NotFoundPage from "src/pages/NotFoundPage";
import Loader from "src/components/modules/Loader";

import styles from "./Router.module.css";
import PostDetailsPage from "src/pages/PostDetailsPage";

function Router() {
    const { data, error, isPending } = useProfile();

    // console.log({ data, error, isPending });

    if (isPending) return <Loader />;

    if (error) return <p>Error</p>

    return (
        <div className={styles.router}>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/post/:id" element={<PostDetailsPage />} />
                <Route
                    path="/auth"
                    element={data?.data ? <Navigate to="/dashboard" /> : <AuthPage />}
                />
                <Route
                    path="/admin"
                    element={
                        data?.data?.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/dashboard"
                    element={data?.data ? <DashboardPage /> : <Navigate to="/auth" />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default Router;
