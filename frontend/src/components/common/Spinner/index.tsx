import React from "react";
import { useTranslation } from "react-i18next";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Dimmer inverted active>
            <Loader size="massive" content={t("loading")} />
        </Dimmer>
    );
};

export default Spinner;
