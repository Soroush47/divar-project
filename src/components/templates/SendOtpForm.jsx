import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useStore } from "src/hooks/useStore";
import { sendOtp } from "src/services/auth";
import { useFocus } from "src/hooks/useFocus";

import styles from "./Form.module.css";

function SendOtpForm() {
    const setShowCheck = useStore(state => state.setShowCheck);

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting },
        clearErrors,
        setFocus,
        reset,
    } = useForm({
        reValidateMode: "onSubmit",
    });

    useFocus("code", setFocus);

    useEffect(() => {
        Object.keys(errors).length && clearErrors();
    }, [watch("phone")]);

    const onSubmit = async ({ phone }) => {
        const { res, error } = await sendOtp(phone);
        res && setShowCheck(phone);
        if (error) {
            setError("failed", { type: "sendApi", message: error });
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p>ورود به حساب کاربری</p>
            <span className={styles.text}>
                برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
                تایید به این شماره ارسال خواهد شد.
            </span>
            <div className={styles.input}>
                <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
                <input
                    type="text"
                    placeholder="شماره موبایل"
                    {...register("phone", {
                        required: "وارد کردن شماره موبایل الزامی است.",
                        minLength: {
                            value: 11,
                            message: "شماره موبایل وارد شده صحیح نمیباشد.",
                        },
                        maxLength: {
                            value: 11,
                            message: "شماره موبایل وارد شده صحیح نمیباشد.",
                        },
                    })}
                />
                {console.log({ errors })}
                <span className={styles.error}>{errors.phone?.message}</span>
            </div>
            <button
                className={isSubmitting ? styles.submitting : styles.button}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "در حال ارسال..." : "تایید"}
            </button>
        </form>
    );
}

export default SendOtpForm;
