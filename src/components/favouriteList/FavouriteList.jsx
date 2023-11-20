
import { useCallback, useContext } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useGetFavouriteWordsQuery, useDeleteFavouriteWordMutation } from "../../redux/slices/apiSlice";
import FlashCard from "../flashCard/FlashCard";
import { FavouriteContext } from "../../contexts/Contexts";

import "./favouriteList.scss";

const FavoriteList = () => {

    const { data = [], isSuccess, isLoading, isFetching } = useGetFavouriteWordsQuery();
    const [deleteWord] = useDeleteFavouriteWordMutation();
    const searchFavourite = useContext(FavouriteContext);

    const deleteFavourite = useCallback((id) => {
        deleteWord({ wordId: id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLoadFavourites = (data) => {
        if (searchFavourite !== "") {
            return data.filter(({ word }) => word.includes(searchFavourite)).map(({ id, word, translation }) => {
                return <FlashCard key={id} deleteFavourite={() => deleteFavourite(id)} word={word} translation={translation} />
            })
        } else {
            return data.map(({ id, word, translation }) => {
                return <FlashCard key={id} deleteFavourite={() => deleteFavourite(id)} word={word} translation={translation} />
            })
        }
    }

    const onLoadContent = (data) => {
        if (isSuccess) {
            if (data.length > 0) {
                return onLoadFavourites(data);
            } else return <ErrorMessage>В Вашем Избранном пока что пусто...</ErrorMessage>;
        } else if (isLoading || isFetching) {
            return <Spinner />;
        } else return <ErrorMessage>Ошибка при загрузке Избранного</ErrorMessage>;
    }

    const content = onLoadContent(data);

    return (
        <div className="favourite__block">
            <h2 className="title">Избранное</h2>
            <div className="favourite__section">
                {content}
            </div>
        </div>
    )
}

export default FavoriteList;