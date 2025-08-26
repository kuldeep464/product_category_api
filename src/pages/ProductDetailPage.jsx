import { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Breadcrumbs,
  Link,
  ImageList,
  ImageListItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getProductById, deleteProduct } from "../services/productService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(id);
      navigate("/products");
    } catch (err) {
      setError("Failed to delete product. Please try again later.");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
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

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
        <Button component={RouterLink} to="/products" variant="outlined">
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info" sx={{ my: 4 }}>
          Product not found.
        </Alert>
        <Button component={RouterLink} to="/products" variant="outlined">
          Back to Products
        </Button>
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
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            {product.productImage && product.productImage.length > 0 ? (
              <ImageList cols={product.productImage.length > 1 ? 2 : 1} gap={8}>
                {product.productImage.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`/uploads/${image}`}
                      alt={`${product.name} - ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No images available
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ mt: 2, mb: 3 }}>
              <Chip
                label={product.category?.name || "No Category"}
                color="primary"
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                component={RouterLink}
                to={`/products/edit/${product._id}`}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{product.name}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetailPage;
