import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product"
      )
      .then((response) => setProductDetails(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(productDetails);

  return (
    <Box>
      <Typography>This is product details component!</Typography>
    </Box>
  );
};

export default ProductDetails;
