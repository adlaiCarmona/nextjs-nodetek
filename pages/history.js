import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@auth0/nextjs-auth0";

const HistoryItem = (props) => {
    return (
        <div className="history-item">
            <div>
                <Image src={props.src} width={400} height={400} />
            </div>
            <div className="history-item-info">
                <h1>{props.name}</h1>
                <hr />
                <h2>${props.price}</h2>
                <h3>{props.description}</h3>
            </div>
            <style jsx>
                {`
                    .history-item {
                        display: flex;
                        flex-direction: row;
                        gap: 50px;
                    }

                    .history-item-info {
                        width: 400px;
                    }

                    .icon {
                        width: 50px;
                        height: 50px;
                        border: 1px #f7f7f7;
                        border-radius: 20px;
                        background-color: #ffd814;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }

                    .icon:hover,
                    .icon:focus,
                    .icon:active {
                        background-color: #f7ca00;
                    }
                `}
            </style>
        </div>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [userId, setUserId] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            console.log(userDb);
            setUserId(userDb?._id);
            const userCart = [];

                for (const order of userDb.orders) {
                    // console.log(order);
                    for (const item of order) {
                        // console.log(item);
                        const product = await (
                            await fetch(`/api/db/product?id=${item}`)
                        ).json();
                        userCart.push(product);
                    }
                }

            setHistory(userCart);
        };

        if (!isLoading) getData();
    }, [isLoading]);

    return (
        <div id="root" className="container">
            <Head>
                <title>Historial</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div className="history-cart">
                    <h1 className="title">Tu Historial</h1>
                    {history.length === 0 ? (
                        <div>
                            <h2 className="subtitle">
                                No hay productos en tu historial.
                            </h2>
                        </div>
                    ) : (
                        history.map((item, i) => {
                            return (
                                <HistoryItem
                                    name={item.name}
                                    description={item.details}
                                    price={item.price}
                                    src={item.img}
                                    userId={userId}
                                    productId={item._id}
                                    key={item._id}
                                />
                            );
                        })
                    )}
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

                .history-cart {
                    height: 100%;
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

                .section {
                    height: 88vh;
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
