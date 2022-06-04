import React, { useEffect, useState } from "react";
import { Typography, Paper, ToggleButtonGroup } from "@mui/material";

import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import { useDispatch } from "react-redux";
import { selectedVariation } from "../../redux/slices/productSlice";

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

const VariationSection = ({ prop }) => {
  // ========================start==============================
  const [propsValue, setPropsValue] = useState({});
  const handleValue = (event, newPropsValue) => {
    setPropsValue(newPropsValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (propsValue && Object.keys(propsValue).length !== 0) {
      dispatch(selectedVariation(propsValue));
    }
    if (propsValue === null) {
      dispatch(
        selectedVariation(JSON.stringify({ name: prop.name, value: {} }))
      );
    }
  }, [dispatch, prop.name, propsValue]);

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
              // value={value}
              value={JSON.stringify({ value: value, name: prop.name })}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <img src={value.thumb} alt="" />
              <Typography>{value.name}</Typography>
            </ToggleButton>
          ) : (
            <ToggleButton
              key={value.id}
              // value={value}
              value={JSON.stringify({ value: value, name: prop.name })}
            >
              <Typography>{value.name}</Typography>
            </ToggleButton>
          )
        )}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default VariationSection;
