import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "constants/AuthConstant";
import FirebaseService from "services/FirebaseService";
import AuthService from "services/AuthService";

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN) || null,
  allUsers: [],
  user: {}
};

export const fetchUsers = createAsyncThunk("/users", async (rejectWithValue) => {
	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/users").then(
			(data) => data.json()
		  );
		  console.log(res, "res");
		  return res;
	}
	catch(err) {
		return rejectWithValue(err || "Error");
	}
 
});


export const fetchUser = createAsyncThunk("/user", async (data,rejectWithValue) => {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/users/${data}`).then(
			(data) => data.json()
		  );
		  console.log(res, "res");
		  return res;
	}
	catch(err) {
		return rejectWithValue(err || "Error");
	}
 
});

export const signUp = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.register({ email, password });
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const signOut = createAsyncThunk("auth/logout", async () => {
  const response = await FirebaseService.signOutRequest();
  localStorage.removeItem(AUTH_TOKEN);
  return response.data;
});

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const signInWithFacebook = createAsyncThunk(
  "auth/signInWithFacebook",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.loading = false;
      state.redirect = "/";
      state.token = action.payload;
    },
    showAuthMessage: (state, action) => {
      state.message = action.payload;
      state.showMessage = true;
      state.loading = false;
    },
    hideAuthMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.redirect = "/";
    },
    showLoading: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
  },
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

export const {
  authenticated,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
  signInSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
