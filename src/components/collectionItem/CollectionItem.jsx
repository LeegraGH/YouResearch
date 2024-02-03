import {createPortal} from 'react-dom';
import {useMemo, useState} from 'react';

import {useModal} from '../../hooks/modal.hook';
import CollectionItemModal from '../collectionItemModal/CollectionItemModal';
import {useDeleteCollectionMutation} from "../../redux/slices/apiSlice";


import './collectionItem.scss';
import DeleteCollectionModal from "../deleteCollectionModal/DeleteCollectionModal";

const CollectionItem = ({title, id, type}) => {

    const [deleteTab, setDeleteTab] = useState(false);

    const [modal, closeModal, showModal, checkCloseModal] = useModal();
    const [deleteModal, closeDeleteModal, showDeleteModal, checkCloseDeleteModal] = useModal();

    const [deleteCollection] = useDeleteCollectionMutation();

    const onShowDeleteTab = () => {
        setDeleteTab(true);
    }

    const onHideDeleteTab = () => {
        setDeleteTab(false);
    }

    const onDeleteCollection = (id) => {
        deleteCollection(id);
    }

    const cardColor = useMemo(() => {
        const colors = ['var(--yellow-color)', 'var(--pink-color)', 'var(--mint-color)', 'var(--purple-color)'];
        return colors[Math.floor(Math.random() * colors.length)];
    }, [])

    return (
        <>
            <div className="collection-card" style={{backgroundColor: cardColor}} onClick={showModal}
                 onMouseOver={onShowDeleteTab} onMouseLeave={onHideDeleteTab}>
                <h2 className='title-item'>{title}</h2>
                {(deleteTab && type === "user") ? <i className="fa-regular fa-trash-can" onClick={(e) => {
                    e.stopPropagation();
                    showDeleteModal();
                }}></i> : null}
            </div>
            {deleteModal ? createPortal(<DeleteCollectionModal title={title}
                                                               deleteCollection={() => onDeleteCollection(id)}
                                                               closeModal={closeDeleteModal}
                                                               checkCloseModal={checkCloseDeleteModal}/>, document.body) : null}
            {modal ? createPortal(<CollectionItemModal type={type} title={title} collectionId={id}
                                                       closeModal={closeModal}
                                                       checkCloseModal={checkCloseModal}/>, document.body) : null}
        </>
    )
}

export default CollectionItem;