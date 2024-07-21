import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

import Loader from "../modules/Loader";

import { useCategory } from "src/hooks/queries";
import { getCookie } from "src/utils/cookie";

import styles from "./AddPost.module.css";
import toast, { Toaster } from "react-hot-toast";

function AddPost() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            title: "آیفون 15",
            content: "7 ماه استفاده شده",
            amount: "70000000",
            category: "6691199c13d27f6c83d23dd7",
            city: "اصفهان",
        },
    });

    const { data, error, isPending } = useCategory();

    const onSubmit = async data => {
        const formData = new FormData();

        for (let i in data) {
            i !== "file" && formData.append(i, data[i]);
        }

        formData.append("images", data.file[0]);

        const token = getCookie("accessToken");
        try {
            console.log(
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/post/create`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `bearer ${token}`,
                        },
                    }
                )
            );
            queryClient.invalidateQueries({ queryKey: ["my-posts-list"] });
            // queryClient.invalidateQueries({
            //     queryKey: ["all-posts-list"],
            //     refetchType: "all",
            // });
            queryClient.removeQueries({queryKey: ["all-posts-list"]})
            toast.success("آگهی با موفقیت ایجاد شد");
        } catch (error) {
            console.log(error);
            toast.error("مشکلی پیش آمده است");
        }
    };

    // isSubmitSuccessful &&
    //     console.log(
    //         !!queryClient.invalidateQueries({ queryKey: ["my-posts-list"] }),
    //         clearErrors("create")
    //     );

    if (isPending) return <Loader />;
    if (error) return <p>Error</p>;

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" {...register("title")} id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea {...register("content")} id="content" />
            <label htmlFor="amount">مبلغ</label>
            <input type="number" {...register("amount")} id="amount" />
            <label htmlFor="category">دسته بندی</label>
            <select type="text" {...register("category")} id="category">
                {data?.data?.map((category, index) => (
                    <option key={index} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <label htmlFor="city">شهر</label>
            <input type="text" {...register("city")} id="city" />
            <label htmlFor="file">فایل</label>
            <input type="file" {...register("file")} id="file"></input>
            <button type="submit">ایجاد</button>
            <Toaster />
        </form>
    );
}

export default AddPost;
