// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { IconButton, styled } from "@mui/material";
// // import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
// import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// import {
//   fetchSellerProducts,
//   updateProduct,
//   updateProductStock,
// } from "../../../Redux/Seller/sellerProductSlice";
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";

// // function createData(
// //   name: string,
// //   calories: number,
// //   fat: number,
// //   carbs: number,
// //   protein: number
// // ) {
// //   return { name, calories, fat, carbs, protein };
// // }

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function ProductTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const { sellerProduct } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
//   }, []);

//   const handleUpdateStack = (id: number | undefined) => () => {
//     dispatch(updateProductStock(id));
//   };

//   return (
//     <>
//       <h1 className="pb-5 font-bold text-xl">Products</h1>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Images</StyledTableCell>
//               <StyledTableCell align="right">Title</StyledTableCell>
//               <StyledTableCell align="right">MRP</StyledTableCell>
//               <StyledTableCell align="right">Selling Price</StyledTableCell>
//               <StyledTableCell align="right">Color</StyledTableCell>
//               <StyledTableCell align="right">Update Stock</StyledTableCell>
//               <StyledTableCell align="right">Update</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sellerProduct.products.map((item) => (
//               <StyledTableRow key={item.id}>
//                 <StyledTableCell component="th" scope="row">
//                   <div className="flex gap-1 flex-wrap">
//                     {item.images.map((image) => (
//                       <img className="w-20 rounded-md" src={image} alt="" />
//                     ))}
//                   </div>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.title}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   {" "}
//                   ₹{item.mrpPrice}.0
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   {" "}
//                   ₹{item.sellingPrice}.0
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.color}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton
//                     onClick={() =>
//                       navigate("/seller/update-product/" + item.id)
//                     }
//                     color="primary"
//                     className="bg-primary-color"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IconButton,
  styled,
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
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  fetchSellerProducts,
  deleteProduct,
} from "../../../Redux/Seller/sellerProductSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

  const handleChangePage = (event: unknown, newPage: number) => {
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

  // Calculate discounted percentage for display
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
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">MRP (₹)</StyledTableCell>
                  <StyledTableCell align="right">
                    Selling Price (₹)
                  </StyledTableCell>
                  <StyledTableCell align="right">Discount</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedProducts.map((product: any) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell>
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
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {product.title}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ₹{product.mrpPrice}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ₹{product.sellingPrice}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Chip
                        label={`${calculateDiscount(
                          product.mrpPrice,
                          product.sellingPrice
                        )}%`}
                        color="success"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {product.quantity > 0 ? (
                        product.quantity
                      ) : (
                        <Chip label="Out of stock" color="error" size="small" />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
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
                    </StyledTableCell>
                  </StyledTableRow>
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

      {/* Delete Confirmation Dialog */}
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
