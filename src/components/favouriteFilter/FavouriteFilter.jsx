import { useEffect, useState } from "react";

import "./favouriteFilter.scss";

const FavouriteFilter = (props) => {

    const [favourite, setFavourite] = useState("");

    useEffect(() => {
        props.onLoadFavourite("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadFavourite = (e) => {
        const word = (e.target.value).toLowerCase();
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