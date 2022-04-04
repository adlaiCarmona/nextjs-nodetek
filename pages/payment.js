import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { styled, Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";

import Header from "../components/Header.js";

const FormNewCard = () => {
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2022);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box component="form" style={{ display:'flex', gap:'15px'}}>
            <TextField required id="card" label="Número de tarjeta" />
            <TextField required id="password" label="Nombre en la tarjeta" />
            <Select
                id="exp-month"
                value={month}
                label="Month"
                onChange={(event) => setMonth(event.target.value)}
            >

                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
            </Select>
            <Select
                id="exp-year"
                value={year}
                label="Year"
                onChange={(event) => setYear(event.target.value)}
            >

                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
            </Select>
            <Button>Agregar</Button>
        </Box>
    );
};

export default function Home() {
    const cards = [
        {
            name: "Daniel Carmona",
            type: "Visa",
            ending: "7136",
        },
    ];
    return (
        <div id="root" className="container">
            <Head>
                <title>Account</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <Header />

                <div className="section">
                    <h1 className="title">Mis Metodos de Pagos</h1>
                    <div className="cards">
                        {cards.map((card) => {
                            return (
                                <div className="card">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            src={
                                                card.type === "Visa"
                                                    ? "/visaLogo.png"
                                                    : "/mastercardLogo.png"
                                            }
                                            width={80}
                                            height={35}
                                        />
                                    </div>
                                    <div>
                                        <h1>{card.name}</h1>
                                        <h2>{card.ending}</h2>
                                        <h2>{card.type}</h2>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <FormNewCard />
                </div>
            </main>

            <style jsx>{`
                .section {
                    max-width: 1000px;
                    margin: auto;
                }

                .cards {
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0px;
                    background-color: red;
                }

                .card {
                    display: flex;
                    padding: 10px;
                    gap: 10px;
                    background-color: #f7f7f7;
                }

                .card h1 {
                    color: #0f1111;
                    font-weight: 550;
                    font-size: 20px;
                    line-height: 6px;
                }

                .card h2 {
                    color: #0f1111;
                    font-weight: 500;
                    font-size: 17px;
                    line-height: 5px;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 36px;
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
