import { Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import CollectionModal from '../collectionModal/CollectionModal';
import SearchForm from '../searchForm/SearchForm';
import SearchFilter from '../searchFilter/SearchFilter';
import { useModal } from '../../hooks/modal.hook';

import collection from "../../resources/icons/collection.svg";
import heart from "../../resources/icons/heart.svg";
import profile from "../../resources/icons/profile.svg";
import search from "../../resources/icons/search.svg";

import "./header.scss";

const Header = ({ onLoadFavourite, onLoadCollection }) => {
    let location = useLocation();

    const [searchTab, setSearchTab] = useState(false);

    const [modal, closeModal, showModal] = useModal();

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
                                        <button className="btn-collection" onClick={showModal}>
                                            Создать коллекцию
                                        </button>
                                        {modal
                                            ? <CollectionModal hideModal={closeModal} />
                                            : null}
                                    </div>
                                </>
                                : <SearchForm />))
                        : null}
                    <ul className='nav__list'>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/dictionary"><img src={search} alt="dictionary" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/favourite"><img src={heart} alt="favourite" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/collections"><img src={collection} alt="collections" /></Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Link className='nav__tab' to="/profile"><img src={profile} alt="profile" /></Link>
                        </motion.li>
                    </ul>
                </div>
            </Container>
        </header>
    )
}

export default Header;