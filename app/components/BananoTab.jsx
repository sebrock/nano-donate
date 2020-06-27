import React, { useState } from "react";

const BananoUser = ({ user }) => {
  const [userpage, setUserPage] = useState({});
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    setUserPage(user[tabs[0].id]);
    console.log(userpage);
  });

  return (
    <section>
      <p>Donate to this current page:</p>
      <p>{userpage.url}</p>
      <input type="text" placeholder={`Enter amount of Banano to tip`} />
    </section>
  );
};
export default BananoUser;
