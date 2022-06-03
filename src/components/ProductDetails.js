import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Link,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  Paper,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/productSlice";
import RightSideSection from "./RightSideSection";

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    href="/"
    onClick={console.info("You clicked a breadcrumb.")}
  >
    MUI
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/material-ui/getting-started/installation/"
    onClick={console.info("You clicked a breadcrumb.")}
  >
    Core
  </Link>,
  <Typography key="3" color="text.primary">
    Breadcrumb
  </Typography>,
];

const ProductDetails = () => {
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // console.log("product:::", product);

  return (
    <Box>
      <Typography>This is product details component!</Typography>

      <Box sx={{ display: { sm: "flex" } }}>
        <Typography sx={{ mr: 5 }}>Related Category</Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <ImageList cols={2}>
              {product?.gallery?.map((item) => (
                <ImageListItem key={item?.url}>
                  <img src={item?.url} alt={item.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {Object.keys(product).length !== 0 && (
            <Box>
              <Typography>{product?.title}</Typography>
              <Paper elevation={3} sx={{ mt: 2, py: 3 }}>
                <Typography>Price: 100</Typography>
              </Paper>

              {product.variation.props.map((prop) => (
                <RightSideSection prop={prop} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
