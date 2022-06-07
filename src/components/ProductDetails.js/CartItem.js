import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const CartItem = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 1, md: 2 },
      }}
    >
      <CardMedia
        component="img"
        image={item.img}
        alt=""
        sx={{ px: { md: 2, xs: 1 }, width: { md: "120px", xs: "40px" } }}
      />
      <Typography
        sx={{ px: { md: 2, xs: 1 }, fontSize: { xs: "12px", sm: "15px" } }}
      >
        Qty: {item.quantity}
      </Typography>
      <Typography
        sx={{ px: { md: 2, xs: 1 }, fontSize: { xs: "12px", sm: "15px" } }}
      >
        <del style={{ color: "red" }}>Rs. {item.oldPrice}</del>
      </Typography>
      <Typography
        sx={{ px: { md: 2, xs: 1 }, fontSize: { xs: "12px", sm: "15px" } }}
      >
        Rs. {item.discountPrice}
      </Typography>
    </Box>
  );
};

export default CartItem;
