import { useSelector } from "react-redux/es/hooks/useSelector";

import empty_heart from "../../resources/icons/empty_heart.svg";
import plus from "../../resources/icons/plus-circle.svg";
import "./wordTranslate.scss";

const WordTranslate = () => {

    const wordData = useSelector(state => state.word);

    return (
        <div className="translate__block">
            <div className="translate__title_section">
                <h2>Словарь</h2>
                <div className="tabs">
                    <div className="tab"><img src={empty_heart} alt="favourite" /></div>
                    <div className="tab"><img src={plus} alt="adding" /></div>
                </div>
            </div>
            <div className="translate__main_section">
                <div className="translate-word__block">
                    <div className="text">
                        <h3>home</h3>
                        <div className="transcription">[həʊm]<span>, adjective</span></div>
                    </div>
                    <ol className="translate-word__list">
                        <li>
                            <div className="translate-variant">домашний <span>м</span></div>
                            <div className="translate-variant">бытовой <span>м</span></div>
                            <div className="translate-mean">Значение: household</div>
                        </li>

                        <li>
                            <div className="translate-variant">внутренний <span>м</span></div>
                            <div className="translate-variant">отечественный <span>м</span></div>
                            <div className="translate-mean">Значение: internal, domestic</div>
                        </li>

                        <li>
                            <div className="translate-variant">родной <span>м</span></div>
                            <div className="translate-mean">Значение: native</div>
                        </li>

                        <li>
                            <div className="translate-variant">главный <span>м</span></div>
                            <div className="translate-mean">Значение: main</div>
                        </li>
                    </ol>
                </div>

                <div className="translate-word__block">
                    <div className="text">
                        <h3>home</h3>
                        <div className="transcription">[həʊm]<span>, noun</span></div>
                    </div>
                    <ol className="translate-word__list">
                        <li>
                            <div className="translate-variant">родина <span>ж</span></div>
                            <div className="translate-mean">Значение: homeland</div>
                        </li>

                        <li>
                            <div className="translate-variant">жилище <span>ср</span></div>
                            <div className="translate-variant">жилье <span>ср</span></div>
                            <div className="translate-variant">проживание <span>ср</span></div>
                            <div className="translate-mean">Значение: house, housing, residence</div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

const WordTranslateBlock = () => {
    return (
        <div></div>
    )
}

export default WordTranslate;