import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRegister, fetchLogin, fetcAuthMe } from './asyncActions';
import { Status, type AuthState, type UserProps } from './types';

const initialState: AuthState = {
  isAuth: false,
  user: {
    name: '',
    email: '',
    _id: '',
    token: '',
    createdAt: '',
    updatedAt: '',
  },
  status: Status.LOADING,
  loginOpen: false,
  registerOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    },
    setLoginOpen(state, action: PayloadAction<boolean>) {
      state.loginOpen = action.payload;
    },
    setRegisterOpen(state, action: PayloadAction<boolean>) {
      state.registerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<UserProps>) => {
        state.status = Status.SUCCSESS;
        state.user = action.payload;
        state.isAuth = true;
        console.log(state.user);
      }
    );
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });

    // login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<UserProps>) => {
        state.status = Status.SUCCSESS;
        state.user = action.payload;
        state.isAuth = true;
      }
    );
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });

    // get me
    builder.addCase(fetcAuthMe.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });
    builder.addCase(
      fetcAuthMe.fulfilled,
      (state, action: PayloadAction<UserProps>) => {
        state.status = Status.SUCCSESS;
        state.user = action.payload;
        state.isAuth = true;
      }
    );
    builder.addCase(fetcAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {
        name: '',
        email: '',
        _id: '',
        token: '',
        createdAt: '',
        updatedAt: '',
      };
    });
  },
});

export const { setAuth, setLoginOpen, setRegisterOpen } = authSlice.actions;
export default authSlice.reducer;
