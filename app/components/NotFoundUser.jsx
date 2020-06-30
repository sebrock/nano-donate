import React from "react";

const NotFoundUser = () => {
  return (
    <div className="styleOfError">
      {chrome.i18n.getMessage("err_notRegist")}
    </div>
  );
};

export default NotFoundUser;
