import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  authloading: true,
  isAuth: false,
  isRegAuth: false,
};

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  const response = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (response.status === 500) {
    const errorData = await response.json();

    return thunkAPI.rejectWithValue(errorData);
  }
  if (response.status === 200) {
    return await response.json();
  }
});

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  console.log(response.status);
  if (response.status === 500) {
    const errorData = await response.json();
    return thunkAPI.rejectWithValue(errorData);
  }
  if (response.status === 200) {
    const data = await response.json();
    return thunkAPI.fulfillWithValue(data);
  }
});

export const refresh = createAsyncThunk("refresh", async (thunkAPI) => {
  const response = await fetch("http://localhost:5000/user/detail", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.status === 500 || response.status === 401) {
    const errorData = await response.json();
    return thunkAPI.rejectWithValue(errorData);
  }

  if (response.status === 200) {
    const data = await response.json();

    return data;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.authloading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.isRegAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isRegAuth = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.isRegAuth = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.data;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    });
    builder.addCase(refresh.pending, (state, action) => {
      state.authloading = true;
      state.isAuth = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isAuth = true;
      state.error = null;
      state.authloading = false;
      state.user = action.payload;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.isAuth = false;
      state.authloading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = userSlice.actions;
export default userSlice.reducer;
