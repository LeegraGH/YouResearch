
import { Formik, Form, Field, ErrorMessage } from 'formik';

import ModalWrapper from '../modalWrapper/ModalWrapper';

import "./collectionModal.scss";

const CollectionModal = ({ hideModal, checkCloseModal }) => {

    const onSubmitCollection = (collection) => {
        console.log(collection);
    }

    return (
        <ModalWrapper onCloseModal={checkCloseModal} center={false}>
            <div className="collection__modal">
                <div className="close">
                    <i className="fa-solid fa-xmark" onClick={hideModal}></i>
                </div>
                <Formik
                    initialValues={{ title: "", public: false }}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = "Обязательное поле!";
                        } else if (values.title.length < 2) {
                            errors.title = "Минимальная длина - 2 символа!";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        onSubmitCollection(values);
                        resetForm();
                    }}
                >
                    {() => (
                        <Form className="create__block">
                            <div className="title_input">
                                <Field type="text" name="title" id="title" placeholder="Введите название коллекции" />
                                <ErrorMessage className="title_input__error" name="title" component="span" />
                            </div>
                            <div className="public_input">
                                <span>Публичная коллекция</span>
                                <Field type="checkbox" id="public" name="public" />
                                <label htmlFor="public" className="public_label"></label>
                            </div>
                            <button type="submit" className="btn">Создать</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalWrapper>
    )
}

export default CollectionModal;