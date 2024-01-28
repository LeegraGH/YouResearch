import Lottie from "lottie-react";
import loading from "./loading.json";

const Spinner = ({ size = "335px" }) => {
    return <Lottie style={{ width: `${size}`, margin: "0 auto" }} animationData={loading} loop={true} />;
}

export default Spinner;