
import heart from "../../resources/icons/heart.svg";

import "./favouriteItem.scss";

const FavouriteItem = ({ id, word, translation, deleteFavourite }) => {

    return (
        <div className="card">
            <div className="translate-word">
                <div onClick={deleteFavourite} className="tab"><img src={heart} alt="favourite" /></div>
                <div className="word">{word}</div>
            </div>
            <div className="translation">{translation}</div>
        </div>
    )
}

export default FavouriteItem;