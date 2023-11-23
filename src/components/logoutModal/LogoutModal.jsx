
import "./logoutModal.scss";

const LogoutModal = () => {
    return (
        <div className="logout__modal">
            <h3>Вы действительно хотите выйти из аккаунта?</h3>
            <div className="btn__block">
                <button className="btn">Выйти</button>
                <button className="btn">Остаться 😊</button>
            </div>
        </div>
    )
}

export default LogoutModal;