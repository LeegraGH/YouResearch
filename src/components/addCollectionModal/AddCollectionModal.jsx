import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useLocation} from "react-router-dom";

import {useCreateCollectionMutation, useGetCollectionsQuery} from '../../redux/slices/apiSlice';

import "./addCollectionModal.scss";
import {useEffect} from 'react';

const AddCollectionModal = ({hideModal}) => {

    let location = useLocation();

    const {data: collections = []} = useGetCollectionsQuery();
    const [addCollection] = useCreateCollectionMutation();

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', hideModal);
        }, 500);

        return () => document.removeEventListener('click', hideModal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmitCollection = (collection) => {
        addCollection(collection);
        hideModal();
    }

    return (
        <div className="collection__modal" onClick={(e) => e.stopPropagation()}>
            <div className="close">
                <i className="fa-solid fa-xmark" onClick={hideModal}></i>
            </div>
            <Formik
                initialValues={{title: "", public: false}}
                validate={values => {
                    const errors = {};

                    let titleAvaliable = true;

                    for (let i = 0; i < collections.length; i++) {
                        if (collections[i].title === values.title) {
                            titleAvaliable = false;
                            break;
                        }
                    }

                    if (!values.title) {
                        errors.title = "Обязательное поле!";
                    } else if (values.title.length < 2) {
                        errors.title = "Минимальная длина - 2 символа!";
                    } else if (values.title.length > 25) {
                        errors.title = "Максимальная длина - 25 символов!";
                    } else if (!titleAvaliable) {
                        errors.title = "Коллекция с таким названием уже существует!";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    onSubmitCollection(values);
                }}
            >
                {() => (
                    <Form className={`create__block ${location.pathname === "/dictionary" ? "change-color" : null}`}>
                        <div className="title_input">
                            <Field type="text" name="title" id="title" placeholder="Введите название коллекции"/>
                            <ErrorMessage className="title_input__error" name="title" component="span"/>
                        </div>
                        <div className="public_input">
                            <span>Публичная коллекция</span>
                            <Field type="checkbox" id="public" name="public"/>
                            <label htmlFor="public" className="public_label"></label>
                        </div>
                        <button type="submit" className="btn">Создать</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddCollectionModal;