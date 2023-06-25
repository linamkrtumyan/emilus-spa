import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  allUsers: [],
  user: {},
};

export const fetchUsers = createAsyncThunk(
  "/users",
  async (rejectWithValue) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((data) => data.json());
      return res;
    } catch (err) {
      return rejectWithValue(err || "Error");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "/user",
  async (data, rejectWithValue) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${data}`
      ).then((data) => data.json());
      return res;
    } catch (err) {
      return rejectWithValue(err || "Error");
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
