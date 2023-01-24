import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'


export const PATH = {
    REGISTRATION: `registration`,
    LOGIN: `login`,
    PROFILE: `profile`,
    UNIVERSAL_COMPONENTS: `universal-components`
}

const Header = () => {
    return (
        <header>
            <nav className={s.navigation}>
                <NavLink
                    to={PATH.PROFILE}
                    className={({isActive}) => isActive ? s.active : ''}>
                    Profile
                </NavLink>

                <NavLink
                    to={PATH.REGISTRATION}
                    className={({isActive}) => isActive ? s.active : ''}>
                    Registration
                </NavLink>

                <NavLink
                    to={PATH.LOGIN}
                    className={({isActive}) => isActive ? s.active : ''}>
                    Login
                </NavLink>

                <NavLink
                    to={PATH.UNIVERSAL_COMPONENTS}
                    className={({isActive}) => isActive ? s.active : ''}>
                    Components
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;