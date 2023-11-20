import { useState } from "react";

import "./favouriteFilter.scss";

const FavouriteFilter = (props) => {

    const [favourite, setFavourite] = useState("");

    const onLoadFavourite = (e) => {
        const word = e.target.value;
        setFavourite(word);
        props.onLoadFavourite(word);
    }

    return (
        <div className="search-favourite">
            <input onChange={onLoadFavourite} value={favourite} type="text" placeholder="Поиск по избранным словам" />
        </div>
    )
}

export default FavouriteFilter;