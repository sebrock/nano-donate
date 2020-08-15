import React, { useState, useEffect, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode";
import { getSendURI } from "banano-uri-generator";
import { convertBanToRaw } from "../helper";
import { BanFamContext } from "../context/BananoContext";

import { useLocation } from "react-router-dom";

const BananoUser = (props) => {
  const { banUser } = useContext(BanFamContext);
  const { address, addressOwner } = banUser.userPage[0];
  const data = useLocation();
  const { banAmount } = data.state;

  const [addressCopy, setCopy] = useState(false);
  const [qrBan, setQR] = useState("");

  useEffect(() => {
    console.log(banUser);
    sendBananas(address, data.state.banAmount);
  }, [address]);
  const sendBananas = (banAddress, banAmount) => {
    QRCode.toString(
      getSendURI(banAddress, convertBanToRaw(banAmount), `BananoDonate tip`),
      {
        type: "svg",
      },
      function (error, value) {
        if (value) {
          console.log(value);
          setQR(value);
        }
      }
    );
  };

  return (
    <>
      <section style={{ display: "flex", flexDirection: "column" }}>
        <h1 className="qrcode--title">
          You are about to donate {banAmount} BAN to {addressOwner}
        </h1>
        <a
          href={`https://vault.banano.cc/send?to=${address}&amount=${banAmount}`}
          target="_blank"
          className="button--donate"
        >
          <button>Banano Vault</button>
        </a>
      </section>
      <section className={`main__user--section ban--amount`}>
        <img src="../../images/icon128.png" className="pepe--user qr--code" />
        <QrCodeArea qrBan={qrBan} addressCopy={addressCopy} />
      </section>
      <AddressUser
        address={address}
        setCopy={setCopy}
        wasCopied={addressCopy}
      />
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

const QrCodeArea = ({ qrBan, addressCopy }) => {
  return (
    <section className="qrcode--section">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(qrBan)}`}
        width="150"
      />
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
