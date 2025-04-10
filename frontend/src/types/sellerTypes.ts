// // src/types/seller.ts

// export interface PickupAddress {
//     name: string;
//     mobile: string;
//     pincode: string;
//     address: string;
//     locality: string;
//     city: string;
//     state: string;
// }

// export interface BankDetails {
//     accountNumber: string;
//     ifscCode: string;
//     accountHolderName: string;
// }

// export interface BusinessDetails {
//     businessName: string;
// }

// export interface Seller {
//     id?:number;
//     mobile: string;
//     otp: string;
//     gstin: string;
//     pickupAddress: PickupAddress;
//     bankDetails: BankDetails;
//     sellerName: string;
//     email: string;
//     businessDetails: BusinessDetails;
//     password: string;
//     accountStatus?:string;
// }


    // Define types within the component
export interface Address {
  id?: number;
  name: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface BankDetails {
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
}

export interface BusinessDetails  {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  logo: string;
}

export interface Seller {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  businessDetails: BusinessDetails;
  bankDetails: BankDetails;
  pickupAddress: Address;
  GSTIN: string;
}