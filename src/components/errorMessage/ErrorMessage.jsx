
import errorImage from "../../resources/img/search-error.svg";
import "./errorMessage.scss";

const ErrorMessage = ({ widthImage, children }) => {

    return (
        <div className="error__block">
            <img src={errorImage} alt="error" style={{ width: widthImage }} />
            <div className="error__message">{children} 😔</div>
        </div>
    )
}

export default ErrorMessage;