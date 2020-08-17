import React, { useState, useEffect, useCallback, useContext } from "react";
import NotFoundUser from "../NotFoundUser";
import { useHistory } from "react-router";
import { BanFamContext } from "../context/BananoContext";

const BananoTab = ({ user }) => {
  const { banUser, dispatchBanUser } = useContext(BanFamContext);
  const [activeBan, setActiveBan] = useState(false);
  const [banAmount, setBanAmount] = useState({});
  const history = useHistory();

  const promiseGetTab = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        try {
          const userTab = user[tabs[0].id];
          if (userTab) {
            const { banActive, bananoDonateEntries } = userTab;
            setActiveBan(banActive);
            if (bananoDonateEntries) {
              resolve(userTab);
            }
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  };

  const addTabData = async () => {
    try {
      const data = await promiseGetTab();
      data.bananoDonateEntries.forEach(
        (tab) =>
          tab.addressOwner === "This web page" &&
          (tab.addressOwner = data.title)
      );
      dispatchBanUser({ type: "ADD_USER_PAGE", payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getTabData = useCallback(async () => {
    await addTabData();
  }, []);

  useEffect(() => {
    getTabData();
    return () => {};
  }, [getTabData]);

  if (!activeBan) {
    return <NotFoundUser />;
  }
  const setAmount = (index, amount, oldValues = banAmount) => {
    const copiedValues = { ...oldValues };

    copiedValues[index] = parseFloat(amount) || null;

    setBanAmount(copiedValues);
  };

  const changeAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.name, e.target.value);
  };

  return (
    <>
      <section className={`main__user-page`}>
        <img src="../../images/icon128.png" className="pepe--user" />
        <section className={`main__user--section`}>
          <>
            <h1>{chrome.i18n.getMessage("msg_DonCurrPage")}</h1>
          </>
          {banUser.userPage &&
            banUser.userPage.bananoDonateEntries.map((user, index) => {
              return (
                <div key={index}>
                  <h2>
                    {banUser.userPage
                      ? banUser.userPage.bananoDonateEntries[index].addressOwner
                      : null}
                  </h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatchBanUser({
                        type: "ACTIVE_USER",
                        payload: index,
                      });
                      history.push("/user", {
                        banAmount: banAmount[`address-owner-${index}`],
                      });
                    }}
                  >
                    <section className="user__form-tip">
                      <input
                        className="styleOfInput"
                        type="text"
                        name={`address-owner-${index}`}
                        value={banAmount[`address-owner-${index}`]}
                        onChange={changeAmount}
                        placeholder={chrome.i18n.getMessage(
                          "msg_EnterTipAmount"
                        )}
                      />
                      <button
                        type="submit"
                        className="button--donate__start"
                        disabled={
                          0 > banAmount[`address-owner-${index}`] ? true : false
                        }
                      >
                        {chrome.i18n.getMessage("msg_ClickHere")}
                      </button>
                    </section>
                  </form>
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <DonateButton
                      set={setAmount}
                      index={`address-owner-${index}`}
                      value={"19"}
                    />
                    <DonateButton
                      set={setAmount}
                      index={`address-owner-${index}`}
                      value={"123"}
                    />
                    <DonateButton
                      set={setAmount}
                      index={`address-owner-${index}`}
                      value={"1042"}
                    />
                    <DonateButton
                      set={setAmount}
                      index={`address-owner-${index}`}
                      value={"1923"}
                    />
                  </div>
                </div>
              );
            })}
        </section>
      </section>
    </>
  );
};
export default BananoTab;

function DonateButton({ set, index, value }) {
  return (
    <button
      className="button--donate__auto"
      onClick={(e) => {
        e.preventDefault();
        set(index, value);
      }}
    >
      {value} BAN
    </button>
  );
}
