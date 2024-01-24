import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";

import { fetchWord } from "../../redux/slices/wordSlice";
import { detectLanguage } from "../../utils/Alphabet";

import "./searchForm.scss";

const SearchForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    const onSubmitWord = (word) => {
        const lang = detectLanguage(word.toLowerCase());
        dispatch(fetchWord({ word, lang }));
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
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmitWord(values.word);
                setSubmitting(false);
                if (location.pathname === "/") navigate("/dictionary");
                resetForm();
            }}>
            {({ isSubmitting }) => (
                <Form className="search-word">
                    <div className="word__block">
                        <Field type="text" name="word" placeholder="Какое слово исследуем сегодня?" />
                        {location.pathname === "/" ? <ErrorMessage name="word" component="div" className="word__block__error" /> : null}
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Исследовать
                    </button>
                </Form>
            )}
        </Formik >
    )
}

export default SearchForm;