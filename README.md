## Welcome to BananoDonate 0.0.2

<!--- ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/pdnkikfbjfhikkpopfoaihhfbhaplpfc?label=chrome%20web%20store-users&style=plastic)
![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/pdnkikfbjfhikkpopfoaihhfbhaplpfc?label=chrome%20web%20store-rating&style=plastic) --->
![GitHub top language](https://img.shields.io/github/languages/top/sebrock/banano-donate?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sebrock/banano-donate?style=plastic)
![GitHub](https://img.shields.io/github/license/sebrock/banano-donate?style=plastic)
[![Discord](https://img.shields.io/badge/discord-join%20chat-orange.svg)](https://chat.banano.cc/)

![](./dist/images/icon302.png "Logo")

# What is it?
**Banano Donate** is a **Chrome Browser Extension** (also works on all Chromium-based browsers, e.g. Brave browser) which allows you to easily make [Banano currency](https://www.banano.cc) donations to participating websites. The website owner specifies the Banano donation address beforehand so you can just concentrate on making the donation.
It ~~is~~ will be available for download in all regions, and in 18 different languages covering 20 locales (locale identifiers in brackets):

  -  Arabic (ar)
  -  Danish (da)
  -  German (de)
  -  Greek (el)
  -  English - default (en)
  -  Spanish (es)
  -  Latin Amrican Spanish (es_419)
  -  Persian (fa)
  -  French (fr)
  -  Hindi (hi)
  -  Bahasa Indonesia (id)
  -  Italian (it)
  -  Japanese (ja)
  -  Dutch (nl)
  -  Norwegian (no)
  -  Brazilian Portuguese (pt_BR)
  -  Portuguese (pt_PT)
  -  Russian (ru)
  -  Turkish (tr)
  -  Chinese - Mandarin (zh_CN)


# How to install?
~~The extension can be downloaded in the Google Chrome Webstore by following [this link](TBD)~~
The extension has been submitted to the Google Chrome Webstore for review and publication.
Until it is listed, you can manually install and test the latest build as explained in the following section.

# Want to test the latest Development build?

## Step 1 Download from github
 Download the latest dev build from [tags in github](https://github.com/sebrock/banano-donate/releases/) (Download ZIP)

## Step 2 Enable Developer Mode in Chrome
Go to [chrome extensions](chrome://extensions) or for [Brave Browser](brave://extensions).
Turn on the Developer Mode in the top left corner of the Extensions page in Chrome. 

## Step 3 Unzip the downloaded release package 
Unzip to a folder on your HDD. This folder will be the main folder you select in step 4.

## Step 4 Load the extension into Chrome
You can now select the extension. That's pretty easy, you go to **load unpackaged**,  select the **/dist/** folder from your unzipped release and that´s it!


# How do I use it to make a donation?

You will now see the BananoDonate icon in the upper right corner of Chrome, next to the address bar.
If the site you are visiting **is already enabled to receive donations through BananoDonate**, the icon will be colored.
Click on it and you will see the extension window pop up, asking you to enter the amount of BAN you´d like to donate.

![](./dist/images/readme-md-1.png "Input screen")

Once you have entered the desired donation amount, click the "Create QR-Code" button.
You will see a QR-code which you can scan using [Kalium](https://kalium.banano.cc/) to send your donation.

![](./dist/images/readme-md-2.png "QR-Code screen")

Alternatively, you can copy the donation address and send your donation manually.
This option will be further simplified in the next version.

If you are visiting is **not yet enabled** to receive donations through BananoDonate, the icon will appear greyscaled.
When you click it though, you will see instructions how to make that happen.
(It links to this readme.)

# How can I receive donations through BananoDonate?
If you are a website owner and want to enable your site to receive donations through BananoDonate there are just 3 sinple steps to be completed.
This may be best done by your website administrator unless you are managing your website yourself and have a basic understanding of HTML.
## 1. Insert HTML meta tag into you main page´s header
The HTML meta tag below lets your users´ BananoDonate extension know where donations will be sent.
It need to be placed in the header section of your main landing page, typically `index.html`.

If you do not have a banano wallet yet, go [here](https://banano.how/where-does-it-come-from/) to find out how to get one.
Please replace the contents of the _content_ property with the banano address you want to receive the donations.

```html
 <meta name="banano"  content="ban_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"/>
 ```
## 2. Let your users know that they can donate to your site using BananoDonate
The extension can be downloaded in the Coogle Chrome Webstore by following [this link](TBD)

## 3. Put the BananoDonate logo on your page (optional)
You can give your visitors a hint that your site is enabled for BananoDonate by placing the following code on your page:

```html
<!-- Start Banano-donate logo -->
<a href="https://github.com/sebrock/banano-donate" target="_blank">
<img border="0" src ="https://github.com/sebrock/banano-donate/blob/banano-dev/dist/images/ban-don-logo.png" 
     title="This site can receive donations via Banano-donate"  alt="This site can receive donations via Banano-donate" 
     height="70"</img> </a>
<!-- End Banano-donate logo -->
 ```
The following image will be displayed:

![](./dist/images/ban-don-logo.png)

You can change the size by editing `height` or adding a `width` property. 


# How should I approach a website owner if I want them to enable them to receive donations via BananoDonate? 

If you are not the owner but still want to donate Banano try sending a kind email along with this <a href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate" target="_blank">link</a> to the website's owner through their contact page. You could use the following email template as a starting point:

```text
Hi [SITE_OWNER],

I love your website and was hoping to donate some Banano digital currency to you. 
However I noticed your website is not enabled for BananoDonate. 
It's very easy to get enabled and you can learn how to do so at the 
following link (no sign-up required): 
https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate

Thanks!
[YOUR_NAME]
```

# Sites enabled for Banano-Donate
The following sites are enabled to receive donations through banano-donate:
 - [http://sebrock19.de](http://sebrock19.de) - Banano Node and Node Monitor
 - [drinkwater.fr](https://drinkwater.fr/) - Iazid´s site
 - [maffsclub.com/](https://maffsclub.com/) - Maff´s site
 - [bananospl.it](https://bananospl.it/) - Thoron174´s site
 - [https://andrecrjr.github.io/](https://andrecrjr.github.io/) André´s site

## License

[GNU GPLv3](https://github.com/sebrock/banano-donate/blob/banano-dev/LICENSE)

## Credits
Our sincere thanks go to everyone in the BANANO community who contributed and supported in the making of this. BAN fam - best fam! 💛

# Translation and Proofreading

- AhmedDhaif93 for Arabic
- Goose for Chinese
- Kryptopia for Danish
- ATH for Dutch
- Liberty_Seed and iazid for French
- sebrock for German
- Skittish for Hindi
- Pramono for Bahasa Indonesia
- macaleon for Italian
- Africa by Toto for Japanese
- mina_hanem for Farsi
- nknown for Portuguese
- pygo for Norwegian
- MidNightSonne and andrecrjr for Brazilian Portuguese
- YaroslavaWise and Nomina for Russian
- Cristalla for Spanish
- Tahadorukk | Guns'NRoses for Turkish
- Tu Hoang for Vietnamese
- bbedward for reminding the jungle to support

# Graphic Design support
 - Snappadoodle

*That's it guys. If you need to talk to us you can find us on Twitter:
- [André´s twitter](https://twitter.com/andrecrjr)
- [sebrock´s twitter](https://twitter.com/sebrock)
- or both of us on the [Banano Discord Server](https://chat.banano.cc/)
andrecrjr / sebrock|42 세브로크-마흔 둘

# Contribution Guide
Feel free to open Issues for bugs, feature requests, improvents to the code in [https://github.com/sebrock/banano-donate/](https://github.com/sebrock/banano-donate/).
Please commit to a separate branch and create PRs towards the master.

![https://github.com/sebrock/banano-donate/](./dist/images/BananoDonate_repository-card.png)

Made with 🧡 and potassium 🍌 in Brazil, Germany, and the BANANO Jungle.
