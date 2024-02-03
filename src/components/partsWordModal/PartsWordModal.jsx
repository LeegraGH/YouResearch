import { useEffect } from 'react';

import './partsWordModal.scss';

const PartsWordModal = ({ offsetRight, partsWord, hideModal, children }) => {

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', hideModal);
        }, 500);

        return () => document.removeEventListener('click', hideModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="variant-part_modal" style={{ right: offsetRight }} onClick={(e) => e.stopPropagation()}>
            {children}
            <ul className="part__list">
                {partsWord}
            </ul>
        </div >
    )
}

export default PartsWordModal;