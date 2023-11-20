import { Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import SearchForm from '../searchForm/SearchForm';
import FavouriteFilter from '../favouriteFilter/FavouriteFilter';

import collection from "../../resources/icons/collection.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import search from "../../resources/icons/search.svg";
import profile from "../../resources/icons/profile.svg";

import "./header.scss";

const Header = ({ onLoadFavourite }) => {
    let location = useLocation();

    const [searchTab, setSearchTab] = useState(false);

    useEffect(() => {
        if (location.pathname !== "/") setSearchTab(true);
        else setSearchTab(false);
    }, [location])

    const onLoadSearchBlock = () => {
        setSearchTab(searchTab => !searchTab);
    }

    return (
        <header>
            <Container maxWidth="xl">
                <div className="header__nav">
                    <div className="title"><Link to="/">Word Anixx</Link></div>
                    {searchTab ? (location.pathname === "/favourite" ? <FavouriteFilter onLoadFavourite={onLoadFavourite} /> : <SearchForm />) : null}
                    <ul className='nav__list'>
                        {(location.pathname !== "/" && location.pathname !== "/favourite") ? <li><div onClick={onLoadSearchBlock} className='nav__tab'><img src={search} alt="search word" /></div></li> : null}
                        <li><Link className='nav__tab' to="/favourite"><img src={heart} alt="favourite" /></Link></li>
                        <li><Link className='nav__tab' to="/"><img src={collection} alt="collection" /></Link></li>
                        <li><Link className='nav__tab' to="/"><img src={moon} alt="theme" /></Link></li>
                        <li><Link className='nav__tab' to="/"><img src={profile} alt="profile" /></Link></li>
                    </ul>

                </div>
            </Container>
        </header>
    )
}

export default Header;