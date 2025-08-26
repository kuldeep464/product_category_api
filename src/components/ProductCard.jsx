import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../services/productService";

const ProductCard = ({ product, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(product._id);
      setOpen(false);
      if (onDelete) {
        onDelete(product._id);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Default image if no product image is available
  const imageUrl =
    product.productImage && product.productImage.length > 0
      ? `/uploads/${product.productImage[0]}`
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Chip
              label={product.category?.name || "No Category"}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            component={RouterLink}
            to={`/products/${product._id}`}
          >
            View
          </Button>
          <Button
            size="small"
            component={RouterLink}
            to={`/products/edit/${product._id}`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={handleClickOpen}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
