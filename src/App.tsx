import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/store';

function App() {
    const reg = useAppSelector(state => state.registrationPage)
    const log = useAppSelector(state => state.loginPage)
    const profile = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()


    return (
        <div className="App">

        </div>
    );
}

export default App;
