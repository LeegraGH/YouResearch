
import { useGetCollectionWordsQuery } from '../../redux/slices/apiSlice';

import ModalWrapper from '../modalWrapper/ModalWrapper';

import './collectionItemModal.scss';

const CollectionItemModal = ({ title, id, closeModal, checkCloseModal }) => {

    const { data = [], isSuccess, isError, isLoading, isFetching } = useGetCollectionWordsQuery(id);

    const onShowCollectionWords = () => {
        console.log(data)
    }

    return (
        <ModalWrapper center={true} onCloseModal={checkCloseModal}>
            <div className="collection-words__modal">
                {title}
            </div>
        </ModalWrapper>
    )
}

export default CollectionItemModal;