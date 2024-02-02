import {createPortal} from 'react-dom';
import {useMemo, useState} from 'react';

import {useModal} from '../../hooks/modal.hook';
import CollectionItemModal from '../collectionItemModal/CollectionItemModal';
import {useDeleteCollectionMutation} from "../../redux/slices/apiSlice";


import './collectionItem.scss';
const CollectionItem = ({title, id}) => {

    const [deleteTab, setDeleteTab] = useState(false);

    const [modal, closeModal, showModal, checkCloseModal] = useModal();

    const [deleteCollection] = useDeleteCollectionMutation();

    const onShowDeleteTab = () => {
        setDeleteTab(true);
    }

    const onHideDeleteTab = () => {
        setDeleteTab(false);
    }

    const onDeleteCollection = (id) =>{
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
                {deleteTab ? <i className="fa-regular fa-trash-can" onClick={(e)=>{
                    e.stopPropagation();
                    onDeleteCollection(id);
                }}></i> : null}
            </div>
            {modal ? createPortal(<CollectionItemModal title={title} collectionId={id} closeModal={closeModal}
                                                       checkCloseModal={checkCloseModal}/>, document.body) : null}
        </>
    )
}

export default CollectionItem;