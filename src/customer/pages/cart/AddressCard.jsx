import React from "react";
import { Card, Button, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        margin: 2,
        maxWidth: 256,
        backgroundColor: "background.paper",
      }}
    >
      <HomeIcon aria-label="Home Address" sx={{ color: "primary.main" }} />

      <Box sx={{ flexGrow: 1, color: "text.secondary" }}>
        <Typography variant="h6" component="h1" sx={{ color: "text.primary", fontWeight: "bold" }}>
          {item?.type || "Home"}
        </Typography>
        <Typography variant="body2">
          {item?.address || "Main St, City, Country"}
        </Typography>
      </Box>

      {/* Select Button */}
      {showButton && (
        <Button
          variant="outlined"
          fullWidth
          onClick={() => handleSelectAddress(item)}
          aria-label={`Select ${item?.type || "Home"} Address`}
        >
          Create Address
        </Button>
      )}
    </Card>
  );
};

export default AddressCard;