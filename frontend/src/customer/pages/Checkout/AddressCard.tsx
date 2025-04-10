import { Radio } from "@mui/material";
import React from "react";

const handleChange = (e: any) => {
  console.log(e.target.value);
};

const AddressCard = () => {
  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio
          checked={true}
          onChange={handleChange}
          value=""
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>Harsh</h1>
        <p className="w-[320px]">Dummy Address</p>
        <p>
          <strong>Mobile: </strong> 9997194325{" "}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
