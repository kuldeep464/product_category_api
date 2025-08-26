import api from "./api";

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create category
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
