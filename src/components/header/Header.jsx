import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

import SearchForm from '../searchForm/SearchForm';

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
                    <div className="title"><Link to="/">Word Anixx</Link></div>
                    {/* <Search /> */}
                    <ul className='nav__list'>
                        <li><Link to="/dictionary"><img src={search} alt="search word" /></Link></li>
                        <li><Link to="/"><img src={heart} alt="favourite" /></Link></li>
                        <li><Link to="/"><img src={collection} alt="collection" /></Link></li>
                        <li><Link to="/"><img src={moon} alt="theme" /></Link></li>
                        <li><Link to="/"><img src={profile} alt="profile" /></Link></li>
                    </ul>
                </div>
            </Container>
        </header>
    )
}

export default Header;