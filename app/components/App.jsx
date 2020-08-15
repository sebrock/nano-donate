import React, { useState, useEffect, useReducer } from "react";
import BananoTab from "./routes/BananoTab";
import NotFoundUser from "./NotFoundUser";
import { refreshTab } from "./helper";
import BananoUser from "./routes/BananoUser";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { BanFamContext } from "./context/BananoContext";
import { initialState, UserReducer } from "./reducers";

export const App = () => {
  const [agree, setAgree] = useState(localStorage.getItem("agree"));
  const [banUser, dispatchBanUser] = useReducer(UserReducer, initialState);

  const isAgree = () => {
    localStorage.setItem("agree", true);
    setAgree(true);
  };

  if (!agree) {
    refreshTab();
    return (
      <>
        <section>
          <h3>{chrome.i18n.getMessage("msg_ThxInst")}</h3>
          <p>
            {chrome.i18n.getMessage("extDescription")}
            {chrome.i18n.getMessage("msg_Disclaimer")}
          </p>

          <button onClick={isAgree}>
            {chrome.i18n.getMessage("btn_Accept")}
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <Router>
        <BanFamContext.Provider value={{ banUser, dispatchBanUser }}>
          <Switch>
            <Route exact path="/">
              <BananoTab user={JSON.parse(localStorage.getItem("user"))} />
            </Route>
            <Route exact path="/user">
              <BananoUser />
            </Route>
            <Route path="/not-found" component={NotFoundUser} />
          </Switch>
        </BanFamContext.Provider>
      </Router>
    </>
  );
};
