import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderItem({ order }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "500px", marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h6">Order ID: {order.id}</Typography>
        <Typography>
          Date: {new Date(order.orderDate).toLocaleDateString()}
        </Typography>
        <Typography>Status: {order.orderStatus || "Pending"}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {order.orderDetails && order.orderDetails.length > 0 ? (
          order.orderDetails.map((item) => (
            <OrderDetails key={item.id} item={item} />
          ))
        ) : (
          <Typography>No order details available</Typography>
        )}
      </Collapse>
    </Card>
  );
}
