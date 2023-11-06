import { Container } from '@mui/material';

import mailIcon from "../../resources/icons/mail.svg";
import "./footer.scss";

const Footer = () => {
    return (
        <footer>
            <Container maxWidth="xl">
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
                            <li><a href="">Главная</a></li>
                            <li><a href="">Словарь</a></li>
                            <li><a href="">Избранное</a></li>
                            <li><a href="">Коллекции</a></li>
                            <li><a href="">Профиль</a></li>
                        </ul>
                    </div>

                    <div className="rights">
                        <div>Anixx © 2023. All Rights Reserved.</div>
                        <div><a href="">Политика конфиденциальности</a></div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;