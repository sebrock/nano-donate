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
  const [addressCopy, setCopy] = useState(false);

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
      <section className={`main__user-page ${qrBan && `ban--amount`}`}>
        {!qrBan ? (
          <img
            src="../../images/icon128.png"
            className="pepe--user"
            style={{ display: qrBan ? `none` : `block` }}
          />
        ) : (
          <h1 className="qrcode--title">
            Scan QR code with Kalium to send donation to send manually
          </h1>
        )}

        <section className={`main__user--section ${qrBan && `ban--amount`}`}>
          {!qrBan ? (
            <>
              <h1>Donate BAN to the current website:</h1>
              <h2>{userpage ? userpage.title : null}</h2>
            </>
          ) : (
            <img
              src="../../images/icon128.png"
              className="pepe--user qr--code"
            />
          )}
          {qrBan && <QrCode qrBan={qrBan} addressCopy={addressCopy} />}
          {entries.map((user, index) => {
            if (!qrBan)
              return (
                <form
                  key={index}
                  onSubmit={(e) => sendBananas(e, user.address)}
                >
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
        {qrBan && (
          <AddressUser
            address={entries[0].address}
            setCopy={setCopy}
            wasCopied={addressCopy}
          />
        )}
      </section>
    </>
  );
};
export default BananoUser;

const AddressUser = ({ address, setCopy, wasCopied }) => {
  return (
    <>
      <div className="user--address">
        <a
          href={`https://creeper.banano.cc/explorer/account/${address}/history`}
          target="_blank"
        >
          <p>{address}</p>
        </a>
        <CopyToClipboard text={address} onCopy={() => setCopy(!wasCopied)}>
          <img
            src="../../images/copy-clip.png"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </CopyToClipboard>
      </div>
    </>
  );
};

const QrCode = ({ qrBan, addressCopy }) => {
  return (
    <section class="qrcode--section">
      <img src={qrBan} className="qrcode--user" />
      {addressCopy ? (
        <p
          className={`copy ${addressCopy && `done`}`}
        >{`Ban Address copied`}</p>
      ) : (
        ``
      )}
    </section>
  );
};
