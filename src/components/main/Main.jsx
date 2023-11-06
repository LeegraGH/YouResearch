import { Container } from '@mui/material';
import { useRef } from 'react';

import home from "../../resources/icons/home.svg";
import profile from "../../resources/icons/profile.svg";
import dictionary from "../../resources/icons/note.svg";
import collections from "../../resources/icons/collections.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import logout from "../../resources/icons/logout.svg";
import "./main.scss";

const Main = () => {

    // const imgRef

    // const onActivePage = () => {

    // }

    return (
        <div className="main__info">
            <Container maxWidth="xl">
                <aside className="navbar">
                    <ul className="nav__list">
                        <li> <span className="active_page__nav"></span> <img src={home} alt="home" style={{ marginRight: 40 }} /><a href="">Главная</a></li>
                        <li><img src={dictionary} alt="dictionary" /><a href="">Словарь</a></li>
                        <li><img src={heart} alt="favourite" /><a href="">Избранное</a></li>
                        <li><img src={collections} alt="collections" /><a href="">Коллекции</a></li>
                        <li><img src={profile} alt="profile" /><a href="">Профиль</a></li>
                        <li><img src={moon} alt="theme" /><a href="">Цвет темы</a></li>
                        <li><img src={logout} alt="logout" /><a href="">Выйти</a></li>
                    </ul>
                </aside>
                <main>

                </main>
            </Container>
        </div>
    )
}

export default Main;