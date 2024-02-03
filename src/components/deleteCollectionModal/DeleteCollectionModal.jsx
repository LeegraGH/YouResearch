import ModalWrapper from "../modalWrapper/ModalWrapper";

import './deleteCollectionModal.scss';
const DeleteCollectionModal = ({title, deleteCollection, closeModal, checkCloseModal}) => {

    return (
        <ModalWrapper onCloseModal={checkCloseModal}>
            <div className="del_col__modal">
                <h3>Вы действительно хотите удалить коллекцию {title}?</h3>
                <div className="btn__block">
                    <button className="btn" onClick={deleteCollection}>Удалить</button>
                    <button className="btn" onClick={closeModal}>Отмена</button>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default DeleteCollectionModal;