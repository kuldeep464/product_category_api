import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Product API - {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Built with "}
          <Link color="inherit" href="https://mui.com/">
            sourabh
          </Link>
          {" and "}
          <Link color="inherit" href="https://reactjs.org/">
            bhakar
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
