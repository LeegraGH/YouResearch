import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAll, fetchFavourites } from "../../redux/slices/favouritesSlice";

import FlashCard from "../flashCard/FlashCard";

import "./favouriteList.scss";

const FavoriteList = () => {

    const favourites = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavourites());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadFavourites = () => {
        const data = favourites.map(({ id, word, translation }) => {
            return <FlashCard key={id} word={word} translation={translation} />
        })

        return data;
    }

    const content = onLoadFavourites();

    return (
        <div className="favourite__block">
            <h2 className="title">Избранное</h2>
            <div className="favourite__section">
                {content}
            </div>
        </div>
    )
}

export default FavoriteList;