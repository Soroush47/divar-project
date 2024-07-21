import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "src/services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const { mutateAsync } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ["category"] }),
    });

    const onSubmit = async data => {
        await mutateAsync(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h3>دسته بندی جدید</h3>
            <label htmlFor="name">اسم دسته بندی</label>
            <input type="text" id="name" {...register("name")} />
            <label htmlFor="slug">اسلاگ</label>
            <input type="text" id="slug" {...register("slug")} />
            <label htmlFor="icon">آیکون</label>
            <input type="text" id="icon" {...register("icon")} />
            <button type="submit" disabled={isSubmitting}>
                ایجاد
            </button>
        </form>
    );
}

export default CategoryForm;
