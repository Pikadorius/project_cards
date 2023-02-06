import React from "react";
import s from "./HeaderProfile.module.scss";
import {Link} from "react-router-dom";
import ava from "../../../assets/ava.png";

const HeaderProfile = () => {
    return (
        <div className={s.profileContainer}>
            <div className={s.userName}>
                Name
            </div>
            <Link to={'/profile'} className={s.avatarContainer}>
                <img className={s.userAvatar} src={ava} alt="user avatar"/>
            </Link>
        </div>
    );
};

export default HeaderProfile;