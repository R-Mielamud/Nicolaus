import React from "react";
import { NotificationContainer } from "react-notifications";
import { Provider as ReduxProvider } from "react-redux";
import { Router } from "react-router";
import history from "../../helpers/history.helper";
import store from "../../redux/store";
import Routing from "../Routing";

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <Router history={history}>
                <NotificationContainer />
                <Routing />
            </Router>
        </ReduxProvider>
    );
};

export default App;
