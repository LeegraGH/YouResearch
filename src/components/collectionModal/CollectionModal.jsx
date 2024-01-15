
import { useState } from "react";
import "./collectionModal.scss";

const CollectionModal = ({ hideModal }) => {

    const [title, setTitle] = useState("");

    const onLoadTitle = (title) => {
        setTitle(title);
    }

    return (
        <div className="collection__modal">
            <div className="close">
                <i className="fa-solid fa-xmark" onClick={hideModal}></i>
            </div>
            <div className="create__block">
                <div className="title_input">
                    <input onChange={onLoadTitle} value={title} type="text" placeholder="Введите название коллекции" />
                </div>
                <div className="public_input">
                    <label htmlFor="public">Публичная коллекция</label>
                    <input type="checkbox" name="public" id="public" />
                </div>
                <button className="btn">Создать</button>
            </div>
        </div>
    )
}

export default CollectionModal;