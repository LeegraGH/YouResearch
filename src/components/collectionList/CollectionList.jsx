import {useContext} from "react";

import CollectionItem from '../collectionItem/CollectionItem';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {CollectionContext} from "../../contexts/Contexts";
import {useGetAppCollectionsQuery, useGetCollectionsQuery} from "../../redux/slices/apiSlice";

import './collectionList.scss';

const CollectionList = () => {

    const searchCollection = useContext(CollectionContext);
    const {data = [], isSuccess, isLoading, isFetching} = useGetCollectionsQuery();
    const {
        data: appCollections = [],
        isSuccess: isAppSuccess,
        isLoading: isAppLoading,
        isFetching: isAppFetching
    } = useGetAppCollectionsQuery();

    const onLoadCollections = (data, type) => {
        return (searchCollection === "" ? data : data.filter(({title}) => title.toLowerCase()
            .includes(searchCollection)))
            .map(({id, title}) => {
                return <CollectionItem key={id} title={title} id={id} type={type}/>
            })
    }

    const onLoadContent = (type, data, isSuccess, isLoading, isFetching) => {
        if (isSuccess) {
            if (data.length > 0) {
                const collections = onLoadCollections(data, type);
                return collections.length > 0
                    ? <div className="collection__block">
                        {collections}
                    </div>
                    : <ErrorMessage widthImage={"335px"}>Ни одной коллекции не найдено</ErrorMessage>;
            } else return <ErrorMessage widthImage={"335px"}>Нет ни одной коллекции</ErrorMessage>;
        } else if (isLoading || isFetching) {
            return <Spinner/>;
        } else {
            return <ErrorMessage widthImage={"335px"}>Ошибка при загрузке коллекций</ErrorMessage>;
        }
    }

    const userContent = onLoadContent("user", data, isSuccess, isLoading, isFetching);
    const appContent = onLoadContent("app", appCollections, isAppSuccess, isAppLoading, isAppFetching);
    // const publicContent = onLoadContent(data);


    return (<div className="collection">
        <section className="collection__section">
            <h2 className="title">Мои Коллекции</h2>
            {userContent}
        </section>
        <section className="collection__section">
            <h2 className="title">Коллекции YouResearch</h2>
            {appContent}
        </section>
        <section className="collection__section">
            <h2 className="title">Публичные Коллекции</h2>
            <div className="collection__grid">
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
            </div>
        </section>
    </div>)
}

export default CollectionList;