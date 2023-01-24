import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store/store';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import ProfilePage from './components/ProfilePage/ProfilePage';
import {PATH} from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import CommonComponents from './components/common/CommonComponents';
import Error404 from './components/common/Errors/Error404/Error404';


const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404/>,
        children: [
            {
                path: PATH.PROFILE,
                element: <ProfilePage/>
            },
            {
                path: PATH.REGISTRATION,
                element: <RegistrationPage/>
            },
            {
                path: PATH.LOGIN,
                element: <LoginPage/>
            },
            {
                path: PATH.UNIVERSAL_COMPONENTS,
                element: <CommonComponents/>
            }
        ]
    }]);


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
