import Head from "next/head";
import Image from "next/image";

import Header from "../components/Header.js";

export default function Home() {
    let info = {
        name: "Raspberry Pi",
        details: "Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
        img: "/raspberryPi4.jpg",
        price: 50
    };
    return (
        <div id="root"  className="container">
            <Head>
                <title>{info.name}</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <div className="">
                    <div className="product">
                        <Image
                            src={img}
                            width={100}
                            height={90}
                            quality={100}
                        />
                        <div className="details">
                            <h1>{info.name}</h1>
                            <h2>${info.price}</h2>
                            <div className="button-buy">
                                Comprar
                            </div>
                            <div className="button-wishlist">
                                Wishlist
                            </div>
                            <h3>{info.details}</h3>
                        </div>
                    </div>
                </div>
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

                .product {
                    display: flex;
                    justify-content: center;
                }

                .details {
                    display: flex;
                    flex-direction: column;
                }

                .button-buy {
                    text-align: center;
                    background-color: #FFD814;
                    border: 1px solid #FCD200;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);
                    transition: all .1s linear;
                }

                .button-buy:hover,
                .button-buy:focus,
                .button-buy:active {
                    text-align: center;
                    background-color: #F7CA00;
                    border: 1px solid #F2C200;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);
                    transition: all .1s linear;
                }

                .button-wishlist {
                    text-align: center;
                    background-color: #FFA41C;;
                    border: 1px solid #FF8F00;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);
                    transition: all .1s linear;
                }

                .button-wishlist:hover,
                .button-wishlist:focus,
                .button-wishlist:active {
                    text-align: center;
                    background-color: #FA8900;
                    border: 1px solid #E3931E;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);
                    transition: all .1s linear;
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
