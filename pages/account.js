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
    faToolbox,
} from "@fortawesome/free-solid-svg-icons";

import { TextAndBox } from '../components/MySkeleton'

export default function Home() {
    const { user, isLoading } = useUser();
    const [isAdmin, setIsAdmin] = useState(false);
    const [ isFetched, setIsFetched ] = useState(false);

    useEffect(async () => {
        if (!isLoading) {
            console.log("useEffect running product.js");
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setIsAdmin(userDb.isAdmin);
            setIsFetched(true);
        }
    }, [user, isLoading]);

    return (
        <div id="root">
            <Head>
                <title>Cuenta</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                {!isFetched? <TextAndBox/>:<div className="container">
                    <div>
                        <h1 className="title">Mi Cuenta</h1>
                    </div>
                    <div className="grid">
                        <Link href="/cart">
                            <a className="grid-item">
                                <p>Mi Carrito</p>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    size="4x"
                                />
                            </a>
                        </Link>
                        <Link href="/wishlist">
                            <a className="grid-item">
                                <p>Mi Wishlist</p>
                                <FontAwesomeIcon
                                    icon={faClipboardCheck}
                                    size="4x"
                                />
                            </a>
                        </Link>
                        <Link href="/location">
                            <a className="grid-item">
                                <p>Mis Direcciones</p>
                                <FontAwesomeIcon
                                    icon={faMapLocationDot}
                                    size="4x"
                                />
                            </a>
                        </Link>
                        <Link href="/payment">
                            <a className="grid-item">
                                <p>Mis Metodos de Pagos</p>
                                <FontAwesomeIcon
                                    icon={faCreditCard}
                                    size="4x"
                                />
                            </a>
                        </Link>
                        <Link href="/info">
                            <a className="grid-item">
                                <p>Mi Información</p>
                                <FontAwesomeIcon icon={faIdCard} size="4x" />
                            </a>
                        </Link>
                        {isAdmin && (
                            <Link href="/admin">
                                <a className="grid-item">
                                    <p>Administración</p>
                                    <FontAwesomeIcon
                                        icon={faToolbox}
                                        size="4x"
                                    />
                                </a>
                            </Link>
                        )}
                    </div>
                </div>}
            </main>

            <style jsx>{`
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
                    min-height: 90vh;
                    display: flex;
                    justify-content: center;
                    background-color: #d8d8d8;
                    padding: 2rem 0px;
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
                    margin: 2rem 8rem;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
