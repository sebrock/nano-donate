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
          <h3>Thank you for installing Banano Donate!</h3>
          <p>
            <span>Banano Donate</span> is the easiest way to make Banano
            currency donations to participating websites.
          </p>

          <button onClick={isAgree}>I agree</button>
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
