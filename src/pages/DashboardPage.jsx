import AddPost from "src/components/templates/AddPost";
import MyPostsList from "src/components/templates/MyPostsList";

function DashboardPage() {
    return (
        <div>
            <AddPost />
            <MyPostsList />
        </div>
    );
}

export default DashboardPage;
