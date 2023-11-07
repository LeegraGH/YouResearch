
import "./wordTranslate.scss";

const WordTranslate = () => {
    return (
        <div className="translate__block">
            <div className="dictionary-word">
                <h2>Словарь</h2>
                <div className="translate-word">
                    madam
                    <span>[madam], сущ</span>
                </div>
                <ul className="translate-word_list">
                    <li>госпожа</li>
                </ul>
            </div>
            <div className="examples-word">
                <h2>Примеры использования</h2>
                <ul className="examples-word_list">
                    <li>"May I help you, madam?"</li>
                </ul>
            </div>
        </div>
    )
}

export default WordTranslate;