import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

import home from "../../resources/icons/home.svg";
import profile from "../../resources/icons/profile.svg";
import dictionary from "../../resources/icons/note.svg";
import collections from "../../resources/icons/collections.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import logout from "../../resources/icons/logout.svg";
import "./main.scss";

const Main = ({ Compoment }) => {

    return (
        <div className="main__info">
            <Container maxWidth="xl">
                <div className="grid__content">
                    <aside className="sidebar">
                        <ul className="nav__list">
                            <NavigationItem to="/" src={home} name="Главная" color="#FDDC63" />
                            <NavigationItem to="/dictionary" src={dictionary} name="Словарь" color="#6BDDC8" />
                            <NavigationItem to="/favourite" src={heart} name="Избранное" color="#F973AB" />
                            <NavigationItem to="/collections" src={collections} name="Коллекции" color="#a68beb" />
                            <NavigationItem to="/profile" src={profile} name="Профиль" color="#7eaceb" />
                            <NavigationItem to="/theme" src={moon} name="Цвет темы" />
                            <NavigationItem to="/logout" src={logout} name="Выйти" />
                        </ul>
                    </aside>
                    <main>
                        <div className="rectangle-yellow"></div>
                        <div className="rectangle-pink"></div>
                        <div className="rectangle-mint"></div>
                        <Compoment />
                    </main>
                </div>
            </Container>
        </div>
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