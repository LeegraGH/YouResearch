
import "./errorMessage.scss";

import errorImage from "../../resources/img/search-error.svg";

const ErrorMessage = ({ children }) => {

    return (
        <div className="error__block">
            <img src={errorImage} alt="error" />
            <div className="error__message">{children} 😔</div>
        </div>
    )
}

export default ErrorMessage;