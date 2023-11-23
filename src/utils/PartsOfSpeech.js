const part = {
    "сущ": "noun",
    "гл": "verb",
    "прил": "adjective",
    "нареч": "adverb",
    "прич": "participle",
    "дееприч": "participle",
    "межд": "interjection",
    "числ": "numeral",
    "неизм": "invariable",
    "мест": "pronoun",
    "част": "particle",
    "союз": "conjunction",
    "предик": "predicative",
    "предл": "preposition",
    "часть": "part",
};

export const formatPartOfSpeech = (data) => {
    return part[data] !== null ? part[data] : "";
}