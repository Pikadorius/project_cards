import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/store';
import Header, {PATH} from './components/Header/Header';
import {Navigate, Route, Routes} from 'react-router-dom';
import CommonComponents from './components/common/CommonComponents';
import Error404 from './components/common/Errors/Error404/Error404';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
    const reg = useAppSelector(state => state.registrationPage)
    const log = useAppSelector(state => state.loginPage)
    const profile = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()

// раз раз
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                <Route path={PATH.REGISTRATION} element={<RegistrationPage/>}/>
                <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
                <Route path={PATH.UNIVERSAL_COMPONENTS} element={<CommonComponents/>}/>
                <Route path={"*"} element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export default App;
