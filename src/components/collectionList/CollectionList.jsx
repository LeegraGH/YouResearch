import { useContext } from "react";

import CollectionItem from '../collectionItem/CollectionItem';
import Spinner from "../spinner/Spinner";
import { CollectionContext } from "../../contexts/Contexts";
import { useGetCollectionsQuery } from "../../redux/slices/apiSlice";

import './collectionList.scss';

const CollectionList = () => {

    const searchCollection = useContext(CollectionContext);
    const { data = [], isSuccess, isError, isLoading, isFetching } = useGetCollectionsQuery();

    const onLoadCollections = (data) => {
        return (searchCollection === "" ? data : data.filter(({ title }) => title.toLowerCase().includes(searchCollection))).map(({ id, title }) => { return <CollectionItem key={id} title={title} id={id} /> })
    }

    const onLoadContent = (data) => {
        if (isSuccess) {
            if (data.length > 0) {
                const collections = onLoadCollections(data);
                return collections.length > 0 ?
                    <div className="collection__block">
                        {collections}
                    </div> :
                    <div className="collection__message">Ни одной коллекции не найдено</div>;
            } else return <div className="collection__message">Нет ни одной коллекции</div>;
        } else if (isLoading || isFetching) {
            return <Spinner />;
        } else if (isError) {
            return <div className="collection__message">Ошибка при загрузке коллекций</div>;
        }
    }

    const userContent = onLoadContent(data);
    // const publicContent = onLoadContent(data);
    // const content = onLoadContent(data);


    return (
        <div className="collection">
            <section className="collection__section">
                <h2 className="title">Мои Коллекции</h2>
                {userContent}
            </section>
            <section className="collection__section">
                <h2 className="title">Коллекции YouResearch</h2>
                <div className="collection__block">
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                </div>
            </section>
            <section className="collection__section">
                <h2 className="title">Публичные Коллекции</h2>
                <div className="collection__grid">
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                    <CollectionItem />
                </div>
            </section>
        </div>
    )
}

export default CollectionList;