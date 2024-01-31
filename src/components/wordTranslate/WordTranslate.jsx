import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { fetchWord } from "../../redux/slices/wordSlice";
import { detectLanguage } from "../../utils/Alphabet";
import { formatPartOfSpeech } from "../../utils/PartsOfSpeech";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { useAddFavouriteWordMutation, useGetFavouriteWordQuery, useDeleteFavouriteWordMutation } from "../../redux/slices/apiSlice";
import { isEnglish } from "../../utils/Alphabet";
import { useModal } from "../../hooks/modal.hook";
import WordPartsModal from "../wordPartsModal/WordPartsModal";
import CollectionWordModal from "../collectionWordModal/CollectionWordModal";

import empty_heart from "../../resources/icons/empty_heart.svg";
import heart from "../../resources/icons/heart.svg";
import plus from "../../resources/icons/plus-circle.svg";
import "./wordTranslate.scss";

const WordTranslate = () => {

	const [favouriteStatus, setFavouriteStatus] = useState(false);
	const [parts, setParts] = useState([]);
	const [isFavouriteButtonDisabled, setIsFavouriteButtonDisabled] = useState(false);

	const { data, status } = useSelector(state => state.word);

	const [favouriteModal, closeFavouriteModal, showFavouriteModal] = useModal();
	const [collectionModal, closeCollectionModal, showCollectionModal] = useModal();

	const query = (status === "idle" && data !== null && data.length > 0) ? { word: data[0].text } : skipToken;
	const { data: favourite = [] } = useGetFavouriteWordQuery(query);

	const [addWord] = useAddFavouriteWordMutation();
	const [deleteWord] = useDeleteFavouriteWordMutation();

	useEffect(() => {
		if (favourite.length > 0) {
			setFavouriteStatus(true);
		} else setFavouriteStatus(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data !== null && data.length > 0) {
			const partsList = [];
			data.forEach(word => partsList.push({ word: word.text, part: word.pos }));
			setParts(partsList);
		}
	}, [data])

	const toggleChosenPart = (index, chosenWord, formatPart) => {
		for (let i = 0; i < parts.length; i++) {
			if (index === i) {
				if (!chosenWord.length > 0) {
					let word = {
						part: parts[i].part,
						translation: data[i].tr[0].text,
						word: data[i].text
					}

					if (!isEnglish(word.part[0])) {
						word = {
							part: formatPart,
							translation: data[i].text,
							word: data[i].tr[0].text
						}
					}
					addWord({ word });
				} else {
					deleteWord({ wordId: chosenWord[0].id });
				}
				break;
			}
		}
	}

	const toggleFavourite = () => {
		if (isFavouriteButtonDisabled) return;

		if (data.length > 1) {
			showFavouriteModal();
		} else {
			setIsFavouriteButtonDisabled(true);
			setTimeout(() => setIsFavouriteButtonDisabled(false), 500);

			if (favouriteStatus) {
				deleteWord({ wordId: favourite[0].id });
				setFavouriteStatus(false);
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
				addWord({ word });
				setFavouriteStatus(true);
			}
		}
	}

	const onLoadSkeletonBlock = useMemo(() => {
		const skeletonSection = [
			<Skeleton key={0} variant="rounded" width={250} height={25} />,
			...[...Array(3)].map((el, i) => <Skeleton key={i + 1} variant="rounded" width={"100%"} height={40} />)
		];
		return (
			<>
				<div className="translate__title_section">
					<h2>{<Skeleton variant="rounded" width={200} height={30} />}</h2>
					<div className="tabs">
						<Skeleton variant="circular" width={53} height={53} />
						<Skeleton variant="circular" width={53} height={53} />
					</div>
				</div>
				<div className="translate__main_section">
					{skeletonSection}
					<br />
					{skeletonSection}
				</div>
			</>
		)
	}, []);

	const onLoadWordInfo = () => {

		const translateContent = data?.map((word, i) => {
			return <WordTranslateBlock data={word} key={i} closeFavouriteModal={closeFavouriteModal} />
		})

		const partsFavouriteWord = parts.length > 1 ? parts.map((part, i) => {
			const formatPart = isEnglish(part.part) ? part.part : formatPartOfSpeech(part.part);
			const formatWord = isEnglish(part.word) ? part.word : data[i]?.tr[0].text;

			const isChosenWord = favourite.filter(word => word.part === formatPart && word.word === formatWord);

			return <li
				key={i}
				onClick={() => toggleChosenPart(i, isChosenWord, formatPart)}
				className="part">
				{part.word}
				{" - "}
				{part.part}
				{isChosenWord.length > 0 ? " ✅" : " ❌"}
			</li>
		}) : null;

		return (<>
			<div className="translate__title_section">
				<h2>Словарь</h2>
				<div className="tabs">
					{favouriteModal ? <WordPartsModal offsetRight={"68px"} partsWord={partsFavouriteWord} hideModal={closeFavouriteModal}><h5>Выберите, слово какой части речи вы хотите добавить в избранное:</h5></WordPartsModal> : null}
					<motion.button
						onClick={toggleFavourite}
						disabled={isFavouriteButtonDisabled}
						className="tab"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						<img src={favouriteStatus ? heart : empty_heart} alt="favourite" />
					</motion.button>
					{collectionModal ? <CollectionWordModal parts={parts} word={data} hideModal={closeCollectionModal} /> : null}
					<motion.button
						onClick={showCollectionModal}
						className="tab"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						<img src={plus} alt="adding" />
					</motion.button>
				</div>
			</div>
			<div className="translate__main_section">
				{translateContent}
			</div>
		</>)
	}

	const onLoadContent = (data, status) => {
		switch (status) {
			case "idle":
				if (data === null) return onLoadSkeletonBlock;
				else if (data.length > 0) {
					const wordContent = onLoadWordInfo();
					return wordContent;
				} else return <ErrorMessage>К сожалению, слово, которое вы ищите, не найдено</ErrorMessage>;
			case "loading":
				return <Spinner />
			case "error":
				return <ErrorMessage>Ошибка при поиске слова или фразы</ErrorMessage>;
			default:
				break;
		}
	}

	const content = onLoadContent(data, status);

	return (
		<div className="translate__block">
			{content}
		</div>
	)
}

const WordTranslateBlock = ({ data, closeFavouriteModal }) => {

	const dispatch = useDispatch();

	const onSubmitWord = (word) => {
		const lang = detectLanguage(word.toLowerCase());
		closeFavouriteModal();
		dispatch(fetchWord({ word, lang }));
	}

	const onLoadTranslateList = (translations) => {
		const newData = translations.map((translation, i) => {
			const synonyms = translation.syn?.map((syn, i) => {
				return <div key={i} onClick={() => onSubmitWord(syn.text)} className="translate-variant">{syn.text}{syn.gen ? (<span> {syn.gen}</span>) : null}</div>
			})

			const means = translation.mean?.reduce((acc, syn, i) => {
				if (i !== 0) acc = acc + ", " + syn.text;
				else acc = acc + syn.text;
				return acc;
			}, "");
			return (
				<li key={i}>
					<div onClick={() => onSubmitWord(translation.text)} className="translate-variant">{translation.text}{translation.gen ? (<span> {translation.gen}</span>) : null}</div>
					{synonyms}
					{means !== undefined ? <div className="translate-mean">{means}</div> : null}
				</li >
			)
		})
		return (
			<ol className="translate-word__list">
				{newData}
			</ol>
		)
	}

	const translations = onLoadTranslateList(data.tr);

	return (
		<div className="translate-word__block">
			<div className="text">
				<h3>{data.text}</h3>
				<div className="transcription">{data.ts ? `[${data.ts}], ` : null}{data.pos ? (<span>{data.pos}</span>) : null}</div>
				{data.fl ? <div className="verbs">{data.fl}</div> : null}
			</div>
			{translations}
		</div>
	)
}

export default WordTranslate;