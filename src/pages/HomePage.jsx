import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        // Get only the latest 3 products
        setProducts(data.slice(0, 3));
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: "url(https://source.unsplash.com/random?products)",
          p: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Product Management System
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Easily manage your products and categories with our intuitive
                interface.
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/products/create"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add New Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Links Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.light",
              color: "white",
            }}
          >
            <InventoryIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Manage Products
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/products"
              sx={{ mt: 2 }}
            >
              View All Products
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "secondary.light",
              color: "white",
            }}
          >
            <CategoryIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Manage Categories
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/categories"
              sx={{ mt: 2 }}
            >
              View All Categories
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Products Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h2">
            Recent Products
          </Typography>
          <Button component={RouterLink} to="/products">
            View All
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Typography>Loading products...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : products.length === 0 ? (
          <Typography>
            No products found. Add some products to get started.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard
                  product={product}
                  onDelete={(id) =>
                    setProducts(products.filter((p) => p._id !== id))
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
