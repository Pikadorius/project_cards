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

// Я троху затупил )
    return (
        <div className="App">
            <Header/>
            <Outlet/>
            {/*<Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                <Route path={PATH.REGISTRATION} element={<RegistrationPage/>}/>
                <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
                <Route path={PATH.UNIVERSAL_COMPONENTS} element={<CommonComponents/>}/>
                <Route path={"*"} element={<Error404/>}/>
            </Routes>*/}
        </div>
    );
}

export default App;
