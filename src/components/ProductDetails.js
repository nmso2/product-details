import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/productSlice";

const ProductDetails = () => {
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  console.log("product:::", product);

  return (
    <Box>
      <Typography>This is product details component!</Typography>
    </Box>
  );
};

export default ProductDetails;
