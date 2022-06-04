import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Link,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  Paper,
  Container,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/slices/productSlice";
import VariationSection from "./VariationSection";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Home
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/">
    Product
  </Link>,
  <Typography key="3" color="text.primary">
    Producut Details
  </Typography>,
];

const ProductDetails = () => {
  const product = useSelector((state) => state.product.product);
  const variation = useSelector((state) => state.product.variation);

  const [sku, setSku] = useState([]);
  const [variantImage, setVariantImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    if (variation.length === 0) {
      setVariantImage("");
    }
    variation.map(
      (v) =>
        JSON.parse(v).value.image && setVariantImage(JSON.parse(v).value.image)
    );
    variation.map((v) => arr.push(JSON.parse(v).value.id));
    setSku(arr);
  }, [variation]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // console.log("product:::", product);
  // console.log("galleryImage:::", galleryImage);
  // console.log("variation:::", variation);
  console.log("sku:::", sku);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: { sm: "flex" } }}>
        <Typography sx={{ mr: 5 }}>Related Category</Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <Box>
            <ImageList cols={2}>
              {variantImage ? (
                <ImageListItem>
                  <img src={variantImage} alt="" loading="lazy" />
                </ImageListItem>
              ) : (
                product?.gallery?.map((item) => (
                  <ImageListItem key={item?.url}>
                    <img src={item?.url} alt={item.title} loading="lazy" />
                  </ImageListItem>
                ))
              )}
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
                <VariationSection key={prop.id} prop={prop} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;

// function arrayEquals(a, b) {
//   a.sort((a, b) => a - b);
//   b.sort((a, b) => a - b);

//   return (
//     Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index])
//   );
// }
