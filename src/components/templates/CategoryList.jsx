import { useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "src/services/admin";

import icons from "src/contants/icons";
import { MdDeleteOutline } from "react-icons/md";

import styles from "./CategoryList.module.css";
function CategoryList({ data }) {
    const queryClient = useQueryClient();
    const deleteCat = async id => {
        console.log("deleting");
        console.log(await deleteCategory(id));
        queryClient.invalidateQueries({ queryKey: ["category"] });
    };

    return (
        <div className={styles.list}>
            {data.map(category => (
                <div key={category._id}>
                    <span className={styles.icon}>
                        {icons[category.icon] || icons.noIcone}
                    </span>
                    <h5>{category.name}</h5>
                    <p className={styles.delete}>
                        <MdDeleteOutline
                            className={styles.deleteIcon}
                            onClick={() => deleteCat(category._id)}
                        />
                        <span>slug: {category.slug}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
