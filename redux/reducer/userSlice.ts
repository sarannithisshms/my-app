import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, 
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchUsers.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
