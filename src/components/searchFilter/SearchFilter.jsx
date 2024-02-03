import {useEffect, useState} from "react";

import "./searchFilter.scss";

const SearchFilter = (props) => {

    const [word, setWord] = useState("");

    useEffect(() => {
        props.onLoadFilter("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadFilter = (e) => {
        const word = (e.target.value).toLowerCase();
        setWord(word);
        props.onLoadFilter(word);
    }

    return (
        <div className="search-filter" style={props.styles}>
            <input onChange={onLoadFilter} value={word} name="search_filter" type="text"
                   placeholder={props.placeholderName}/>
        </div>
    )
}

export default SearchFilter;