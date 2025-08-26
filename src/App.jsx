import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import CategoryListPage from "./pages/CategoryListPage";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import NotFoundPage from "./pages/NotFoundPage";

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container
          component="main"
          sx={{ py: 4, minHeight: "calc(100vh - 128px)" }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/edit/:id" element={<ProductEditPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/categories/create" element={<CategoryCreatePage />} />
            <Route path="/categories" element={<CategoryListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
