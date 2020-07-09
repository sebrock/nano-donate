import React, { useState } from "react";

const NotFoundUser = () => {
  return (
    <div className="styleOfError">
      {chrome.i18n.getMessage("err_notRegist")}
      <a
        href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate"
        target="_blank"
      >
        {chrome.i18n.getMessage("msg_ClickHere")}
      </a>
      <br />
      <br />
      {chrome.i18n.getMessage("msg_NotRegist_NotOwner_1")}
      <a
        href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate"
        target="_blank"
      >
        {chrome.i18n.getMessage("msg_NotRegist_NotOwner_2")}
      </a>
      {chrome.i18n.getMessage("msg_NotRegist_NotOwner_3")}
      <br />
      <div className="fake__textarea">
        ${chrome.i18n.getMessage("msg_NotRegist_NotOwner_4")}
        <a
          href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate"
          target="_blank"
        >
          {chrome.i18n.getMessage("msg_ClickHere")}
        </a>
        <br />
        <br />${chrome.i18n.getMessage("msg_NotRegist_NotOwner_5")}
      </div>
    </div>
  );
};

export default NotFoundUser;
