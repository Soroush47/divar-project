import api from "src/configs/api";

const getCategory = () => api.get("/category");

const addCategory = data => api.post("/category", data);

const deleteCategory = id => api.delete(`/category/${id}`);


export { getCategory, addCategory, deleteCategory };
