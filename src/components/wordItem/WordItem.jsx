import heart from "../../resources/icons/heart.svg";

import "./wordItem.scss";

const WordItem = ({ word, translation, deleteWord }) => {

    return (
        <div className="card">
            <div className="translate-word">
                <div onClick={deleteWord} className="tab"><img src={heart} alt="favourite" /></div>
                <div className="word">{word}</div>
            </div>
            <div className="translation">{translation}</div>
        </div>
    )
}

export default WordItem;