import { UserProvider } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout.js";

UserProvider; //test if needed

// can add layout and keep component as children to have header and footer in every page
// source: https://nextjs.org/docs/basic-features/layouts
export default function MyApp({ Component, pageProps, footerData }) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} footerData={footerData} />
            </Layout>
        </UserProvider>
    );
}
