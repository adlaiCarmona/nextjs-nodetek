import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
    const { user, isLoading } = useUser();
    let userId = null;

    useEffect(async () => {
        if (!isLoading) {
            console.log("useEffect running product.js");
            // console.log(`useUser => user = ${JSON.stringify(user)}`);
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            // console.log(userDb);
            console.log(`userDb._id = ${userDb?._id}`);
            userId = userDb?._id;
        }
    }, [user, isLoading]);

    let info = {
        name: "Raspberry Pi 4",
        details:
            "Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
        img: "/raspberryPi4.jpg",
        price: 50,
        id: "627efc79d3d7d85f5f62aa7e",
    };

    return (
        <div id="root" className="container">
            <Head>
                <title>{info.name}</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>

                <div className="container">
                    <div className="product">
                        <div className="image">
                            <Image src={info.img} width={400} height={360} />
                        </div>
                        <div className="details">
                            <h1>{info.name}</h1>
                            <h2>${info.price}</h2>
                            <div
                                className="button-buy"
                                onClick={async () => {
                                    if (userId)
                                    
                                        await fetch(
                                            `/api/db/user/list?listType=shoppingCart&userId=${userId}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                  },
                                                body: JSON.stringify({
                                                    productId: info.id,
                                                    operation: "add",
                                                }),
                                            }
                                        );
                                }}
                            >
                                Comprar
                            </div>
                            <div
                                className="button-wishlist"
                                onClick={async () => {
                                    if (userId)
                                        await fetch(
                                            `/api/db/user/list?listType=wishlist&userId=${userId}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                  },
                                                body: JSON.stringify({
                                                    productId: info.id,
                                                    operation: "add",
                                                }),
                                            }
                                        );
                                }}
                            >
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

                .image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .product {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                .details {
                    display: flex;
                    flex-direction: column;
                    max-width: 40%;
                }

                .button-buy {
                    text-align: center;
                    background-color: #ffd814;
                    border: 1px solid #fcd200;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
                }

                .button-buy:hover,
                .button-buy:focus,
                .button-buy:active {
                    text-align: center;
                    background-color: #f7ca00;
                    border: 1px solid #f2c200;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
                }

                .button-wishlist {
                    text-align: center;
                    background-color: #ffa41c;
                    border: 1px solid #ff8f00;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
                }

                .button-wishlist:hover,
                .button-wishlist:focus,
                .button-wishlist:active {
                    text-align: center;
                    background-color: #fa8900;
                    border: 1px solid #e3931e;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
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
