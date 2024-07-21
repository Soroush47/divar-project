import { useCategory } from "src/hooks/queries";

import CategoryForm from "src/components/templates/CategoryForm";
import CategoryList from "src/components/templates/CategoryList";
import Loader from "src/components/modules/Loader";

function AdminPage() {
    const { data, error, isPending, isLoading, isFetching } = useCategory();

    console.log({ data, error, isPending, isLoading, isFetching });

    return (
        <div>
            <h3
                style={{
                    marginBottom: "70px",
                    borderBottom: "3px solid #a62626",
                    width: "fit-content",
                    paddingBottom: "5px",
                }}
            >
                پنل ادمین
            </h3>
            {isPending ? (
                <Loader />
            ) : error ? (
                <p>Error</p>
            ) : (
                <CategoryList data={data?.data} />
            )}
            <CategoryForm />
        </div>
    );
}

export default AdminPage;
