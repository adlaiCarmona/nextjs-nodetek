import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import {encrypt} from "../helpers/index.js";

const WishlistItem = ({ item, userId }) => {
    return (
        <div className="wishlist-item">
            <div>
                <Image src={item.img} width={400} height={400} />
            </div>
            <div className="wishlist-item-info">
                <h1>{item.name}</h1>
                <hr />
                <h2>${item.price}</h2>
                <h3>{item.description}</h3>
            </div>
            <div>
                <div
                    className="icon"
                    onClick={async () => {
                        await fetch(
                            `/api/db/user/list?listType=wishlist&userId=${encrypt(
                                userId
                            )}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    productId: item._id,
                                    operation: "remove",
                                }),
                            }
                        );
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
            <style jsx>
                {`
                    .wishlist-item {
                        display: flex;
                        flex-direction: row;
                        gap: 50px;
                    }

                    .wishlist-item-info {
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
    const [wishlist, setWishlist] = useState([]);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            console.log(userDb);
            setUserId(userDb?._id);
            const userCart = [];

            for (const item of userDb.wishlist) {
                console.log(item);
                const product = await (
                    await fetch(`/api/db/product?id=${item}`)
                ).json();
                userCart.push(product);
            }

            setWishlist(userCart);
        };

        if (!isLoading) getData();
    }, [isLoading]);

    return (
        <div id="root" className="container">
            <Head>
                <title>Wishlist</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div className="wishlist-cart">
                    <h1 className="title">Tu Wishlist</h1>
                    {wishlist.length === 0 ? (
                        <div>
                            <h2 className="subtitle">
                                No hay productos en tu wishlist.
                            </h2>
                        </div>
                    ) : (
                        wishlist.map((item, i) => {
                            return <WishlistItem item={item} userId={userId} />;
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

                .wishlist-cart {
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
                    min-height: 88vh;
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
