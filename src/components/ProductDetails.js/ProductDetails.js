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
  Rating,
  Button,
  ButtonGroup,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProduct } from "../../redux/slices/productSlice";
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

  const [skuProps, setSkuProps] = useState([]);
  const [selectedSku, setSelectedSku] = useState([]);
  const [variantImage, setVariantImage] = useState("");
  const [counter, setCounter] = useState(1);

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
    setSkuProps(arr);
  }, [variation]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    const data =
      product &&
      product?.variation?.skus?.find((sku) => {
        const ssku = [...sku.props].sort((a, b) => a - b);
        skuProps.sort((a, b) => a - b);

        return (
          Array.isArray(ssku) &&
          Array.isArray(skuProps) &&
          ssku.length === skuProps.length &&
          ssku.every((val, index) => val === skuProps[index])
        );
      });
    setSelectedSku(data);
  }, [product, skuProps]);

  const addToCartHandler = () => {
    if (skuProps.length !== 2) {
      alert("You Must Select Color And Size!");
    } else {
      dispatch(
        addToCart({
          id: product.id,
          sku: skuProps,
          discountPrice: selectedSku?.price?.discounted * counter,
          oldPrice: selectedSku?.price?.old * counter,
          img: variantImage,
          quantity: counter,
        })
      );
    }
  };

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
              <Paper elevation={3} sx={{ px: 3, py: 1 }}>
                <Typography sx={{ fontSize: "18px", color: "salmon" }}>
                  {product?.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={product?.ratings_average}
                    precision={0.1}
                    readOnly
                  />
                  <PersonSharpIcon sx={{ ml: 2 }} />
                  <Box>{product?.ratings_count}</Box>
                </Box>
                {selectedSku ? (
                  <Typography sx={{ my: 1 }}>
                    Price: Rs. {selectedSku?.price?.discounted * counter}{" "}
                    <del style={{ fontSize: "12px" }}>
                      Rs. {selectedSku?.price?.old * counter}
                    </del>{" "}
                    <span style={{ color: "red" }}>
                      (
                      {Math.round(
                        100 -
                          (100 * selectedSku?.price?.discounted * counter) /
                            (selectedSku?.price?.old * counter)
                      )}
                      % OFF)
                    </span>
                  </Typography>
                ) : (
                  <Typography sx={{ my: 1 }}>
                    Price: No Variation selected!
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                    sx={{ mx: 1 }}
                  >
                    <Button
                      onClick={() =>
                        setCounter(counter - 1 < 0 ? 0 : counter - 1)
                      }
                      sx={{ fontSize: "16px" }}
                    >
                      -
                    </Button>
                    <Button disabled sx={{ fontSize: "16px" }}>
                      {counter}
                    </Button>
                    <Button
                      onClick={() => setCounter(counter + 1)}
                      sx={{ fontSize: "16px" }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                  <Button
                    disabled={counter === 0 && true}
                    color="warning"
                    variant="contained"
                    sx={{ mx: 1 }}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </Box>
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
