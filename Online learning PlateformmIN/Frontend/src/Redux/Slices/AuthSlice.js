import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  data: {},
};

// .....signup.........
export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  const loadingMessage = toast.loading('Please wait! creating your account...');
  try {
    const res = await axiosInstance.post('/user/register', data);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingMessage });
    throw error;
  }
});

// .....Login.........
export const login = createAsyncThunk('/auth/login', async (data) => {
  const loadingMessage = toast.loading(
    'Please wait! logging into your account...'
  );
  try {
    const res = await axiosInstance.post('/user/login', data);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingMessage });
    throw error;
  }
});

// .....Logout.........
export const logout = createAsyncThunk('/auth/logout', async () => {
  const loadingMessage = toast.loading('Logging out...');
  try {
    const res = await axiosInstance.get('/user/logout');
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingMessage });
    throw error;
  }
});

// .....get user data.........
export const getUserData = createAsyncThunk('/auth/user/me', async () => {
  const loadingMessage = toast.loading('Fetching profile...');
  try {
    const res = await axiosInstance.get('/user/me');
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingMessage });
    throw error;
  }
});

// .....update user data.........
export const updateUserData = createAsyncThunk(
  '/auth/user/update',
  async (data) => {
    const loadingMessage = toast.loading('Updating changes...');
    try {
      const res = await axiosInstance.post(
        `/user/update/${data.id}`,
        data.formData
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signup
    builder.addCase(createAccount.fulfilled, (state, action) => {
      localStorage.setItem('role', action?.payload?.user?.role);
      localStorage.setItem('isLoggedIn', true);

      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
      state.isLoggedIn = true;
    });

    // login
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('role', action?.payload?.user?.role);
      localStorage.setItem('isLoggedIn', true);

      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
      state.isLoggedIn = true;
    });

    // logout
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem('role');
      localStorage.removeItem('isLoggedIn');

      state.data = {};
      state.role = '';
      state.isLoggedIn = false;
    });

    // get user data
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
      state.isLoggedIn = true;
    });

    // update user data
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
      state.isLoggedIn = true;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
