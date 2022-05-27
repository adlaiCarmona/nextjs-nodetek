import { useEffect, useState } from "react";
import Head from "next/head";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import { styled, Button, Box, MenuItem, Select, TextField } from "@mui/material";

import {encrypt} from '../helpers/index.js'

const ModifyProduct = ({ info }) => {
    const [modifyInfo, setModifyInfo] = useState({fullName:info.fullName, email:info.email});
    console.log(modifyInfo);

    return (
        <div id="modifyProduct" className="container">
            <hr />
            <h2 className="title">Modificar Información</h2>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    multiline
                    maxRows={4}
                    id="info-email"
                    label="Email"
                    value={modifyInfo.email}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyInfo({
                            ...modifyInfo,
                            email: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    multiline
                    maxRows={4}
                    id="info-fullName"
                    label="Nombre"
                    value={modifyInfo.fullName}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyInfo({
                            ...modifyInfo,
                            fullName: e.target.value,
                        });
                    }}
                />
            </Box>
            <div
                id="saveProduct"
                className="addProduct"
                onClick={async () => {
                    console.log(modifyInfo);
                    if (true)
                        await fetch(`/api/db/user?userId=${encrypt(info._id)}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                newUser: modifyInfo,
                                operation: "update",
                            }),
                        });
                }}
            >
                Guardar
            </div>
            <style jsx>{`
                .container{
                    padding: 10px;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 34px;
                }

                .addProduct {
                    width: 125px;
                    height: 30px;
                    padding: auto;
                    text-align: center;
                    border: 1px solid #d7d7d7;
                    border-radius: 8px;
                    background-color: #ffd814;
                    cursor: pointer;
                }

                .addProduct:hover,
                .addProduct:focus,
                .addProduct:active {
                    background-color: #f7ca00;
                }
            `}</style>
        </div>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [ info, setInfo ] = useState({});

    useEffect(async () => {
        if (!isLoading) {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setInfo(userDb);
        }
    }, [user, isLoading]);

    return (
        <div id="root" className="container">
            <Head>
                <title>Info</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <h1 className="title">Información</h1>
                    <ModifyProduct info={info} />
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
                    padding: 15px;
                    border: 1px solid #d7d7d7;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .grid-item:hover,
                .grid-item:focus,
                .grid-item:active {
                    background-color: #f7f7f7;
                }

                .addProduct {
                    width: 125px;
                    height: 30px;
                    padding: auto;
                    text-align: center;
                    border: 1px solid #d7d7d7;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .addProduct:hover,
                .addProduct:focus,
                .addProduct:active {
                    background-color: #f7f7f7;
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

// required to be logged in
export const getServerSideProps = withPageAuthRequired();
