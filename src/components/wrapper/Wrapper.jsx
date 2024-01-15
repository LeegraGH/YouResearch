import { useState } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import { FavouriteContext, CollectionContext } from "../../contexts/Contexts";

import "./wrapper.scss";


const Wrapper = (props) => {

    const [favourite, setFavourite] = useState("");
    const [collection, setCollection] = useState("");

    const onLoadFavourite = (word) => {
        setFavourite(word);
    }

    const onLoadCollection = (collection) => {
        setCollection(collection);
    }

    return (
        <>
            <div className="wrapper">
                <div className="content">
                    <Header onLoadFavourite={onLoadFavourite} onLoadCollection={onLoadCollection} />
                    <CollectionContext.Provider value={collection}>
                        <FavouriteContext.Provider value={favourite}>
                            {props.children}
                        </FavouriteContext.Provider>
                    </CollectionContext.Provider>
                </div>
                <div className="footer">
                    <Footer />
                </div>
                {/* тут модальные окна для выхода из аккаунта, для отображения содержимого коллекции, для создания коллекции */}
            </div>
        </>
    )
}

export default Wrapper;