// from: https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}