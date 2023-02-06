import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {authApi, RegistrationRequestType} from "./authApi";

type InitialStateType = {
    isLoggedIn: boolean;
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
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    } as InitialStateType,
    reducers: {
        isLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    },
});

const {isLoggedIn} = authSlice.actions;
export const authReducer = authSlice.reducer;
