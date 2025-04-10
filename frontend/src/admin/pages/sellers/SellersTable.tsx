import React, { MouseEvent, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  styled,
  TableFooter,
  TablePagination,
} from "@mui/material";
// import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchSellers,
  selectSellers,
  // updateSellerAccountStatus,
} from "../../../Redux/Seller/sellerSlice";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is created but not yet verified",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended, possibly due to violations",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "Account is deactivated, user may have chosen to deactivate it",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned due to severe violations",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed, possibly at user request",
  },
];

const sellers = {
  sellers: [
    {
      id: 1,
      sellerName: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      gstin: "22AAAAA0000A1Z5",
      businessDetails: {
        businessName: "John's Mart",
      },
      accountStatus: "ACTIVE",
    },
    {
      id: 2,
      sellerName: "Jane Smith",
      email: "jane@example.com",
      mobile: "0987654321",
      gstin: "33BBBBB1111B2Z6",
      businessDetails: {
        businessName: "Jane's Boutique",
      },
      accountStatus: "PENDING_VERIFICATION",
    },
    {
      id: 3,
      sellerName: "Raj Kumar",
      email: "raj@example.com",
      mobile: "9876543210",
      gstin: "44CCCCC2222C3Z7",
      businessDetails: {
        businessName: "Raj Electronics",
      },
      accountStatus: "SUSPENDED",
    },
  ],
};

export default function SellersTable() {
  const [page, setPage] = useState(0);
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  //   const { sellers } = useAppSelector((store) => store);

  //   const dispatch = useAppDispatch();

  //   React.useEffect(() => {
  //     dispatch(fetchSellers(accountStatus));
  //   }, [accountStatus]);

  const handleAccountStatusChange = (event: any) => {
    setAccountStatus(event.target.value as string);
  };

  //   const handleUpdateSellerAccountStatus = (id: number, status: string) => {
  //     dispatch(updateSellerAccountStatus({ id, status }));
  //   };

  const [anchorEl, setAnchorEl] = useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const handleClick = (event: MouseEvent<HTMLButtonElement>, sellerId: any) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
  };
  const handleClose = (sellerId: number) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl color="primary" fullWidth>
          <Select
            //   labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            onChange={handleAccountStatusChange}
            color="primary"
            className="text-primary-color"
          >
            {accountStatuses.map((status) => (
              <MenuItem value={status.status}>{status.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>GSTIN</StyledTableCell>
              <StyledTableCell>Bussiness Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.sellers?.map((seller) => (
              <StyledTableRow key={seller.sellerName}>
                <StyledTableCell component="th" scope="row">
                  {seller.sellerName}
                </StyledTableCell>
                <StyledTableCell>{seller.email}</StyledTableCell>
                <StyledTableCell>{seller.mobile}</StyledTableCell>
                <StyledTableCell>{seller.gstin}</StyledTableCell>
                <StyledTableCell>
                  {seller.businessDetails?.businessName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {seller.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    id={"basic-button" + seller.id}
                    onClick={(e) => handleClick(e, seller.id)}
                  >
                    Change Status
                  </Button>
                  <Menu
                    id={"basic-menus" + seller.id}
                    anchorEl={anchorEl[seller.id || 1]}
                    open={Boolean(anchorEl[seller.id || 1])}
                    onClose={() => handleClose(seller.id || 1)}
                  >
                    {accountStatuses.map((status) => (
                      <MenuItem
                        // onClick={() =>
                        //   handleUpdateSellerAccountStatus(
                        //     seller.id || 1,
                        //     status.status
                        //   )
                        // }
                        value={status.status}
                      >
                        {status.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
