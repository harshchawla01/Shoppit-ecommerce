import React, { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";

const SellerRegistrationForm = () => {
  // Define types within the component
  type Address = {
    id?: number;
    name: string;
    locality: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };

  type BankDetails = {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
  };

  type BusinessDetails = {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
    logo: string;
  };

  type Seller = {
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
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [seller, setSeller] = useState<Seller>({
    username: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    GSTIN: "",
    businessDetails: {
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      businessAddress: "",
      logo: "",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      ifscCode: "",
    },
    pickupAddress: {
      name: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: string,
    field?: string
  ) => {
    if (section && field) {
      setSeller({
        ...seller,
        [section]: {
          ...(seller[section as keyof typeof seller] as any),
          [field]: e.target.value,
        },
      });
    } else {
      setSeller({
        ...seller,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting seller registration:", seller);
    // Here you would send the data to your API
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-8">
        Seller Registration
      </h1>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {step}
              </div>
              <div className="mt-2 text-xs">
                {step === 1 && "Personal Details"}
                {step === 2 && "Business Details"}
                {step === 3 && "Bank Details"}
                {step === 4 && "Pickup Address"}
              </div>
              {step < 4 && (
                <div
                  className={`absolute top-5 left-10 w-full h-0.5 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={seller.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={seller.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={seller.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={seller.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={seller.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={seller.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GSTIN</label>
                <input
                  type="text"
                  name="GSTIN"
                  value={seller.GSTIN}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Business Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={seller.businessDetails.businessName}
                  onChange={(e) =>
                    handleInputChange(e, "businessDetails", "businessName")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={seller.businessDetails.businessEmail}
                  onChange={(e) =>
                    handleInputChange(e, "businessDetails", "businessEmail")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Phone
                </label>
                <input
                  type="text"
                  value={seller.businessDetails.businessPhone}
                  onChange={(e) =>
                    handleInputChange(e, "businessDetails", "businessPhone")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Address
                </label>
                <input
                  type="text"
                  value={seller.businessDetails.businessAddress}
                  onChange={(e) =>
                    handleInputChange(e, "businessDetails", "businessAddress")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Business Logo
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-md"
                  >
                    <Upload size={16} />
                    Upload Logo
                  </button>
                  {seller.businessDetails.logo && (
                    <span className="text-sm text-gray-500">File uploaded</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Bank Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={seller.bankDetails.accountNumber}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "accountNumber")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={seller.bankDetails.accountHolderName}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "accountHolderName")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={seller.bankDetails.ifscCode}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "ifscCode")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Pickup Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={seller.pickupAddress.name}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "name")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={seller.pickupAddress.phone}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "phone")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  value={seller.pickupAddress.locality}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "locality")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={seller.pickupAddress.postalCode}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "postalCode")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  value={seller.pickupAddress.address}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "address")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={seller.pickupAddress.city}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "city")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  value={seller.pickupAddress.state}
                  onChange={(e) =>
                    handleInputChange(e, "pickupAddress", "state")
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md"
              >
                Previous
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md"
              >
                Submit Registration
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerRegistrationForm;
