
import "./modalWrapper.scss";

const ModalWrapper = (props) => {
    return (
        <div className="modal__wrapper">
            {props.children}
        </div>
    )
}

export default ModalWrapper;