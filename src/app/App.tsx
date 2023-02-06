import React, {useEffect} from "react";
import "./App.css";
import {Header} from "./Header/Header";
import Pages from "./Pages/Pages";
import {authMeTC} from "../featuries/auth/authSlice";
import {useAppDispatch} from "../common/hooks/AppDispatch";
import {useAppSelector} from "../common/hooks/AppSelector";
import SimpleSnackbar from '../common/components/SnackBar/Snackbar';

function App() {
    // EGOR serg
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authMeTC());
    }, []);
    return (
        <div className="app">
            <Header/>
            <Pages/>
            <SimpleSnackbar/>
        </div>
    );
}

export default App;
