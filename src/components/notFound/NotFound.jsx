
import not_found from "../../resources/img/404.svg";
import "./notFound.scss";

const NotFound = () => {
    return (
        <div className="not-found__block">
            <img src={not_found} alt="404 not found" />
            <div className="not-found__message">Мы, люди, иногда не можем найти слов - <br />сегодня же мы не смогли найти страницу</div>
        </div>
    )
}

export default NotFound;