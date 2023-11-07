
import "./searchForm.scss";

const SearchForm = () => {
    return (
        <form className='search-word' action="">
            <input type="text" placeholder='Какое слово исследуем сегодня?' />
            <button type="submit">Исследовать</button>
        </form>
    )
}

export default SearchForm;