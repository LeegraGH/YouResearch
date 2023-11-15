import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import { useMemo, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from "../errorMessage/ErrorMessage";
import { addFavourite } from "../../redux/slices/favouritesSlice";

import empty_heart from "../../resources/icons/empty_heart.svg";
import heart from "../../resources/icons/heart.svg";
import plus from "../../resources/icons/plus-circle.svg";
import "./wordTranslate.scss";

const WordTranslate = () => {

    const [favouriteStatus, setFavouriteStatus] = useState(false);

    const { data, status } = useSelector(state => state.word);
    const dispatch = useDispatch();

    const toggleFavourite = () => {

        setFavouriteStatus(favouriteStatus => !favouriteStatus);

        const favourite = {
            id: uuidv4(),
            word: data[0].text,
            translation: data[0].tr[0].text
        };
        dispatch(addFavourite(favourite));
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
            return <WordTranslateBlock data={word} key={i} />
        })

        return (<>
            <div className="translate__title_section">
                <h2>Словарь</h2>
                <div className="tabs">
                    <button onClick={toggleFavourite} className="tab"><img src={favouriteStatus ? heart : empty_heart} alt="favourite" /></button>
                    <button className="tab"><img src={plus} alt="adding" /></button>
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
                return <CircularProgress color="inherit" />
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

const WordTranslateBlock = ({ data }) => {
    const onLoadTranslateList = (translations) => {
        const newData = translations.map((translation, i) => {
            const synonyms = translation.syn?.map((syn, i) => {
                return <div key={i} className="translate-variant">{syn.text}{syn.gen ? (<span> {syn.gen}</span>) : null}</div>
            })

            const means = translation.mean?.reduce((acc, syn, i) => {
                if (i !== 0) acc = acc + ", " + syn.text;
                else acc = acc + syn.text;
                return acc;
            }, "");
            return (
                <li key={i}>
                    <div className="translate-variant">{translation.text}{translation.gen ? (<span> {translation.gen}</span>) : null}</div>
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