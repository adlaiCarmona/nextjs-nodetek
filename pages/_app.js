import { UserProvider } from "@auth0/nextjs-auth0"

UserProvider

export default function MyApp({ Component, pageProps }) {
  return (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  )
}
