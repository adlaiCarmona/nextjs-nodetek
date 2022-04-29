import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
    styled,
    Box,
    Button,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";

import Header from "../components/Header.js";

// Falta validacion de la meta 3.7

const FormNewLocation = () => {

    const [location, setLocation] = useState({
        name: "",
        country: "",
        adress: "",
        postalCode: 0,
        phone: "",
    });

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return (
        <Box component="form" style={{ display: "flex", gap: "15px" }}>
            <TextField required id="name" label="Nombre" />
            <Select
                id="country"
                value={location.country}
                label="País"
                onChange={(event, prevState) => setLocation({...prevState, country:event.target.value})}
            >
                <MenuItem value={1}>México</MenuItem>
                <MenuItem value={2}>Estados Unidos</MenuItem>
                <MenuItem value={3}>Colombia</MenuItem>
            </Select>
            <TextField required id="adress" label="Dirección" />
            <TextField required id="postalCode" label="Código Postal" />
            <TextField required id="phone" label="Telefono" />
            <Button>Agregar</Button>
        </Box>
    );
};

export default function Home() {
    const locations = [
        {
            name: "Daniel Carmona",
            country: "México",
            adress: "Dorado 22050",
            postalCode: 22505,
            phone: "(+52)664-123-4567",
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
                    <h1 className="title">Mis Direcciones</h1>
                    <div className="cards">
                        {locations.map((location) => {
                            return (
                                <div className="card">
                                    <div>
                                        <h1>{location.name}</h1>
                                        <h2>{location.country}</h2>
                                        <h2>{location.adress}</h2>
                                        <h2>{location.postalCode}</h2>
                                        <h2>{location.phone}</h2>
                                        <Button>Editar</Button>
                                        <Button>Borrar</Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <FormNewLocation />
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

export const getServerSideProps = withPageAuthRequired();