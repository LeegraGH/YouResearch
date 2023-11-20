import Lottie from "lottie-react";
import loading from "./loading.json";

const Spinner = () => {
    return <Lottie style={{ width: '335px', margin: "0 auto" }} animationData={loading} loop={true} />;
}

export default Spinner;