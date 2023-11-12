import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  pageLoading: true,
  isAuth: false,
  isRegAuth: false,
};

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  const response = await fetch("https://api.anadolutab.com/auth/register", {
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
  const response = await fetch("https://api.anadolutab.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (response.status === 500) {
    const errorData = await response.json();
    return thunkAPI.rejectWithValue(errorData);
  }
  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    return thunkAPI.fulfillWithValue(data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      state.user = null;
      state.isAuth = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      const data = JSON.parse(action.payload);
      state.user = data;
      state.isAuth = true;
    },
    setLoading: (state, action) => {
      state.pageLoading = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const { setLogout, setToken, setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
