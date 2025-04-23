import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem as CartItemType } from "../../../types/cartTypes";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}


const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const theme = useTheme();
  console.log("Prices and discounts", item.sellingPrice, item.mrpPrice);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 2 }}>
          <Box
            component="img"
            src={item.product.images[0]}
            alt={item.product.title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        </Grid>

        <Grid size={{ xs: 9, sm: 5 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {item.product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Size: {item.size}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Color: {item.product.color}
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" }, mt: 1 }}>
            <Typography variant="h6" color="primary.main">
              ₹{item.sellingPrice}
            </Typography>

            {item.mrpPrice >= item.sellingPrice && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{item.mrpPrice}
                </Typography>

                <Typography variant="body2" color="success.main">
                  {Math.round(
                    ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
                  )}
                  % off
                </Typography>
              </Stack>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 7, sm: 3 }}>
          <Stack // flex-col
            direction="row"
            alignItems="center"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              width: "fit-content",
            }}
          >
            <IconButton
              size="small"
              onClick={() =>
                onUpdateQuantity(item.quantity - 1)
              }
              disabled={item.quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body1"
              sx={{ px: 2, py: 0.5, minWidth: "2rem", textAlign: "center" }}
            >
              {item.quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={onRemove}
            sx={{ mt: 1, textTransform: "none" }}
          >
            Remove
          </Button>
        </Grid>

        <Grid
          size={{ xs: 5, sm: 2 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Typography variant="h6" color="primary.main">
            ₹{item.sellingPrice * item.quantity}
          </Typography>

          {item.mrpPrice > item.sellingPrice && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{item.mrpPrice * item.quantity}
              </Typography>

              <Typography variant="body2" color="success.main">
                {Math.round(
                  ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
                )}
                % off
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
