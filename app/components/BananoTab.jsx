import React, { useState, useEffect } from "react";
import { getSendURI } from "banano-uri-generator";
import QRCode from "qrcode";
import BigNumber from "bignumber.js";
import NotFoundUser from "./NotFoundUser";
import { CopyToClipboard } from "react-copy-to-clipboard";

BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });

const BananoUser = ({ user, ...props }) => {
  const [userpage, setUserPage] = useState({});
  const [banValue, setBanValue] = useState();
  const [activeBan, setActiveBan] = useState(false);
  const [entries, setEntries] = useState([{}]);
  const [qrBan, setQR] = useState("");

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs);
    try {
      console.log(tabs[0].id);
      const userTab = user[tabs[0].id];
      if (userTab) {
        const { banActive, bananoDonateEntries } = userTab;
        setActiveBan(banActive);
        if (bananoDonateEntries) {
          setUserPage(userTab);
          setEntries(bananoDonateEntries);
        }
      }
    } catch (e) {
      console.log(e);
      history.push("/not-found");
    }
  });

  const convertUnitBan = (value) => {
    //multiply number by ten then multiply to 10**28
    let data = Number(value * 10) * Math.pow(10, 28);
    return BigNumber(data).toFixed();
  };

  const sendBananas = (e, banAddress) => {
    e.preventDefault();
    QRCode.toDataURL(
      getSendURI(banAddress, convertUnitBan(banValue), `BananoDonate tip`),
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

  if (!activeBan) {
    return <NotFoundUser />;
  }

  return (
    <>
      <section className="main__user-page">
        <img src="../../images/icon128.png" className="pepe--user"></img>
        <section className="main__user--section">
          {!qrBan ? (
            <>
              <h1>Donate BAN to the current website:</h1>
              <h2>{userpage ? userpage.title : null}</h2>
            </>
          ) : (
            <h1 className="qrcode--title">
              Scan QR code with Kalium to send donation
            </h1>
          )}
          {qrBan ? <img src={qrBan} className="qrcode--user" /> : null}
          {entries.map((user, index) => {
            if (qrBan) {
              return <AddressUser address={user.address} />;
            }
            return (
              <form key={index} onSubmit={(e) => sendBananas(e, user.address)}>
                <section className="user__form-tip">
                  <input
                    className="styleOfInput"
                    type="text"
                    value={banValue}
                    onChange={(e) =>
                      e.target.value > 0
                        ? setBanValue(e.target.value)
                        : setBanValue("")
                    }
                    placeholder={`Enter donation amount`}
                  />
                  <button type="submit">Create QR code</button>
                </section>
              </form>
            );
          })}
        </section>
      </section>
    </>
  );
};
export default BananoUser;

const AddressUser = ({ address }) => {
  const [addressCopy, setCopy] = useState(false);
  return (
    <>
      <p className={`copy ${addressCopy && `done`}`}>{`Ban Address copied`}</p>
      <div className="user--address">
        <a
          href={`https://creeper.banano.cc/explorer/account/${address}/history`}
        >
          <p>{address}</p>
        </a>
        <CopyToClipboard text={address} onCopy={() => setCopy(!addressCopy)}>
          <img
            src="../../images/copy-clip.png"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </CopyToClipboard>
      </div>
    </>
  );
};
