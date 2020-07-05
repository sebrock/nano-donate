import React from "react";

const NotFoundUser = () => {
  return (
    <div className="styleOfError">
      {chrome.i18n.getMessage("err_notRegist")}
	  <a href='https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate' target='_blank'>Click here</a>
    </div>
  );
};

export default NotFoundUser;
