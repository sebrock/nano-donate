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
          <h3>Thank you for installing BananoDonate!</h3>
          <p>
            <span>BananoDonate</span> is the easiest way to make Banano
            currency donations to participating websites.
			While every possible effort has been made to ensure BananoDonate works securely please make sure to double-check all outgoing amounts from your wallet when making a donation. Test with a tiny donation amount first if you want peace of mind. The authors of this extension are not liable for any loss or damage arising directly or indirectly through use of this extension.
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
