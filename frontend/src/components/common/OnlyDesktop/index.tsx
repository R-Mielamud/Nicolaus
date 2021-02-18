import React from "react";
import isMobile from "../../../helpers/mobile.helper";

const OnlyDesktop: React.FC = ({ children }) => {
    const mobile = isMobile();

    if (mobile) {
        return null;
    }

    return <>{children}</>;
};

export default OnlyDesktop;
