import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {skipToken} from '@reduxjs/toolkit/query';

import {
    useCreateCollectionWordMutation,
    useDeleteCollectionWordMutation,
    useGetCollectionsQuery,
    useGetCollectionWordQuery
} from '../../redux/slices/apiSlice';
import AddCollectionModal from '../addCollectionModal/AddCollectionModal';
import {useModal} from '../../hooks/modal.hook';
import SearchFilter from '../searchFilter/SearchFilter';
import Spinner from '../spinner/Spinner';
import {isEnglish} from "../../utils/Alphabet";
import {formatPartOfSpeech} from "../../utils/PartsOfSpeech";
import PartsWordModal from '../partsWordModal/PartsWordModal';

import './collectionWordModal.scss';

const CollectionWordModal = ({hideModal, parts, word}) => {

    const [collection, setCollection] = useState("");
    const [chosenWordPart, setChosenWordPart] = useState(null);
    const [isChosenCollectionDisabled, setIsChosenCollectionDisabled] = useState(false);

    const {data: collections = [], isSuccess, isError, isLoading, isFetching} = useGetCollectionsQuery();

    const query = chosenWordPart ? parts.filter(part => part.part === chosenWordPart.pos)[0] : skipToken;
    const {
        data: chosenCollections = [],
        isSuccess: isSuccessChoice,
        isError: isErrorChoice,
        isLoading: isLoadingChoice,
        isFetching: isFetchingChoice
    } = useGetCollectionWordQuery(query);

    const [deleteWord] = useDeleteCollectionWordMutation();
    const [addWord] = useCreateCollectionWordMutation();

    const [addingCollectionModal, closeAddingCollectionModal, showAddingCollectionModal] = useModal();
    const [choiceWordCollectionModal, closeChoiceWordCollectionModal] = useModal(parts.length > 1);

    const colRefs = useRef([]);

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', hideModal);
        }, 500);

        return () => document.removeEventListener('click', hideModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        focusCollections(chosenCollections, collection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenCollections, collection])

    useEffect(() => {
        if (parts.length === 1) setChosenWordPart(word[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const focusCollections = (chosenCollections) => {
        chosenCollections.forEach(col => {
            const col_id = col.collection_id;
            colRefs.current[col_id]?.classList.add("fa-solid");
            colRefs.current[col_id]?.classList.remove("fa-regular");
        })
    }

    const onLoadCollection = (collection) => {
        setCollection(collection);
    }

    const toggleChosenCollection = (current, data, collectionId) => {
        if (isChosenCollectionDisabled) return;

        let chosenCollection = null;

        const cols_id = chosenCollections.map(chosenCol => {
            const col_id = chosenCol.collection_id;
            if (col_id === collectionId) chosenCollection = chosenCol;
            return col_id;
        });

        setIsChosenCollectionDisabled(true);
        setTimeout(() => setIsChosenCollectionDisabled(false), 500);
        if (cols_id.includes(collectionId)) {
            deleteWord({collectionId: collectionId, wordId: chosenCollection.id});
            current.classList.add("fa-regular");
            current.classList.remove("fa-solid");
        } else {
            let word = {
                part: data.pos, translation: data.tr[0].text, word: data.text
            }
            if (!isEnglish(word.part[0])) {
                word = {
                    part: formatPartOfSpeech(data.pos), translation: data.text, word: data.tr[0].text
                }
            }
            addWord({word, collectionId});
            current.classList.add("fa-solid");
            current.classList.remove("fa-regular");
        }
    }

    const onLoadCollections = () => {
        return (collection === "" ? collections : collections.filter(({title}) => title.toLowerCase().includes(collection))).map(({
                                                                                                                                      id,
                                                                                                                                      title
                                                                                                                                  }) => {
            return (<li className='collection' key={id}
                        onClick={(e) => toggleChosenCollection(e.currentTarget.querySelector('i'), chosenWordPart, id)}>
                <i ref={col => colRefs.current[id] = col} className="fa-regular fa-bookmark"></i>
                {title}
            </li>)
        })
    }

    const onLoadCollectionContent = () => {
        if (isSuccess && isSuccessChoice) {
            if (collections.length > 0) {
                const collectionList = onLoadCollections();
                return collectionList.length > 0 ? (<>
                    <div className="add-collection__block" onClick={showAddingCollectionModal}>
                        <i className="fa-regular fa-square-plus"></i>
                        <span>Новая коллекция</span>
                    </div>
                    <div className="search"><SearchFilter onLoadFilter={onLoadCollection}
                                                          placeholderName="Поиск по коллекциям"/>
                    </div>
                    <ul className="collection__list">
                        {collectionList}
                    </ul>
                </>) : <div className="collection__message">Ни одной коллекции не найдено</div>;
            } else return <div className="collection__message">Нет ни одной коллекции</div>;
        } else if (isLoading || isFetching || isLoadingChoice || isFetchingChoice) {
            return <Spinner size="50%"/>;
        } else if (isError || isErrorChoice) {
            return <div className="collection__message">Ошибка при загрузке коллекций</div>;
        }
    }

    const onChooseWordPart = (word) => {
        setChosenWordPart(word);
        closeChoiceWordCollectionModal();
    }

    const formatParts = () => {
        return parts.map((part, i) => {
            return (<li
                key={i}
                onClick={() => onChooseWordPart(word[i])}
                className="part">
                {part.word}
                {" - "}
                {part.part}
            </li>)
        });
    };

    const collectionContent = onLoadCollectionContent();
    const formatPartsWord = formatParts();

    return (<>
        {choiceWordCollectionModal ? createPortal(<PartsWordModal partsWord={formatPartsWord}
                                                                  hideModal={closeChoiceWordCollectionModal}>
            <h5>Выберите, слово какой части речи вы хотите добавить в коллекцию:</h5>
        </PartsWordModal>, document.querySelector(".translate__title_section .tabs")) : null}
        {addingCollectionModal ? createPortal(<AddCollectionModal
            hideModal={closeAddingCollectionModal}/>, document.querySelector(".translate__title_section .tabs")) : null}
        <div className="collection-word__modal"
             style={choiceWordCollectionModal || addingCollectionModal ? {display: "none"} : {display: "block"}}
             onClick={(e) => e.stopPropagation()}>
            {collectionContent}
        </div>
    </>)
}

export default CollectionWordModal;