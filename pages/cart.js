import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";

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
                <div
                    className="icon"
                    onClick={async () => {
                        console.log(props.userId)
                        if (props.userId)
                            await fetch(
                                `/api/db/user/list?listType=shoppingCart&userId=${props.userId}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        productId: props.productId,
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
        };

        if (!isLoading) getData();
    }, [isLoading]);

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
