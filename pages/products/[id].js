import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@auth0/nextjs-auth0";
import {encrypt} from '../../helpers/index.js'

// can add snackbar from mui to pop up when added to cart or wishlist

export default function Home({ product }) {
    const { user, isLoading } = useUser();
    const [ userId, setUserId] = useState(null);

    useEffect(async () => {
        if (!isLoading) {
            console.log("useEffect running product.js");
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            console.log(`userDb._id = ${userDb?._id}`);
            setUserId(userDb._id);
        }
    }, [user, isLoading]);
/*
    let info = {
        name: "Raspberry Pi 4",
        details:
            "Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+, while retaining backwards compatibility and similar power consumption.",
        img: "/raspberryPi4.jpg",
        price: 50,
        id: "627efc79d3d7d85f5f62aa7e",
    };
*/
    return (
        <div id="root" className="container">
            <Head>
                <title>{product.name}</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div>
                    <div className="product">
                        <div className="image">
                            <Image src={product.img} width={400} height={360} />
                        </div>
                        <div className="details">
                            <h1>{product.name}</h1>
                            <h2>${product.price}</h2>
                            <button
                                className="button-buy"
                                onClick={async () => {
                                    if (userId)
                                        await fetch(
                                            `/api/db/user/list?listType=shoppingCart&userId=${encrypt(userId)}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    productId: product._id,
                                                    operation: "add",
                                                }),
                                            }
                                        );
                                }}
                            >
                                Comprar
                            </button>
                            <button
                                className="button-wishlist"
                                onClick={async () => {
                                    if (userId)
                                        await fetch(
                                            `/api/db/user/list?listType=wishlist&userId=${encrypt(userId)}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    productId: product._id,
                                                    operation: "add",
                                                }),
                                            }
                                        );
                                }}
                            >
                                Wishlist
                            </button>

                            <h3>{product.description}</h3>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                a {
                    color: inherit;
                    text-decoration: none;
                }

                h3 {
                    font-weight: regular;
                }

                button {
                    all:unset;
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
                    max-width: fit-content;
                    gap: 20px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    padding: 2rem;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .details {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    max-width: 40%;
                }

                .button-buy {
                    text-align: center;
                    background-color: #ffd814;
                    border: 1px solid #fcd200;
                    border-radius: 20px;
                    cursor: pointer;
                    padding: 5px;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
                }

                .button-buy:hover,
                .button-buy:focus,
                .button-buy:active {
                    background-color: #f7ca00;
                }

                .button-wishlist {
                    text-align: center;
                    background-color: #ffa41c;
                    border: 1px solid #ff8f00;
                    border-radius: 20px;
                    padding: 5px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
                    transition: all 0.1s linear;
                }

                .button-wishlist:hover,
                .button-wishlist:focus,
                .button-wishlist:active {
                    background-color: #fa8900;
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
                    padding: 2rem;
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

// from: https://nextjs.org/docs/basic-features/pages

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:3000/api/db/product')
    const products = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = products.map((product) => ({
      params: { id: product._id.toString() },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    // const res = await fetch(`https://localhost:3000/product/${params.id}`);
    // const post = await res.json();

    const product = await (
        await fetch(`http://localhost:3000/api/db/product?id=${params.id}`)
    ).json();
    // console.log(
    //     `product from /api/db/product?id=${params.id} =>\n${JSON.stringify(
    //         product
    //     )}`
    // );

    // Pass post data to the page via props
    return { props: { product } };
}
