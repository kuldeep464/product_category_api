import { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProductById, updateProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    productImage: [],
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          getProductById(id),
          getCategories(),
        ]);

        setFormData({
          name: productData.name,
          title: productData.title,
          description: productData.description,
          category: productData.category._id,
          productImage: [],
        });

        setExistingImages(productData.productImage || []);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);

    setFormData({
      ...formData,
      productImage: files,
    });
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Create a new form data object that includes existing images
      const updatedFormData = {
        ...formData,
        existingImages: existingImages,
      };

      await updateProduct(id, updatedFormData);
      navigate(`/products/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update product. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/products"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <InventoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Products
        </Link>
        <Typography color="text.primary">Edit Product</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="title"
                label="Product Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  disabled={submitting}
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Images
                </Typography>
                <ImageList cols={4} gap={8}>
                  {existingImages.map((image, index) => (
                    <ImageListItem key={index} sx={{ position: "relative" }}>
                      <img
                        src={`/uploads/${image}`}
                        alt={`Product ${index + 1}`}
                        loading="lazy"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          bgcolor: "rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                        size="small"
                        onClick={() => handleRemoveExistingImage(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}

            {/* New Images */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
                disabled={submitting}
              >
                Upload New Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreview.length > 0 && (
                <>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    New Images to Upload
                  </Typography>
                  <Grid container spacing={2}>
                    {imagePreview.map((src, index) => (
                      <Grid item key={index} xs={6} sm={4} md={3}>
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(`/products/${id}`)}
              sx={{ mr: 2 }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={
                submitting ||
                !formData.name.trim() ||
                !formData.title.trim() ||
                !formData.description.trim() ||
                !formData.category
              }
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductEditPage;
