
import './favouriteModal.scss';

const FavouriteModal = ({ partsFavouriteWord }) => {
    <div className="variant-part_modal">
        <h5>Выберите, слово какой части речи вы хотите добавить в избранное:</h5>
        <ul className="part__list">
            {partsFavouriteWord}
        </ul>
    </div>
}

export default FavouriteModal;