
import "./modalWrapper.scss";

const ModalWrapper = (props) => {

    return (
        <div className={props.center ? "modal__wrapper center" : "modal__wrapper"} onClick={props.onCloseModal}>
            {props.children}
        </div>
    )
}

export default ModalWrapper;