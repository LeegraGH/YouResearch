import {useState} from "react";

import {useGetCollectionWordsQuery} from '../../redux/slices/apiSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import WordItem from '../wordItem/WordItem';
import Spinner from '../spinner/Spinner';
import {useDeleteCollectionWordMutation} from '../../redux/slices/apiSlice';
import SearchFilter from "../searchFilter/SearchFilter";

import './collectionItemModal.scss';
import {isEnglish} from "../../utils/Alphabet";

const CollectionItemModal = ({type, title, collectionId, closeModal, checkCloseModal}) => {

    const [filter, setFilter] = useState("");

    const {data = [], isSuccess, isLoading, isFetching} = useGetCollectionWordsQuery({collectionId, type});
    const [deleteWord] = useDeleteCollectionWordMutation();

    const onLoadCollectionWords = (data) => {
        return (filter === "" ? data : data.filter(({word, translation}) =>
            isEnglish(filter) ? word.toLowerCase().includes(filter) : translation.toLowerCase().includes(filter)))
            .map(({id, word, translation}) => {
                return <WordItem key={id}
                                 deleteWord={() => deleteWord({collectionId: collectionId, wordId: id})}
                                 word={word}
                                 translation={translation}/>
            })
    }
    const onLoadFilterWord = (word) => {
        setFilter(word);
    }

    const onLoadContent = (data) => {
        let noWordsContent;
        if (isSuccess) {
            if (data.length > 0) {
                const wordsContent = onLoadCollectionWords(data);
                return wordsContent.length > 0 ?
                    <div className="collection-words__section">
                        {wordsContent}
                    </div> :
                    <ErrorMessage widthImage={"400px"}>Ни одного слова не найдено...</ErrorMessage>;
            } else noWordsContent = <ErrorMessage widthImage={"400px"}>В коллекции пока что пусто...</ErrorMessage>;
        } else if (isLoading || isFetching) {
            noWordsContent = <Spinner/>;
        } else noWordsContent = <ErrorMessage widthImage={"400px"}>Ошибка при загрузке коллекции</ErrorMessage>;
        return <div className="collection-no-words__section">{noWordsContent}</div>;
    }

    const content = onLoadContent(data);

    return (
        <ModalWrapper onCloseModal={checkCloseModal}>
            <div className="collection-words__modal">
                <div className="collection_head">
                    <h2 className="title">{title}</h2>
                    <SearchFilter slowAppear={true} onLoadFilter={onLoadFilterWord}
                                  placeholderName={"Поиск по словам"}
                                  styles={{width: "300px"}}/>
                </div>
                <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                {content}
            </div>
        </ModalWrapper>
    )
}

export default CollectionItemModal;