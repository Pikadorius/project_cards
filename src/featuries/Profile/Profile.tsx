import React from 'react';
import s from '../../app/Header/HeaderSignIn/HeaderSignIn.module.scss';
import {PATH} from '../../common/constans/path';
import {useAppDispatch} from '../../common/hooks/AppDispatch';
import {logoutTC} from '../auth/authSlice';

const Profile = () => {

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div>
            <h1 style={{paddingBottom: '20px'}}>Profile</h1>
            <button className={s.btn} onClick={logout}>
                Log out
            </button>
        </div>
    );
};

export default Profile;