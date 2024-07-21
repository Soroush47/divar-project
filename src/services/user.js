import api from "src/configs/api";

const getProfile = () => api.get("/user/whoami");

const getMyPosts = () => api.get("/post/my");

const deletPost = id => api.delete(`/post/delete/${id}`);

const getAllPosts = () => api.get("");

export { getProfile, getMyPosts, deletPost, getAllPosts };
