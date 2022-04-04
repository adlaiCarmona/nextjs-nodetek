import Head from "next/head";

import useUser from "../lib/useUser";
import Header from "../components/Header.js";

export default function Home() {
    // Fetch the user client-side
    const { user } = useUser({ redirectTo: "/login" });

    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        return <div>Loading...</div>;
    }

    return (
        <div id="root" className="container">
            <Head>
                <title>Account</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <div className="section">
                    <div>
                        <h1 className="title">Mi Cuenta</h1>
                    </div>
                    <div className="grid">
                        <div className="grid-item">Historial de Compras</div>
                        <div className="grid-item">Mi Wishlist</div>
                        <div className="grid-item">Mi Dirección</div>
                        <div className="grid-item">Mis Pagos</div>
                        <div className="grid-item">Mi Información</div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .section {
                    max-width: 1000px;
                    margin: auto;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 36px;
                }

                .grid {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 25px;
                }

                .grid-item {
                    width: 320px;
                    height: 20vh;
                    padding: 15px;
                    border: 1px solid #d7d7d7;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .grid-item:hover,
                .grid-item:focus,
                .grid-item:active {
                    background-color: #f7f7f7;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
