import {useGetCollectionWordsQuery} from '../../redux/slices/apiSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import WordItem from '../wordItem/WordItem';
import Spinner from '../spinner/Spinner';
import {useDeleteCollectionWordMutation} from '../../redux/slices/apiSlice';

import './collectionItemModal.scss';

const CollectionItemModal = ({title, collectionId, closeModal, checkCloseModal}) => {

    const {data = [], isSuccess, isLoading, isFetching} = useGetCollectionWordsQuery(collectionId);
    const [deleteWord] = useDeleteCollectionWordMutation();

    const onLoadCollectionWords = (data) => {
        return data.map(({id, word, translation}) => {
            return <WordItem key={id} deleteWord={() => deleteWord({collectionId: collectionId, wordId: id})} word={word}
                             translation={translation}/>
        })
    }

    const onLoadContent = (data) => {
        if (isSuccess) {
            if (data.length > 0) {
                const words = onLoadCollectionWords(data);
                return (
                    <div className="collection__section">
                        {words}
                    </div>
                )
            } else return <ErrorMessage widthImage={"400px"}>В коллекции {title} пока что пусто...</ErrorMessage>;
        } else if (isLoading || isFetching) {
            return <Spinner/>;
        } else return <ErrorMessage widthImage={"400px"}>Ошибка при загрузке коллекции</ErrorMessage>;
    }

    const content = onLoadContent(data);

    return (
        <ModalWrapper onCloseModal={checkCloseModal}>
            <div className="collection-words__modal">
                <h2 className="title">{title}</h2>
                <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                {content}
            </div>
        </ModalWrapper>
    )
}

export default CollectionItemModal;