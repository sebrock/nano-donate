## Welcome to Banano Donate

![](./dist/images/icon302.png "Logo")

# What is it?
**Banano Donate** is a browser extension for Google Chrome which allows you to easily make [Banano currency](https://www.banano.cc) donations to participating websites. The website owner specifies the Banano donation address beforehand so you can just concentrate on making the donation.

# How do I use it to make a donation?
Blabla until webstore install manually.. release..yadi yadi


# How can I receive donations through BananoDonate?
If you are a website owner and want to enable your site to receive donations through BananoDonate there are just 3 sinple steps to be completed.
This may be best done by your website administrator unless you are managing your website yourself and have a basic understanding of HTML.
## 1. Insert HTML meta tag into you main page´s header
The HTML meta tag below lets your users´ BananoDonate extension know where donations will be sent.
It need to be placed in the header section of your main landing page, typically `index.html`.

If you do not have a banano wallet yet, go [here](https://banano.how/where-does-it-come-from/) to find out how to get one.
Please replace the contents of the _content_ property with the banano address you want to receive the donations.

```
 <meta name="banano"  content="ban_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"/>
 ```
## 2. Let your users know that they can donate to your site using BananoDonate
The extension can be downloaded in the Coogle Chrome Webstore by following [this link](TBD)

## 3. Put the BananoDonate logo on your page (optional)
You can give your visitors a hint that your site is enabled for BananoDonate by placing the following code on your page:
```
<!-- Start Banano-donate logo -->
<a href="https://github.com/sebrock/banano-donate" target="_blank">
<img border="0" src ="https://github.com/sebrock/banano-donate/blob/banano-dev/dist/images/ban-don-logo.png" title="This site can receive donations via Banano-donate"  alt="This site can receive donations via Banano-donate" height="70"</img>
<!-- End Banano-donate logo -->
 ```
The following image will be displayed:
![](.dist/images/ban-don-logo.png)


# How should I approach a website owner if I want them to enable them to receive donations via BananoDonate? 

If you are not the owner but still want to donate Banano try sending a kind email along with this <a href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate" target="_blank">link</a> to the website's owner through their contact page. You could use the following email template as a starting point:

Hi [SITE_OWNER],

I love your website and was hoping to donate some Banano digital currency to you. However I noticed your website is not enabled for BananoDonate. It's very easy to get enabled and you can learn how to do so at the following link (no sign-up required): <a href="https://github.com/sebrock/banano-donate/tree/banano-dev#how-can-i-receive-donations-through-bananodonate" target="_blank">link</a>

Thanks!
[YOUR_NAME]

### License

GNU GPLv3
