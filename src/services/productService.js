import api from "./api";

// Get all products
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create product
export const createProduct = async (productData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== "productImage") {
        formData.append(key, productData[key]);
      }
    });

    // Append files if any
    if (productData.productImage && productData.productImage.length > 0) {
      for (let i = 0; i < productData.productImage.length; i++) {
        formData.append("productImage", productData.productImage[i]);
      }
    }

    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== "productImage") {
        formData.append(key, productData[key]);
      }
    });

    // Append files if any
    if (productData.productImage && productData.productImage.length > 0) {
      for (let i = 0; i < productData.productImage.length; i++) {
        formData.append("productImage", productData.productImage[i]);
      }
    }

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
