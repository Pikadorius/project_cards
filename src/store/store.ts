import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import profileReducer from '../reducers/profileReducer';
import registrationReducer from '../reducers/registrationReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const store = configureStore({
    reducer: {
        loginPage: loginReducer,
        profilePage: profileReducer,
        registrationPage: registrationReducer
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type AppStateType = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


export default store