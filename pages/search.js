import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0";

const Product = ({ product }) => {
    function truncateText(text, length) {
        if (text.length <= length) {
            return text;
        }

        return text.substr(0, length) + "\u2026";
    }
    return (
        <div className="grid-item">
            <Link href={`/products/${product._id}`}>
                <a>
                    <div className="divided">
                        <div className="image">
                            <Image src={product.img} width={300} height={270} />
                        </div>
                        <div className="info">
                            <h1 className="title">{product.name}</h1>
                            <h2 className="price">$ {product.price}</h2>
                            <p className="description">{product.description}</p>
                            {false && <p className="description">{truncateText(product.description, 75)}</p>}
                        </div>
                    </div>
                </a>
            </Link>
            <style jsx>{`
                .grid-item {
                    width: 85vw;
                    height: 45vh;
                    margin: 15px;
                    border-radius: 8px;
                    cursor: pointer;
                }
                .grid-item a {
                    color: #0f0f0f;
                    text-decoration: none;
                }

                .grid-item:hover,
                .grid-item:focus,
                .grid-item:active {
                    background-color: #f7f7f7;
                }

                .divided{
                    display: flex;
                    flex-grow: none;
                    gap: 10px;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 30px;
                }
                .price {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 24;
                    line-height: 28px;
                }
                .description {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 20;
                    line-height: 22px;
                }
                .img{
                    flex: 0 50%;
                }
                .info{
                    flex: 0 50%;
                }
            `}</style>
        </div>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [allProducts, setAllProducts] = useState([]);
    const router = useRouter();
    const { q } = router.query;

    useEffect(async () => {
        if (!isLoading) {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            const productsDb = await (await fetch(`/api/db/product`)).json();
            productsDb.forEach(product => {
                console.log(`${q} in ${product.name}\nproduct.name.includes(q) = ${product.name.includes(q)}\nproduct.description.includes(q) = ${product.description.includes(q)}`)
            });
            setAllProducts(
                productsDb.filter(
                    (product) =>
                        product.name.toLowerCase().includes(q) ||
                        product.description.toLowerCase().includes(q)
                )
            );
        }
    }, [user, isLoading]);

    return (
        <div id="root" className="container">
            <Head>
                <title>{q}</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <div>
                        <h1 className="title">Resultados</h1>
                    </div>
                    { allProducts.length > 0 &&
                    <div className="grid">
                        {allProducts.map((product) => (
                            <Product product={product} />
                        ))}
                    </div>}
                    { allProducts.length == 0 &&
                    <div className="grid">
                        No se encontraron resultados
                    </div>}
                </div>
            </main>

            <style jsx>{`
                .section {
                    max-width: 1000px;
                    margin: auto;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 36px;
                }

                .grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 5px;
                    margin: 20px;
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
