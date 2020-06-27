import React, { useEffect, useState } from "react";
import BananoUser from "./BananoTab";

export const App = () => {
  const [agree, setAgree] = useState(localStorage.getItem("agree"));
  const [userPage, setUser] = useState({});

  const isAgree = () => {
    localStorage.setItem("agree", true);
    setAgree(true);
  };

  if (!agree) {
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
      <BananoUser user={JSON.parse(localStorage.getItem("user"))} />
    </>
  );
};
