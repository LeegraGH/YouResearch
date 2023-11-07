import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Wrapper from "../wrapper/Wrapper";
import { HomePage, DictionaryPage, Page404 } from "../pages";

import "../../styles/style.scss";

const App = () => {
    return (
        <Router>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dictionary" element={<DictionaryPage />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Wrapper>
        </Router>
    )
}

export default App;
