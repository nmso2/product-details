import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/productSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    console.log("id:::::::::", id);
    dispatch(removeFromCart(id));
  };

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
      <IconButton
        aria-label="delete"
        onClick={() => removeFromCartHandler(item.id)}
      >
        <DeleteForeverOutlinedIcon color="error" />
      </IconButton>
    </Box>
  );
};

export default CartItem;
