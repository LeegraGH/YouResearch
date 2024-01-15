import { Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import CollectionModal from '../collectionModal/CollectionModal';
import SearchForm from '../searchForm/SearchForm';
import SearchFilter from '../searchFilter/SearchFilter';

import collection from "../../resources/icons/collection.svg";
import heart from "../../resources/icons/heart.svg";
import moon from "../../resources/icons/moon.svg";
import profile from "../../resources/icons/profile.svg";

import "./header.scss";

const Header = ({ onLoadFavourite, onLoadCollection }) => {
    let location = useLocation();

    const [searchTab, setSearchTab] = useState(false);
    const [collectionModal, setCollectionModal] = useState(false);

    const toggleCollectionModal = () => {
        setCollectionModal(collectionModal => !collectionModal);
    }

    const hideCollectionModal = () => {
        setCollectionModal(false);
    }

    useEffect(() => {
        if (location.pathname !== "/") setSearchTab(true);
        else setSearchTab(false);
    }, [location])

    return (
        <header>
            <Container maxWidth="false">
                <div className="header__nav">
                    <div className="title"><Link to="/">YouResearch</Link></div>
                    {searchTab
                        ? (location.pathname === "/favourite"
                            ? <SearchFilter onLoadFilter={onLoadFavourite} placeholderName="Поиск по избранным словам" />
                            : (location.pathname === "/collections"
                                ? <>
                                    <SearchFilter onLoadFilter={onLoadCollection} placeholderName="Поиск по коллекциям" />
                                    <div className="create_collection">
                                        <button className="btn-collection" onClick={toggleCollectionModal}>
                                            Создать коллекцию
                                        </button>
                                        {collectionModal
                                            ? <CollectionModal hideModal={hideCollectionModal} />
                                            : null}
                                    </div>
                                </>
                                : <SearchForm />))
                        : null}
                    <ul className='nav__list'>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/favourite"><img src={heart} alt="favourite" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/"><img src={collection} alt="collection" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/"><img src={moon} alt="theme" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/"><img src={profile} alt="profile" /></Link>
                        </motion.li>
                    </ul>
                </div>
            </Container>
        </header>
    )
}

export default Header;