
import { useCallback } from "react";
import { useGetFavouriteWordsQuery, useDeleteFavouriteWordMutation } from "../../redux/slices/apiSlice";
import FlashCard from "../flashCard/FlashCard";

import "./favouriteList.scss";

const FavoriteList = () => {

    const { data = [], isLoading, isFetching, isError, refetch, error } = useGetFavouriteWordsQuery();

    const [deleteWord] = useDeleteFavouriteWordMutation();

    const deleteFavourite = useCallback((id) => {
        deleteWord({ wordId: id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLoadFavourites = (data) => {
        const favourites = data?.map(({ id, word, translation }) => {
            return <FlashCard key={id} deleteFavourite={() => deleteFavourite(id)} word={word} translation={translation} />
        })

        return favourites;
    }

    const content = onLoadFavourites(data);

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