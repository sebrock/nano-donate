let bananoDonateEntries = [];
// Search for 'nano-donate' tags in document
Array.from(document.getElementsByTagName("banano-donate")).map(function (
  nanoDonateTag
) {
  let title = nanoDonateTag.getAttribute("data-title");
  let image = nanoDonateTag.getAttribute("data-image");
  let role = nanoDonateTag.getAttribute("data-role");
  let address = nanoDonateTag.getAttribute("data-address");
  let addressOwner = nanoDonateTag.getAttribute("data-address-owner");

  // Add to array of Nano addresses if Nano address and owner name are found
  if (/^(ban_)[13][13-9a-km-uw-z]{59}$/.test(address) && addressOwner) {
    bananoDonateEntries.push({
      title,
      image,
      role,
      address,
      addressOwner,
    });
  }
});

// Search for 'nano' meta tag in document
Array.from(document.getElementsByTagName("meta")).filter(function (metaTag) {
  if (metaTag.getAttribute("name") === "banano") {
    let bananoAddress = metaTag.getAttribute("content");
    let contentOwner = metaTag.getAttribute("content-creator") || null;
    if (/^(ban_)[13][13-9a-km-uw-z]{59}$/.test(bananoAddress)) {
      bananoDonateEntries.push({
        metaTag: true,
        address: bananoAddress,
        addressOwner: contentOwner ? contentOwner : "This web page",
      });
    }
  }
});

chrome.runtime.sendMessage({ bananoDonateEntries });
