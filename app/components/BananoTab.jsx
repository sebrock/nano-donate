import React, { useState } from "react";
import { getSendURI } from "banano-uri-generator";
import QRCode from "qrcode";

const BananoUser = ({ user }) => {
  const [userpage, setUserPage] = useState({});
  const [banValue, setBanValue] = useState({});

  const [entries, setEntries] = useState([{}]);
  const [qrBan, setQR] = useState("");
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const { bananoDonateEntries } = user[tabs[0].id];
    setUserPage(user[tabs[0].id]);
    setEntries(bananoDonateEntries);
    console.log(tabs[0].id);
  });

  const sendBananas = (e, banAddress) => {
    e.preventDefault();

    QRCode.toDataURL(
      getSendURI(banAddress, banValue, `Banano donate tip`),
      {
        type: "svg",
      },
      function (error, value) {
        if (value) {
          setQR(value);
        }
      }
    );
  };

  return (
    <>
      <section>
        <p>Donate to the current page:</p>
        <p style={{ fontWeight: "bold" }}>{userpage.url}</p>
        {qrBan ? <img src={qrBan} /> : null}
        {entries.map((user, index) => {
          return (
            <form key={index} onSubmit={(e) => sendBananas(e, user.address)}>
              <section className="user__form-tip">
                <h3>$BAN:</h3>
                <input
                  type="text"
                  onChange={(e) => setBanValue(e.target.value)}
                  placeholder={`Enter amount of Banano to tip`}
                />
                <button type="submit">Send BAN!</button>
              </section>
            </form>
          );
        })}
      </section>
    </>
  );
};
export default BananoUser;
