const part = {
    "сущ": "noun",
    "гл": "verb",
    "прил": "adjective",
    "нареч": "adverb",
    "прич": "participle",
    "дееприч": "participle",
    "межд": "interjection",
    "числ": "numeral"
};

export const formatPartOfSpeech = (data) => {
    return part[data] !== null ? part[data] : "";
}