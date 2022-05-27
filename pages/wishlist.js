import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import {encrypt} from "../helpers/index.js";
import { TextAndBox } from '../components/MySkeleton'

const WishlistItem = ({ item, userId }) => {
    return (
        <div className="wishlist-item">
            <div>
                <Image src={item.img} width={300} height={300} />
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
                        border-radius: 20px;
                        border: 1px solid #d7d7d7;
                        padding: 2rem;
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
    const [ isFetched, setIsFetched ] = useState(false);

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
            setIsFetched(true);
        };

        if (!isLoading) getData();
    }, [isLoading]);

    return (
        <div id="root">
            <Head>
                <title>Wishlist</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                {!isFetched? <TextAndBox/>:<div className="container">
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
                </div>}
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
                    min-height: 90vh;
                    display: flex;
                    justify-content: center;
                    background-color: #d8d8d8;
                    padding: 4rem 0px;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: fit-content;
                    gap: 20px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    padding: 2rem;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
