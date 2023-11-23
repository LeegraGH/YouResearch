const enAlphabet = "abcdefghijklmnopqrstuvwxyz";

export const detectLanguage = (word) => {
    if (enAlphabet.includes(word[0])) {
        return "en-ru";
    } else return "ru-en";
}

export const isEnglish = (word) => {
    return enAlphabet.includes(word[0]);
}