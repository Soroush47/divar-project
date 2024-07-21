import api from "../configs/api";

const sendOtp = async mobile => {
    try {
        const res = await api.post("/auth/send-otp", { mobile });
        return { res };
    } catch (error) {
        return { error: error.message };
    }
};

const checkOtp = async (phone, code) => {
    try {
        const res = await api.post("/auth/check-otp", { mobile: phone, code });
        return { res };
    } catch (error) {
        return { error: error.message };
    }
};

export { sendOtp, checkOtp };
