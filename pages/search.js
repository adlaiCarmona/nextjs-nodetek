import Head from "next/head";

import Header from "../components/Header.js";

export default function Home() {
    return (
        <div id="root"  className="container">
            <Head>
                <title>Account</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <div className="section">
                    <div>
                        <h1 className="title">Resultados</h1>
                    </div>
                    <div className="grid">
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
