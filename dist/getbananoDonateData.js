var bananoDonateEntries = [];

// Search for 'banano-donate' tags in document
Array.from(document.getElementsByTagName("nano-donate")).map(function (
  nanoDonateTag
) {
  let title = nanoDonateTag.getAttribute("data-title");
  let image = nanoDonateTag.getAttribute("data-image");
  let role = nanoDonateTag.getAttribute("data-role");
  let address = nanoDonateTag.getAttribute("data-address");
  let addressOwner = nanoDonateTag.getAttribute("data-address-owner");

  // Add to array of Nano addresses if Nano address and owner name are found
  if (/^(ban)[13][13-9a-km-uw-z]{59}$/.test(address) && addressOwner) {
    bananoDonateEntries.push({
      title,
      image,
      role,
      address,
      addressOwner,
    });
  }
});

// Search for 'banano' meta tag in document
Array.from(document.getElementsByTagName("meta")).filter(function (metaTag) {
  if (metaTag.getAttribute("name") === "banano") {
    console.log(metaTag);
    let bananoAddress = metaTag.getAttribute("content");
    if (/^ban$/.test(bananoAddress)) {
      bananoDonateEntries.push({
        metaTag: true,
        address: bananoAddress,
        addressOwner: "This web page",
      });
    }
  }
})[0];

chrome.runtime.sendMessage({ bananoDonateEntries });
