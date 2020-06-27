import ReactDOM from "react-dom";
import React from "react";
const App = () => {
  return <p>{chrome.i18n.getMessage("hello")} webpack extension</p>;
};

ReactDOM.render(<App />, document.querySelector(".root"));
