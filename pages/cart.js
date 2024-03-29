import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import { encrypt } from "../helpers/index.js";
import { TextAndBox } from '../components/MySkeleton'

const ShoppingItem = ({item, userId, refresh, setRefresh}) => {
    return (
        <div className="shopping-item">
            <div>
                <Image src={item.img} width={300} height={300} />
            </div>
            <div className="shopping-item-info">
                <h1>{item.name}</h1>
                <hr />
                <h2>${item.price}</h2>
                <h3>{item.description}</h3>
            </div>
            <div>
                <button
                    className="icon"
                    onClick={async () => {
                        // console.log(`userId not encrypted ${props.userId}\nuserId encrypted ${encrypt(props.userId)}`)
                        if (userId){
                            await fetch(
                                `/api/db/user/list?listType=shoppingCart&userId=${encrypt(
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
                            setRefresh(!refresh);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
            <style jsx>
                {`
                    button {
                        all:unset;
                    }

                    .shopping-item {
                        display: flex;
                        flex-direction: row;
                        gap: 50px;
                        border-radius: 20px;
                        border: 1px solid #d7d7d7;
                        padding: 2rem;
                    }

                    .shopping-item-info {
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
    const [shoppingCart, setShoppingCart] = useState([]);
    const [ isFetched, setIsFetched ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setUserId(userDb?._id);
            const userCart = [];

            for (const itemId of userDb.shoppingCart) {
                const product = await (
                    await fetch(`/api/db/product?id=${itemId}`)
                ).json();
                userCart.push(product);
            }

            setShoppingCart(userCart);
            setIsFetched(true);
        };

        if (!isLoading) getData();
    }, [isLoading, refresh]);

    return (
        <div id="root">
            <Head>
                <title>Carrito</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                {!isFetched? <TextAndBox/>:<div className="container">
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
                                    item={item}
                                    userId={userId}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            );
                        })
                    )}
                    <Button>Pagar</Button>
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

// // This also gets called at build time
// export async function getServerSideProps(context) {

//     const { user, isLoading } = useUser(); // cant use hooks outside redners
//     const userDb = await (
//         await fetch(`/api/db/user?email=${user?.email}`)
//     ).json();
//     const products = await (
//         await fetch(`http://localhost:3000/api/db/user/list?listType=shoppingCart&userId=${userDb._id}`)
//     ).json();
//     console.log(
//         `products from /api/db/product =>\n${JSON.stringify(
//             products
//         )}`
//     );

//     // Pass post data to the page via props
//     return { props: { products } };
// }
