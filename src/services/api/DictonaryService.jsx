import useHttp from "../../hooks/http.hook";

const useDictionaryService = () => {
    const { request } = useHttp();

    const _apiBase = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
    const _apiKey = "dict.1.1.20231031T083947Z.5f79d647fc51783e.87829ca645818d98e8d92d34b9cfc8748bcfa2f3";

    const getDictionaryEntry = async (data, lang) => {
        const ui = lang.slice(0, 2);
        const flags = ui === "ru" ? 10 : 8;
        const res = await request(`${_apiBase}?key=${_apiKey}&lang=${lang}&ui=${ui}&flags=${flags}&text=${data}`);

        return _transformDictonaryEntry(res.def);
    }

    const _transformDictonaryEntry = (data) => {
        const res = data.map(entry => {
            const translations = entry.tr.filter(tr => tr.fr >= 5).map(tr => {
                const synonyms = tr.syn?.filter(syn => syn.fr >= 5);
                if (synonyms !== undefined) {
                    return { ...tr, syn: synonyms }
                } else return { ...tr, syn: [] };
            });

            const pos = entry.pos!==undefined?entry.pos:"undefined";

            return translations.length > 0 ? { ...entry, tr: translations, pos } : null;
        }).filter(entry => entry !== null);

        return res;
    }

    return { getDictionaryEntry };
}

export default useDictionaryService;