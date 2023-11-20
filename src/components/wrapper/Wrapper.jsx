import { useState } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import { FavouriteContext } from "../../contexts/Contexts";

import "./wrapper.scss";


const Wrapper = (props) => {

    const [favourite, setFavourite] = useState("");

    const onLoadFavourite = (word) => {
        setFavourite(word);
    }

    return (
        <>
            <div className="wrapper">
                <div className="content">
                    <Header onLoadFavourite={onLoadFavourite} />
                    <FavouriteContext.Provider value={favourite}>
                        {props.children}
                    </FavouriteContext.Provider>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Wrapper;