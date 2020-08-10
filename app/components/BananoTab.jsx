import React, { useState, useEffect } from "react";
import { getSendURI } from "banano-uri-generator";
import QRCode from "qrcode";
import NotFoundUser from "./NotFoundUser";
import { convertBanToRaw } from "./helper";
import { CopyToClipboard } from "react-copy-to-clipboard";

const BananoTab = ({ user, ...props }) => {
  const [userpage, setUserPage] = useState({});
  const [banValue, setBanValue] = useState();
  const [activeBan, setActiveBan] = useState(false);
  const [entries, setEntries] = useState([{}]);
  const [qrBan, setQR] = useState("");
  const [addressCopy, setCopy] = useState(false);

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    try {
      console.log(user);

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

  const sendBananas = (e, banAddress) => {
    e.preventDefault();

    QRCode.toDataURL(
      getSendURI(banAddress, convertBanToRaw(banValue), `BananoDonate tip`),
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
          <section style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="qrcode--title">
              You are about to donate {banValue} BAN to {userpage.title}
            </h1>
            <h2>{userpage ? userpage.title : null}</h2>
            <a
              href={`https://vault.banano.cc/send?to=${entries[0].address}&amount=${banValue}`}
              target="_blank"
              className="button--donate"
            >
              <button>Banano Vault</button>
            </a>
          </section>
        )}

        <section className={`main__user--section ${qrBan && `ban--amount`}`}>
          {!qrBan ? (
            <>
              <h1>{chrome.i18n.getMessage("msg_DonCurrPage")}</h1>
              <h2>{userpage ? userpage.title : null}</h2>
            </>
          ) : (
            <img
              src="../../images/icon128.png"
              className="pepe--user qr--code"
            />
          )}
          {qrBan && <QrCodeArea qrBan={qrBan} addressCopy={addressCopy} />}
          {entries.map((user, index) => {
            if (!qrBan && index === 0)
              return (
                <>
                  <form
                    key={index}
                    onSubmit={(e) => sendBananas(e, user.address)}
                  >
                    <section className="user__form-tip">
                      <input
                        className="styleOfInput"
                        type="text"
                        value={banValue}
                        onChange={(e) => {
                          let data =
                            parseFloat(e.target.value) > 0
                              ? e.target.value.replace(",", ".")
                              : "";
                          setBanValue(data);
                        }}
                        placeholder={"EnterTipAmount-NOT-I18N"}
                      />
                      <button
                        type="submit"
                        className="button--donate__start"
                        disabled={banValue > 0 ? false : true}
                      >
                        {chrome.i18n.getMessage("msg_ClickHere")}
                      </button>
                    </section>
                  </form>
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <DonateButton set={setBanValue} value={"19"} />
                    <DonateButton set={setBanValue} value={"123"} />
                    <DonateButton set={setBanValue} value={"1042"} />
                    <DonateButton set={setBanValue} value={"1923"} />
                  </div>
                </>
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
export default BananoTab;

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

const QrCodeArea = ({ qrBan, addressCopy }) => {
  return (
    <section className="qrcode--section">
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

function DonateButton({ set, value }) {
  return (
    <button
      className="button--donate__auto"
      onClick={(e) => {
        e.preventDefault();
        set(value);
      }}
    >
      {value} BAN
    </button>
  );
}
