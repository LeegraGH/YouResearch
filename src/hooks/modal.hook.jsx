import { useState } from "react";

export const useModal = () => {

    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const checkCloseModal = (content) => {
        if (content.target.classList.value.includes("modal__wrapper")) {
            setModal(false);
        }
    }

    const toggleModal = () => {
        setModal(modal => !modal);
    }

    return { modal, closeModal, showModal, checkCloseModal, toggleModal };
}