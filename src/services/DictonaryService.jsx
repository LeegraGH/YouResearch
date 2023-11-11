import useHttp from "../hooks/http.hook";

const useDictionaryService = () => {
    const { request } = useHttp();

    const _apiBase = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
    const _apiKey = "dict.1.1.20231031T083947Z.5f79d647fc51783e.87829ca645818d98e8d92d34b9cfc8748bcfa2f3";

    const getDictionaryEntry = async (data, lang = "en-ru") => {
        const res = await request(`${_apiBase}?key=${_apiKey}&lang=${lang}&text=${data}`);

        return res.def;
    }

    // const _transformDictonaryEntry 

    return { getDictionaryEntry };
}

export default useDictionaryService;