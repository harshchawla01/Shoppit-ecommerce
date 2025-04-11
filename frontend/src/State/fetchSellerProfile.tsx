import axios from "axios";
import { Seller } from "../types/sellerTypes";
import { api } from "../Config/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/seller";

export const fetchSellerProfile = createAsyncThunk<Seller, any>( // Seller, any
  "/profile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller>(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        console.error(
          "Fetch sellers error response status:",
          error.response.status
        );
        console.error(
          "Fetch sellers error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);
