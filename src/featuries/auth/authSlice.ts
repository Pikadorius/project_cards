import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {authApi, RegistrationRequestType} from "./authApi";
import {errorUtils} from '../../common/utils/ErrorHandler';

type InitialStateType = {
    isLoggedIn: boolean;
    isRegistred: boolean
};

export const authMeTC = createAsyncThunk(
    "isLoggedIn",
    async (_, {dispatch}) => {
        const res = await authApi.authMe();
        try {
            dispatch(isLoggedIn(true));
        } catch (e: any) {
        }
    }
);

export const registerTC = createAsyncThunk(
    "isRegistred",
    async (data: RegistrationRequestType, {dispatch}) => {
        try {
            const res = await authApi.register(data)
            dispatch(isRegistred(true))
            console.log(res)
        } catch (e: any) {
            errorUtils(e, dispatch)
            dispatch(isRegistred(false))
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isRegistred: true
    } as InitialStateType,
    reducers: {
        isLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        isRegistred: (state, action: PayloadAction<boolean>) => {
            state.isRegistred = action.payload;
        }
    },
});

const {isLoggedIn, isRegistred} = authSlice.actions;
export const authReducer = authSlice.reducer;
