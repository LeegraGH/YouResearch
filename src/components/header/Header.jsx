import { Container } from '@mui/material';


import collection from "../../resources/icons/collection.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import search from "../../resources/icons/search.svg";
import profile from "../../resources/icons/profile.svg";
import "./header.scss";

const Header = () => {
    return (
        <header>
            <Container maxWidth="xl">
                <div className="header__nav">
                    <div className="title">Word Anixx</div>
                    <form className='header__search' action="">
                        <input type="text" placeholder='Какое слово исследуем сегодня?' />
                        <button type="submit">Исследовать</button>
                    </form>
                    <ul className='nav__list'>
                        <li><a href=""><img src={search} alt="search word" /></a></li>
                        <li><a href=""><img src={heart} alt="favorite" /></a></li>
                        <li><a href=""><img src={collection} alt="collection" /></a></li>
                        <li><a href=""><img src={moon} alt="theme" /></a></li>
                        <li><a href=""><img src={profile} alt="profile" /></a></li>
                    </ul>
                </div>
            </Container>
        </header>
    )
}

export default Header;