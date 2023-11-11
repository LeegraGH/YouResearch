import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";
import { fetchWord } from "../../redux/slices/wordSlice";

import "./searchForm.scss";

const SearchForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitWord = (word) => {
        dispatch(fetchWord(word));
        // console.log("hi");
    }

    return (
        <Formik
            initialValues={{ word: "" }}
            validate={values => {
                const errors = {};
                if (!values.word) {
                    errors.word = 'Введите любое слово или фразу, например: get/get out';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                onSubmitWord(values.word);
                setSubmitting(false);
                navigate("/dictionary");
            }}>
            {({ dirty, isSubmitting }) => (
                <Form className="search-word">
                    <div className="word__block">
                        <Field type="text" name="word" placeholder="Какое слово исследуем сегодня?" />
                        <ErrorMessage name="word" component="div" className="word__block__error" />
                    </div>
                    <button type="submit" disabled={!dirty || isSubmitting}>
                        Исследовать
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default SearchForm;