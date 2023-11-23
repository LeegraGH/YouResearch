
import { useContext } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useGetFavouriteWordsQuery, useDeleteFavouriteWordMutation } from "../../redux/slices/apiSlice";
import FlashCard from "../flashCard/FlashCard";
import { FavouriteContext } from "../../contexts/Contexts";
import { isEnglish } from "../../utils/Alphabet";

import "./favouriteList.scss";

const FavoriteList = () => {

    const { data = [], isSuccess, isLoading, isFetching } = useGetFavouriteWordsQuery();
    const [deleteWord] = useDeleteFavouriteWordMutation();
    const searchFavourite = useContext(FavouriteContext);

    const onLoadFavourites = (data) => {
        return (searchFavourite === "" ? data : data.filter(({ word, translation }) =>
            isEnglish(searchFavourite) ? word.toLowerCase().includes(searchFavourite) : translation.toLowerCase().includes(searchFavourite))).map(({ id, word, translation }) => {
                return <FlashCard key={id} deleteFavourite={() => deleteWord({ wordId: id })} word={word} translation={translation} />
            })
    }

    const onLoadContent = (data) => {
        if (isSuccess) {
            if (data.length > 0) {
                const words = onLoadFavourites(data);
                return words.length > 0 ?
                    <div className="favourite__section">
                        {words}
                    </div> :
                    <ErrorMessage>Не найдено ни одного слова...</ErrorMessage>;
            } else return <ErrorMessage>В Вашем Избранном пока что пусто...</ErrorMessage>;
        } else if (isLoading || isFetching) {
            return <Spinner />;
        } else return <ErrorMessage>Ошибка при загрузке Избранного</ErrorMessage>;
    }

    const content = onLoadContent(data);

    return (
        <div className="favourite__block">
            <h2 className="title">Избранное</h2>
            {content}
        </div>
    )
}

export default FavoriteList;