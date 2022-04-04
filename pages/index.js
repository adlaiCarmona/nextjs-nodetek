import Head from "next/head";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Header from "../components/Header.js";

export default function Home() {
    return (
        <div id="root" className="container">
            <Head>
                <title>NodeTek</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                >
                    <div className="product">
                        <Image
                            src="/arduinoUno.jpg"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Arduino Uno</h1>
                        </div>
                    </div>
                    <div className="product">
                        <Image
                            src="/arduinoMega.jpg"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Arduino Mega</h1>
                        </div>
                    </div>
                    <div className="product">
                        <Image
                            src="/arduinoNano.png"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Arduino Nano</h1>
                        </div>
                    </div>
                    <div className="product">
                        <Image
                            src="/raspberryPi4.jpg"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Raspberry Pi 4</h1>
                        </div>
                    </div>
                    <div className="product">
                        <Image
                            src="/raspberryPiPico.jpg"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Raspberry Pi Pico</h1>
                        </div>
                    </div>
                    <div className="product">
                        <Image
                            src="/raspberryPiZero.jpg"
                            width={250}
                            height={250}
                        />
                        <div>
                            <h1>Raspberry Pi Zero</h1>
                        </div>
                    </div>
                </Carousel>
            </main>

            <style jsx>{`
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

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .product {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
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
