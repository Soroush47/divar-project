import axios from "axios";
import { getNewTokens } from "src/services/token";
import { getCookie, setCookie } from "src/utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    req => {
        if (req.url !== "/auth/check-refresh-token") {
            const accessToken = getCookie("accessToken");
            // console.log({ accessToken });
            accessToken && (req.headers.Authorization = `bearer ${accessToken}`);
        }
        // console.log({ req });
        return req;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    res => res,
    async error => {
        const OriginalRequest = error.config;
        if (
            OriginalRequest.url === "/user/whoami" &&
            error.response.status === 401 &&
            !OriginalRequest._retry
        ) {
            OriginalRequest._retry = true;
            const res = await getNewTokens();
            // console.log(res);
            if (!res?.response) return error;
            setCookie(res.response.data);
            return api(OriginalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;
