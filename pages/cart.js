import Head from "next/head";
import Image from "next/image";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header.js";

const ShoppingItem = (props) => {
    return (
        <div className="shopping-item">
            <div>
                <Image src={props.src} width={400} height={400} />
            </div>
            <div className="shopping-item-info">
                <h1>{props.name}</h1>
                <hr />
                <h2>${props.price}</h2>
                <h3>{props.description}</h3>
            </div>
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
            <style jsx>
                {`
                    .shopping-item {
                        display: flex;
                        flex-direction: row;
                        gap: 50px;
                    }

                    .shopping-item-info {
                        width: 400px;
                    }

                    .icon {
                        width: 50px;
                        height: 50px;
                        border: 1px #f7f7f7;
                        border-radius: 20px;
                        background-color: #d01010;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
};

export default function Home() {
    const shoppingCart = [
        {
            name: "Raspberry Pi 4",
            description:
                "Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
            price: 50,
            img: "/raspberryPi4.jpg",
        },
        {
            name: "Arduino Uno",
            description:
                "Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
            price: 50,
            img: "/arduinoUno.jpg",
        },
    ];
    return (
        <div id="root" className="container">
            <Head>
                <title>Carrito</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <div className="shopping-cart">
                    <h1 className="title">Tu Carrito</h1>
                    {shoppingCart.length === 0 ? (
                        <div>
                            <h2 className="subtitle">
                                No hay productos en tu carrito.
                            </h2>
                        </div>
                    ) : (
                        shoppingCart.map((item, i) => {
                            return (
                                <ShoppingItem
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    src={item.img}
                                />
                            );
                        })
                    )}
                    <Button>Pagar</Button>
                </div>
            </main>

            <style jsx>{`
                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 36px;
                }

                .subtitle {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 25px;
                    line-height: 25px;
                }

                .shopping-cart {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 1000px;
                    margin: auto;
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
