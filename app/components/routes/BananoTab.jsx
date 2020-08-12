import React, { useState, useEffect, useReducer } from "react";
import NotFoundUser from "../NotFoundUser";
import { UserReducer, initialState } from "../reducers";
import { useHistory } from "react-router";

const BananoTab = ({ user, ...props }) => {
  const [userTabPage, setUserPage] = useState({});
  const [activeBan, setActiveBan] = useState(false);
  const [banAmount, setBanAmount] = useState({});
  const [UserBan, dispatchUser] = useReducer(UserReducer, initialState);
  const history = useHistory();

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    try {
      const userTab = user[tabs[0].id];
      if (userTab) {
        const { banActive, bananoDonateEntries } = userTab;
        setActiveBan(banActive);
        if (bananoDonateEntries) {
          setUserPage(userTab);
        }
      }
    } catch (e) {
      console.log(e);
      history.push("/not-found");
    }
  });

  useEffect(() => {
    if (Object.keys(userTabPage).length !== 0) {
      userTabPage.bananoDonateEntries.forEach(
        (tab) =>
          tab.addressOwner === "This web page" &&
          (tab.addressOwner = userTabPage.title)
      );
      dispatchUser({ type: "ADD_USER_PAGE", payload: userTabPage });
    }

    return () => {};
  }, [userTabPage]);

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
          {UserBan.userPage &&
            UserBan.userPage.bananoDonateEntries.map((user, index) => {
              return (
                <>
                  <h2>
                    {UserBan.userPage
                      ? UserBan.userPage.bananoDonateEntries[index].addressOwner
                      : null}
                  </h2>

                  <form
                    key={index}
                    onSubmit={(e) => {
                      e.preventDefault();
                      history.push("/user", {
                        index: index,
                        user: UserBan.userPage.bananoDonateEntries[index],
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
                </>
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
