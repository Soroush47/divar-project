import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookie";
import { useStore } from "src/hooks/useStore";
import { useProfile } from "src/hooks/queries";
import { useFocus } from "src/hooks/useFocus";

import styles from "./Form.module.css";

function CheckOtpForm() {
    const phone = useStore(state => state.showCheck);
    const setShowCheck = useStore(state => state.setShowCheck);
    const { refetch } = useProfile(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm({
        reValidateMode: "onSubmit",
    });

    useFocus("code", setFocus);

    useEffect(() => {
        console.log("watch code use effect");
        Object.keys(errors).length && clearErrors();
    }, [watch("code")]);

    const onSubmit = async ({ code }) => {
        const { res, error } = await checkOtp(phone, code);
        if (res) {
            setShowCheck();
            setCookie(res.data);
            refetch();
            navigate("/");
        }
        error &&
            setError("failed", { type: "checkApi", message: "کد وارد شده صحیح نمیباشد" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p>تایید کد ارسال شده</p>
            <div className={styles.input}>
                <span className={styles.text}>
                    کد ارسال شده به شماره «{phone}» را وارد کنید
                </span>
                <input
                    type="text"
                    placeholder="کد تایید"
                    style={{ maxWidth: "120px" }}
                    {...register("code", {
                        required: "لطفا کد تایید را وارد نمایید",
                        minLength: {
                            value: 5,
                            message: "کد وارد شده باید 5 رقم باشد",
                        },
                        maxLength: {
                            value: 5,
                            message: "کد وارد شده 5 رقم باشد",
                        },
                    })}
                />
                <span className={styles.error}>{errors.code?.message}</span>
            </div>
            <button
                className={isSubmitting ? styles.submitting : styles.button}
                disabled={isSubmitting}
                type="submit"
            >
                {isSubmitting ? "در حال ارسال..." : "ورود"}
            </button>
            <button
                className={styles.changePhone}
                onClick={e => {
                    e.preventDefault();
                    setShowCheck();
                }}
            >
                تغییر شماره موبایل
            </button>
            <span className={styles.error}>
                {!!errors.failed && errors.failed.message}
            </span>
        </form>
    );
}

export default CheckOtpForm;
