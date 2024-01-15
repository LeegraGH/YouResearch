import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

import mailIcon from "../../resources/icons/mail.svg";
import "./footer.scss";

const Footer = React.memo(() => {

    let dateYear = new Date().getFullYear();

    return (
        <footer>
            <Container maxWidth="false">
                <div className="footer__nav">
                    <div className="contacts">
                        <h3 className="footer__article">Контакты</h3>
                        <div className="contacts__info">
                            <img src={mailIcon} alt="mail" />
                            <a href="mailto:use.anya@gmail.com">use.anya@gmail.com</a>
                        </div>
                    </div>

                    <div className="menu">
                        <h3 className="footer__article">Меню</h3>
                        <ul className="menu__list">
                            <li><Link to={"/"}>Главная</Link></li>
                            <li><Link to={"/dictionary"}>Словарь</Link></li>
                            <li><Link to={"/favourite"}>Избранное</Link></li>
                            <li><Link to={"/collections"}>Коллекции</Link></li>
                            <li><Link to={"/profile"}>Профиль</Link></li>
                        </ul>
                    </div>

                    <div className="rights">
                        <div>YouResearch © {dateYear}. Все права защищены.</div>
                        <div><a href="">Политика конфиденциальности</a></div>
                    </div>
                </div>
            </Container>
        </footer>
    )
})

export default Footer;