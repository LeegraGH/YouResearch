
import "./modalWrapper.scss";

const ModalWrapper = (props) => {

    return (
        <div className="modal__wrapper" onClick={props.onCloseModal}>
            {props.children}
        </div>
    )
}

export default ModalWrapper;