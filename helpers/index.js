// from: https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

import cookie from "cookie"
const CryptoJS = require('crypto-js');

export function encrypt(text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

export function decrypt(data) {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}