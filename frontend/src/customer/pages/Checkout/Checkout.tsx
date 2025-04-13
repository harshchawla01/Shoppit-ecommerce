import React, { useState } from "react";
import OrderSummary from "../Cart/OrderSummary";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import AddIcon from "@mui/icons-material/Add";
import { createOrder } from "../../../Redux/Customer/OrderSlice";
import { Address } from "../../../types/userTypes";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// import userEvent from '@testing-library/user-event'

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Checkout = () => {
  //   const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: any) => {
    console.log("-----", event.target.value);
    setValue(event.target.value);
  };

  //   const handleCreateOrder = () => {
  //     if (user.user?.addresses)
  //       dispatch(
  //         createOrder({
  //           paymentGateway,
  //           address: user.user?.addresses[value],
  //           jwt: localStorage.getItem("jwt") || "",
  //         })
  //       );
  //   };

  //   const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setPaymentGateway((event.target as HTMLInputElement).value);
  //   };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen ">
      <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9 ">
        <div className="col-span-2 space-y-5">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Select Dilivery Address</span>
            <Button onClick={handleOpen} variant="outlined">
              Add New Address
            </Button>
          </div>
          <div className="text-xs font-medium space-y-5">
            <p>Saved Addreses</p>
            <div className="space-y-3">
              {[1, 1, 1].map((item, index) => (
                <AddressCard
                  key={item}
                  //   item={item}
                  //   selectedValue={value}
                  //   value={index}
                  //   handleChange={handleChange}
                />
              ))}
            </div>
          </div>
          <div className="py-4 px-5 rounded-md border">
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              Add New Address
            </Button>
          </div>
        </div>

        <div className="col-span-1 text-sm space-y-3 ">
          <section className="border rounded-md">
            {/* <OrderSummary /> */}
            <div className="p-5">
              <Button
                // onClick={handleCreateOrder}
                sx={{ py: "11px" }}
                variant="contained"
                fullWidth
              >
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm
            // paymentGateway={paymentGateway}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Checkout;
