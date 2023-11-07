
import error404 from "../../resources/img/404.png";
import "./notFound.scss";

const NotFound = () => {
    return (
        <div className="not-found__block">
            <h1>Oops! Страница, которую вы ищите, не найдена</h1>
            <img src={error404} alt="error 404" />
        </div>
    )
}

export default NotFound;