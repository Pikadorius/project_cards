import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {authApi, LoginType, RegistrationRequestType} from "./authApi";
import {errorUtils} from "../../common/utils/ErrorHandler";

export type UserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
};

type InitialStateType = {
    isLoggedIn: boolean;
    isRegistred: boolean;
    user: UserType;
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
            const res = await authApi.register(data);
            dispatch(isRegistred(true));
            console.log(res);
        } catch (e: any) {
            errorUtils(e, dispatch);
            dispatch(isRegistred(false));
        }
    }
);

export const loginTC = createAsyncThunk(
    "login",
    async (data: LoginType, {dispatch}) => {
        try {
            const res = await authApi.loggedIn(data)
            dispatch(isLoggedIn(true))
            dispatch(setUser(res.data))
        } catch (e: any) {
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isRegistred: true,
        user: {}
    } as InitialStateType,
    reducers: {
        isLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        isRegistred: (state, action: PayloadAction<boolean>) => {
            state.isRegistred = action.payload;
        },
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
        }
    },
});

const {isLoggedIn, isRegistred, setUser} = authSlice.actions;
export const authReducer = authSlice.reducer;
