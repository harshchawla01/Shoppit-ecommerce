import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IconButton,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TablePagination,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchSellerProducts,
  deleteProduct,
} from "../../../redux/seller/sellerProductSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const ProductTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const { sellerProduct } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      dispatch(fetchSellerProducts(token));
    }
  }, [dispatch, token]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/seller/update-product/${productId}`);
  };

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const calculateDiscount = (mrp: number, selling: number) => {
    if (mrp <= 0) return 0;
    const discount = ((mrp - selling) / mrp) * 100;
    return Math.round(discount);
  };

  const displayedProducts = sellerProduct.products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (sellerProduct.loading && sellerProduct.products.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold">
          Your Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/seller/add-product")}
        >
          Add New Product
        </Button>
      </Box>

      {sellerProduct.products.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">
            You don't have any products yet. Start by adding your first product.
          </Typography>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="product table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">MRP (₹)</TableCell>
                  <TableCell align="right">Selling Price (₹)</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedProducts.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "grey.200",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">₹{product.mrpPrice}</TableCell>
                    <TableCell align="right">₹{product.sellingPrice}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${calculateDiscount(
                          product.mrpPrice,
                          product.sellingPrice
                        )}%`}
                        color="success"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {product.quantity > 0 ? (
                        product.quantity
                      ) : (
                        <Chip label="Out of stock" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditProduct(product.id)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(product.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sellerProduct.products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Modal */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductTable;
