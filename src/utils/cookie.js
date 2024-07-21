const setCookie = tokens => {
    // console.log({ tokens });
    document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * 24 * 60 * 60}`;
    document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${30 * 24 * 60 * 60}`;
};

const getCookie = tk => {
    const cookies = document.cookie.split(";");
    // console.log({ cookies });
    const token = cookies
        ?.find(ck => ck?.split("=")[0].trim() === tk)
        ?.split("=")[1]
        .trim();
    // console.log({ token });
    return token;
};

// const clearCookie = () => {
//     document.clea
// }

export { setCookie, getCookie };
