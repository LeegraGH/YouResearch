import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import LogoutModal from '../logoutModal/LogoutModal';

import home from "../../resources/icons/home.svg";
import profile from "../../resources/icons/profile.svg";
import dictionary from "../../resources/icons/note.svg";
import collections from "../../resources/icons/collections.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import logout from "../../resources/icons/logout.svg";

import "./main.scss";

const Main = ({ Component }) => {

    let location = useLocation();
    let locationPath = location.pathname;

    const [showedLogout, setShowedLogout] = useState(false);

    const toggledLogoutModal = () => {
        setShowedLogout(showedLogout => !showedLogout);
    }

    const hideLogoutModal = () => {
        setShowedLogout(false);
    }

    return (
        <div className="main__info">
            <Container maxWidth="false" className={locationPath !== "/collections" ? null : "no_padding-right"}>
                <div className="grid__content">
                    <aside className="sidebar">
                        <ul className="nav__list">
                            <NavigationItem to="/" src={home} name="Главная" color="#FDDC63" />
                            <NavigationItem to="/dictionary" src={dictionary} name="Словарь" color="#6BDDC8" />
                            <NavigationItem to="/favourite" src={heart} name="Избранное" color="#F973AB" />
                            <NavigationItem to="/collections" src={collections} name="Коллекции" color="#FDDC63" />
                            <NavigationItem to="/profile" src={profile} name="Профиль" color="#6BDDC8" />
                            <li className="nav__link">
                                <span className="wrap__img"><img src={moon} alt="Цвет темы" /></span>
                                Цвет темы
                            </li>
                            <li className="nav__link" onClick={toggledLogoutModal}>
                                <span className="wrap__img"><img src={logout} alt="Выйти" /></span>
                                Выйти
                            </li>
                        </ul>
                    </aside>
                    <main className={locationPath !== "/collections" ? null : "active-overflow"}>
                        {locationPath !== "/collections" ?
                            <>
                                <div className="rectangle-yellow"></div>
                                <div className="rectangle-pink"></div>
                                <div className="rectangle-mint"></div>
                            </>
                            : null
                        }
                        <Component />
                        {showedLogout ? createPortal(<LogoutModal hideLogoutModal={hideLogoutModal} />, document.body) : null}
                    </main>
                </div>
            </Container >
        </div >
    )
}

const NavigationItem = ({ to, src, name, color }) => {
    return (
        <li>
            <NavLink to={to} className="nav__link">
                {({ isActive }) => (
                    <>
                        {isActive ? <span className="active_page__nav" style={{ backgroundColor: color }}></span> : null}
                        <span className="wrap__img" style={isActive ? { marginRight: 20 } : null}><img src={src} alt={name} /></span>
                        {name}
                    </>
                )}
            </NavLink>
        </li>
    )
}

export default Main;