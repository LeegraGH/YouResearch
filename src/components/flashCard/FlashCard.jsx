// import { useDeleteFavouriteWordMutation } from "../../redux/slices/apiSlice";

import heart from "../../resources/icons/heart.svg";

import "./flashCard.scss";

const FlashCard = ({ id, word, translation, deleteFavourite }) => {

    return (
        <div className="card">
            <div className="translate-word">
                <div onClick={deleteFavourite} className="tab"><img src={heart} alt="favourite" /></div>
                <div>{word}</div>
            </div>
            <div>{translation}</div>
        </div>
    )
}

export default FlashCard;