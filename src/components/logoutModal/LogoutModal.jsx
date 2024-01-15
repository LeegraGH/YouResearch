import ModalWrapper from '../modalWrapper/ModalWrapper';

import "./logoutModal.scss";

const LogoutModal = ({ hideLogoutModal }) => {

    return (
        <ModalWrapper>
            <div className="logout__modal">
                <h3>Вы действительно хотите выйти из аккаунта?</h3>
                <div className="btn__block">
                    <button className="btn">Выйти</button>
                    <button className="btn" onClick={hideLogoutModal}>Остаться 😊</button>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default LogoutModal;