import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/store';
import Header from './components/Header/Header';
import {Outlet} from 'react-router-dom';

function App() {
    const reg = useAppSelector(state => state.registrationPage)
    const log = useAppSelector(state => state.loginPage)
    const profile = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()

// туц туц ===============================
    // test 2

    return (
        <div className="App">
            <Header/>
            <Outlet/>
        </div>
    );
}

export default App;
