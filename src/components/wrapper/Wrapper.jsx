import Footer from "../footer/Footer";
import Header from "../header/Header";

import "./wrapper.scss";

const Wrapper = (props) => {
    return (
        <>
            <div className="wrapper">
                <div className="content">
                    <Header />
                    {props.children}
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Wrapper;