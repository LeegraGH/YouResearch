
import heart from "../../resources/icons/heart.svg";

import "./flashCard.scss";

const FlashCard = ({ word, translation }) => {
    return (
        <div className="card">
            <img src={heart} alt="favourite" />
            <div className="translate-word">
                <div>{word}</div>
                <div>{translation}</div>
            </div>
        </div>
    )
}

export default FlashCard;