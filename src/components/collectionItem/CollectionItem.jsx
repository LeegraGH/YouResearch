
import { motion } from "framer-motion";

import './collectionItem.scss';

const CollectionItem = ({ title }) => {

    return (
        <div className="collection-card">
            <h3 className='title'>{title}</h3>
            {/* <motion.button
                onClick={toggleFavourite}
                // onBlur={onHideModal}
                disabled={isButtonDisabled}
                className="tab"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <img src={favouriteStatus ? heart : empty_heart} alt="favourite" />
            </motion.button> */}
        </div>
    )
}

export default CollectionItem;