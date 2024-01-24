
import { createPortal } from 'react-dom';
import { useModal } from '../../hooks/modal.hook';

import './collectionItem.scss';
import CollectionItemModal from '../collectionItemModal/CollectionItemModal';

const CollectionItem = ({ title, id }) => {

    const { modal, closeModal, checkCloseModal, showModal } = useModal();

    return (
        <>
            <div className="collection-card" onClick={showModal}>
                <h3 className='title'>{title}</h3>
            </div>
            {modal ? createPortal(<CollectionItemModal title={title} id={id} closeModal={closeModal} checkCloseModal={checkCloseModal} />, document.body) : null}
        </>
    )
}

export default CollectionItem;