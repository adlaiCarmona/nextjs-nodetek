import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="test">
                <h1 className="title">Dashboard</h1>
                <h3 className="subtitle">Meta 3.6 semana 8</h3>

                <div className="dashboard">
                    <div className="dashboard-header">
                        <div className="dashboard-item">
                            <Image
                                src="/favicon.ico"
                                width={50}
                                height={50}
                                quality={100}
                            />
                            <p>Quantity</p>
                        </div>
                        <div className="dashboard-item">
                            <Image
                                src="/favicon.ico"
                                width={50}
                                height={50}
                                quality={100}
                            />
                            <p>Income</p>
                        </div>
                        <div className="dashboard-item">
                            <Image
                                src="/favicon.ico"
                                width={50}
                                height={50}
                                quality={100}
                            />
                            <p>Reach</p>
                        </div>
                    </div>
                    <div className="dashboard-body">
                        <div className="dashboard-chart">
                            <Image
                                src="/lineChart.png"
                                width={250}
                                height={250}
                                quality={100}
                            />
                            <p>Table 1</p>
                        </div>
                        <div className="dashboard-chart">
                            <Image
                                src="/pieChart.svg"
                                width={250}
                                height={250}
                                quality={100}
                            />
                            <p>Table 2</p>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .test {
                }

                .container {
                    min-height: 100vh;
                    padding: 0 0rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: start;
                }

                main {
                    min-width: 100vw;
                    padding: 0 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                .dashboard {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    background-color: #f0f0f0;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                }

                .dashboard-body {
                    display: flex;
                    flex-wrap: wrap;
                }

                .dashboard-item {
                    display: flex;
                    align-items: center;
                    margin: 1rem;
                    padding: 1rem;
                    background-color: #ffffff;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .dashboard-item:hover,
                .dashboard-item:focus,
                .dashboard-item:active {
                    border-color: #707070;
                }

                .dashboard-item h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .dashboard-item p {
                    margin: 0;
                    font-size: 1rem;
                    line-height: 1.5;
                }

                .dashboard-chart {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 1rem;
                    padding: 1rem;
                    background-color: #ffffff;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .logo {
                    height: 1em;
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
