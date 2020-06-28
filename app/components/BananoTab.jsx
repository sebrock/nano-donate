import React, { useState } from "react";
import { getSendURI } from "banano-uri-generator";
import QRCode from "qrcode";
import { useHistory } from "react-router-dom";

const BananoUser = ({ user, ...props }) => {
  const [userpage, setUserPage] = useState({});
  const [banValue, setBanValue] = useState(0);
  const history = useHistory();
  const [entries, setEntries] = useState([{}]);
  const [qrBan, setQR] = useState("");
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    try {
      const userTab = user[tabs[0].id];
      if (userTab) {
        const { banActive, bananoDonateEntries } = userTab;
        if (!banActive) {
          console.log("bateu aqui tb");
          history.push("/not-found");
        }
        if (bananoDonateEntries) {
          setUserPage(user[tabs[0].id]);
          setEntries(bananoDonateEntries);
        }
      }
    } catch (e) {
      console.log(e);
      history.push("/not-found");
    }
  });

  const sendBananas = (e, banAddress) => {
    e.preventDefault();
    console.log(getSendURI(banAddress, banValue));
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
