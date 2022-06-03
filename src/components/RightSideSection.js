import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, ToggleButtonGroup } from "@mui/material";

import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { selectedVariation } from "../redux/slices/productSlice";

// =====================start=================================
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
// ===========================end===========================

const RightSideSection = ({ prop }) => {
  // ========================start==============================
  const [propsValue, setPropsValue] = useState(null);
  const [arr, setArr] = useState([]);

  const handleValue = (event, newPropsValue) => {
    setPropsValue(newPropsValue);
  };
  // console.log("propsValue:::", propsValue);
  // console.log("prop.name:::", prop.name);
  // console.log({});

  const variation = useSelector((state) => state.product.variation);
  const dispatch = useDispatch();

  useEffect(() => {
    propsValue &&
      //   // variation.find((check) => check.id !== propsValue.id) &&
      dispatch(selectedVariation(...arr));
    // if (propsValue) {
    //   if (variation.length === 0) {
    //     console.log("ok from if");
    //     dispatch(selectedVariation(propsValue));
    //   } else if (variation.length !== 0 && !prop.value.includes(propsValue)) {
    //     dispatch(selectedVariation(propsValue));
    //     console.log("OK from else if");
    //   } else {
    //     console.log("not ok");
    //   }
    // }
  }, [arr, dispatch]);

  // console.log("propsValue:::", propsValue);
  console.log("variation:::", variation);

  if (propsValue && !arr.includes(propsValue)) {
    setArr([...arr, propsValue]);
  }
  // console.log(propsValue);
  // console.log(arr);
  // ==========================end============================

  return (
    <Paper key={prop.id} elevation={3} sx={{ mt: 2, py: 3, textAlign: "left" }}>
      <Typography sx={{ px: 1 }}>{prop.name}: </Typography>
      <StyledToggleButtonGroup
        size="small"
        value={propsValue}
        exclusive
        onChange={handleValue}
        // onChange={(e, value) => setPropsValue(value)}
        aria-label="text propsValue"
      >
        {prop.values.map((value) =>
          value.thumb ? (
            <ToggleButton
              key={value.id}
              value={value}
              // value={{ value: value, name: prop.name }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <img src={value.thumb} alt="" />
              <Typography>{value.name}</Typography>
            </ToggleButton>
          ) : (
            <ToggleButton
              key={value.id}
              value={value}
              // value={{ value: value, name: prop.name }}
            >
              <Typography>{value.name}</Typography>
            </ToggleButton>
          )
        )}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default RightSideSection;
