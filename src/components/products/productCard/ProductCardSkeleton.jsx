import { Card, Skeleton } from "@mui/material";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: 240,
        height: 450,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton sx={{ height: 300, width: "100%" }} />
      <Skeleton sx={{ height: 50, width: "100%" }} />
      <Skeleton sx={{ height: 30, width: "100%" }} />
      <Skeleton sx={{ height: 30, width: "100%" }} />
      <Skeleton sx={{ height: 30, width: "100%" }} />
    </Card>
  );
};

export default ProductCardSkeleton;
