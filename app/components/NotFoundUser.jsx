import React from "react";

const NotFoundUser = () => {
  return (
    <div className="styleOfError">
      {chrome.i18n.getMessage("err_notRegist")}
	  <a href='https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate' target='_blank'>{chrome.i18n.getMessage("msg_ClickHere")}</a></br></br>
	  {chrome.i18n.getMessage("msg_NotRegist_NotOwner_1")}
	  <a href='https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate' target='_blank'>{chrome.i18n.getMessage("msg_NotRegist_NotOwner_2")}</a>{chrome.i18n.getMessage("msg_NotRegist_NotOwner_3")}</br>
	  <textarea rows="12" cols="52">
	  {chrome.i18n.getMessage("msg_NotRegist_NotOwner_4")} <a href='https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate' target='_blank'>{chrome.i18n.getMessage("msg_ClickHere")}</a></br></br>
	  {chrome.i18n.getMessage("msg_NotRegist_NotOwner_4")}</textarea>
	  </div>
  );
};

export default NotFoundUser;