
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRef } from 'react';

import { useGetCollectionsQuery, useGetCollectionWordQuery, useDeleteCollectionWordMutation, useCreateCollectionWordMutation } from '../../redux/slices/apiSlice';
import CollectionModal from '../collectionModal/CollectionModal';
import { useModal } from '../../hooks/modal.hook';
import SearchFilter from '../searchFilter/SearchFilter';
import Spinner from '../spinner/Spinner';
import { isEnglish } from "../../utils/Alphabet";
import { formatPartOfSpeech } from "../../utils/PartsOfSpeech";

import './collectionWordModal.scss';

const CollectionWordModal = ({ hideModal, parts, word }) => {

    const [collection, setCollection] = useState("");
    const [isChosenCollectionDisabled, setIsChosenCollectionDisabled] = useState(false);

    const { data: collections = [], isSuccess, isError, isLoading, isFetching } = useGetCollectionsQuery();

    const query = parts ? parts[0].word : skipToken;
    const { data: chosenCollections = [] } = useGetCollectionWordQuery(query);
    console.log(chosenCollections)
    const [deleteWord] = useDeleteCollectionWordMutation();
    const [addWord] = useCreateCollectionWordMutation();

    const [addingCollectionModal, closeAddingCollectionModal, showAddingCollectionModal] = useModal();

    const colRefs = useRef([]);

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', hideModal);
        }, 500);

        return () => document.removeEventListener('click', hideModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     focusCols(chosenCollections);
    // }, [chosenCollections])

    useEffect(() => {
        setTimeout(() => focusCols(chosenCollections), 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenCollections])

    const focusCols = (chosenCollections) => {
        colRefs.current.forEach(col => {
            const cols_id = chosenCollections.map(chosenCol => chosenCol.collection_id);

            if (cols_id.includes(col.getAttribute('data-col-key'))) {
                col.classList.add("fa-solid");
                col.classList.remove("fa-regular");
            } else {
                col.classList.remove('fa-solid');
                col.classList.add("fa-regular");
            }
        })
    }

    const onLoadCollection = (collection) => {
        setCollection(collection);
    }

    const toggleChosenCollection = (current, data, collectionId) => {
        if (isChosenCollectionDisabled) return;

        console.log(current)

        if (data.length > 1) {
            return;
        } else {
            setIsChosenCollectionDisabled(true);
            setTimeout(() => setIsChosenCollectionDisabled(false), 500);
            const checkSelect = current.classList[1];
            if (checkSelect.includes("fa-solid")) {
                deleteWord({ path: chosenCollections[0].col_word_path, wordId: chosenCollections[0].id });
                current.classList.add("fa-regular");
                current.classList.remove("fa-solid");
            } else {
                let word = {
                    part: data[0].pos,
                    translation: data[0].tr[0].text,
                    word: data[0].text
                }
                if (!isEnglish(word.part[0])) {
                    word = {
                        part: formatPartOfSpeech(data[0].pos),
                        translation: data[0].text,
                        word: data[0].tr[0].text
                    }
                }
                addWord({ word, collectionId });
                current.classList.add("fa-solid");
                current.classList.remove("fa-regular");
            }
        }
    }

    const onLoadCollections = () => {
        return (collection === "" ? collections : collections.filter(({ title }) => title.toLowerCase().includes(collection))).map(({ id, title }, i) => {
            return (
                <li className='collection' key={id} onClick={(e) => toggleChosenCollection(e.currentTarget.querySelector('i'), word, id)}>
                    <i data-col-key={id} ref={col => colRefs.current[i] = col} className="fa-regular fa-bookmark"></i>
                    {title}
                </li>
            )
        })
    }

    const onLoadCollectionContent = () => {
        if (isSuccess) {
            if (collections.length > 0) {
                const collectionList = onLoadCollections();
                return collectionList.length > 0 ?
                    <ul className="collection__list">
                        {collectionList}
                    </ul> :
                    <div className="collection__message">Ни одной коллекции не найдено</div>;
            } else return <div className="collection__message">Нет ни одной коллекции</div>;
        } else if (isLoading || isFetching) {
            return <Spinner size="50%" />;
        } else if (isError) {
            return <div className="collection__message">Ошибка при загрузке коллекций</div>;
        }
    }

    const collectionContent = onLoadCollectionContent();

    return (
        <>
            {addingCollectionModal ? createPortal(<CollectionModal page={"dictionary"} hideModal={closeAddingCollectionModal} />, document.querySelector(".translate__title_section .tabs")) : null}
            <div className={addingCollectionModal ? "hidden__modal" : "collection-word__modal"} onClick={(e) => e.stopPropagation()}>
                <div className="add-collection__block" onClick={showAddingCollectionModal}>
                    <i className="fa-regular fa-square-plus"></i>
                    <span>Новая коллекция</span>
                </div>
                {collections.length > 0
                    ? <div className="search"><SearchFilter onLoadFilter={onLoadCollection} placeholderName="Поиск по коллекциям" fullSize={true} /></div>
                    : null}
                {collectionContent}
            </div >
        </>
    )
}

export default CollectionWordModal;