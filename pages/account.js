import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faClipboardCheck,
    faMapLocationDot,
    faCreditCard,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const { user, isLoading } = useUser();

    useEffect(async () => {
        if (!isLoading) {
            console.log("useEffect running product.js");
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
        }
    }, [user, isLoading]);

    return (
        <div id="root" className="container">
            <Head>
                <title>Cuenta</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <div>
                        <h1 className="title">Mi Cuenta</h1>
                    </div>
                    <div className="grid">
                        <Link href="/cart">
                            <div className="grid-item">
                                <div>Mi Carrito</div>
                                <FontAwesomeIcon icon={faCartShopping} size='4x' />
                            </div>
                        </Link>
                        <Link href="/wishlist">
                            <div className="grid-item">
                                <div>Mi Wishlist</div>
                                <FontAwesomeIcon icon={faClipboardCheck} size='4x' />
                            </div>
                        </Link>
                        <Link href="/location">
                            <div className="grid-item">
                                <div>Mis Direcciones</div>
                                <FontAwesomeIcon icon={faMapLocationDot} size='4x' />
                            </div>
                        </Link>
                        <Link href="/payment">
                            <div className="grid-item">
                                <div>
                                    Mis Metodos de Pagos
                                </div>
                                <FontAwesomeIcon icon={faCreditCard} size='4x' />
                            </div>
                        </Link>
                        <Link href="/info">
                            <div className="grid-item">
                                <div>Mi Información</div>
                                <FontAwesomeIcon icon={faIdCard} size='4x' />
                            </div>
                        </Link>
                    </div>
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
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 25px;
                }

                .grid-item {
                    width: 320px;
                    height: 20vh;
                    display: flex;
                    padding: 15px;
                    align-items: center;
                    justify-content: space-evenly;
                    border: 1px solid #d7d7d7;
                    border-radius: 8px;
                    cursor: pointer;
                    color: #262626;
                    font-size: 20px;
                    text-decoration: none;
                }

                .grid-item:hover,
                .grid-item:focus,
                .grid-item:active {
                    background-color: #f7f7f7;
                    color: #000000;
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

export const getServerSideProps = withPageAuthRequired();
