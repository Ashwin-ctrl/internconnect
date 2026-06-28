import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('accessToken');

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try { await api.post('/auth/logout'); } catch (_) {}
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser: (state, action) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.accessToken;
        localStorage.setItem('accessToken', a.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.accessToken;
        localStorage.setItem('accessToken', a.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(logout.fulfilled, (s) => { s.user = null; s.token = null; })

      .addCase(fetchMe.pending, (s) => {  })
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.user = a.payload.user;
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(fetchMe.rejected, (s) => {
        
        s.user = null;
        s.token = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
