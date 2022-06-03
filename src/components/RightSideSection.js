import React from "react";
import { Typography, Box, Paper, ToggleButtonGroup } from "@mui/material";

import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";

// =====================start=================================
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
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

const RightSideSection = ({ product }) => {
  // ========================start==============================
  const [alignment, setAlignment] = React.useState("left");

  const handleValue = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  console.log(alignment);
  // ==========================end============================

  return (
    <Box>
      <Typography>{product?.title}</Typography>
      <Paper elevation={3} sx={{ mt: 2, py: 3 }}>
        <Typography>Price: 100</Typography>
      </Paper>

      {product.variation.props.map((prop) => (
        <Paper
          key={prop.id}
          elevation={3}
          sx={{ mt: 2, py: 3, textAlign: "left" }}
        >
          <Typography sx={{ px: 1 }}>{prop.name}: </Typography>
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleValue}
            aria-label="text alignment"
          >
            {prop.values.map((value) =>
              value.thumb ? (
                <ToggleButton key={value.id} value={value}>
                  <img src={value.thumb} alt="" />
                </ToggleButton>
              ) : (
                <ToggleButton key={value.id} value={value}>
                  <Typography>{value.name}</Typography>
                </ToggleButton>
              )
            )}
          </StyledToggleButtonGroup>
        </Paper>
      ))}
    </Box>
  );
};

export default RightSideSection;
