import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner: React.FC = () => {
    return (
        <Dimmer inverted active>
            <Loader size="massive" />
        </Dimmer>
    );
};

export default Spinner;
