import { useEffect } from 'react';

import './favouriteModal.scss';

const FavouriteModal = ({ partsFavouriteWord, hideModal }) => {

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', hideModal);
        }, 500);

        return () => document.removeEventListener('click', hideModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="variant-part_modal" onClick={(e) => e.stopPropagation()}>
            <h5>Выберите, слово какой части речи вы хотите добавить в избранное:</h5>
            <ul className="part__list">
                {partsFavouriteWord}
            </ul>
        </div >
    )
}

export default FavouriteModal;