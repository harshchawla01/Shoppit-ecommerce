// export interface Address {
//   id?: number;
//   name: string;
//   locality: string;
//   address: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   phone: string;
// }

// export interface BankDetails {
//   accountNumber: string;
//   accountHolderName: string;
//   ifscCode: string;
// }

// export interface BusinessDetails  {
//   businessName: string;
//   businessEmail: string;
//   businessPhone: string;
//   businessAddress: string;
//   logo: string;
// }

// export interface Seller {
//   id?: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   mobile: string;
//   email: string;
//   password: string;
//   businessDetails: BusinessDetails;
//   bankDetails: BankDetails;
//   pickupAddress: Address;
//   GSTIN: string;
// }

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

export interface Seller {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  
  // Flattened BusinessDetails
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  logo: string;
  
  // Flattened BankDetails
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  
  pickupAddress: Address;
  GSTIN: string;
}