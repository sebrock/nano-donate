import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BanFamContext } from "../context/BananoContext";
import { useLocation } from "react-router-dom";

const BananoUser = (props) => {
  const { banUser } = useContext(BanFamContext);
  const { address, addressOwner } = banUser.userPage[0];
  const data = useLocation();
  const { banAmount } = data.state;

  const [addressCopy, setCopy] = useState(false);

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
        <QrCodeArea
          addressCopy={addressCopy}
          banAddress={address}
          banAmount={banAmount}
        />
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

const QrCodeArea = ({ addressCopy, banAddress, banAmount }) => {
  return (
    <section className="qrcode--section">
      <img
        src={`https://banano.id/pay/api2.php?wallet=${banAddress}&amount=${banAmount}`}
        width="215"
        className="animate-qr"
        lazy
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
