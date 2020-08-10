import React, { useEffect, useState } from "react";
import BananoUser from "./BananoTab";
import NotFoundUser from "./NotFoundUser";
import { refreshTab } from "./helper";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
  const [agree, setAgree] = useState(localStorage.getItem("agree"));

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
          <p>{chrome.i18n.getMessage("extDescription")}{chrome.i18n.getMessage("msg_Disclaimer")}</p>

          <button onClick={isAgree}>{chrome.i18n.getMessage("btn_Accept")}</button>
        </section>
      </>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <BananoUser user={JSON.parse(localStorage.getItem("user"))} />
          </Route>
          <Route path="/not-found" component={NotFoundUser} />
        </Switch>
      </Router>
    </>
  );
};
