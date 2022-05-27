import { useEffect, useState } from "react";
import Head from "next/head";

import { useUser } from "@auth0/nextjs-auth0";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
    styled,
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import { encrypt } from "../helpers/index.js";
import { TextAndBox } from '../components/MySkeleton'

const LocationCard = ({ location, userId }) => {
    return (
        <div className="card">
            <div>
                <h1>{location.name}</h1>
                <h2>{location.country}</h2>
                <h2>{location.adress}</h2>
                <h2>{location.postalCode}</h2>
                <h2>{location.phone}</h2>
                <Button>Editar</Button>
                <Button
                    onClick={async () => {
                        await fetch(
                            `/api/db/user/location?userId=${encrypt(userId)}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    location: {location},
                                    operation: "remove",
                                }),
                            }
                        );
                    }}
                >
                    Borrar
                </Button>
            </div>
            <style jsx>{`
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
            `}</style>
        </div>
    );
};

// Falta validacion de la meta 3.7

const FormNewLocation = ({ userId }) => {
    const [newLocation, setNewLocation] = useState({
        name: "",
        country: "",
        address: "",
        postalCode: 0,
        phone: "",
    });

    const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return (
        <Box component="form" style={{ display: "flex", gap: "15px" }}>
            <TextField
                required
                id="name"
                label="Nombre"
                onChange={(e) => {
                    setNewLocation({
                        ...newLocation,
                        name: e.target.value,
                    });
                }}
            />
            <Select
                id="country"
                value={newLocation.country}
                label="País"
                onChange={(e) =>
                    setNewLocation({ ...newLocation, country: e.target.value })
                }
            >
                <MenuItem value="México">México</MenuItem>
                <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                <MenuItem value="Colombia">Colombia</MenuItem>
            </Select>
            <TextField
                required
                id="address"
                label="Dirección"
                onChange={(e) => {
                    setNewLocation({
                        ...newLocation,
                        address: e.target.value,
                    });
                }}
            />
            <TextField
                required
                id="postalCode"
                label="Código Postal"
                onChange={(e) => {
                    setNewLocation({
                        ...newLocation,
                        postalCode: e.target.value,
                    });
                }}
            />
            <TextField
                required
                id="phone"
                label="Telefono"
                onChange={(e) => {
                    setNewLocation({
                        ...newLocation,
                        phone: e.target.value,
                    });
                }}
            />
            <Button
                onClick={async () => {
                    console.log(newLocation);
                    console.log(encrypt(userId));
                    if (true)
                        await fetch(
                            `/api/db/user/location?userId=${encrypt(userId)}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    location: newLocation,
                                    operation: "add",
                                }),
                            }
                        );
                }}
            >
                Agregar
            </Button>
        </Box>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [userId, setUserId] = useState(null);
    const [locations, setLocations] = useState([]);
    const [ isFetched, setIsFetched ] = useState(false);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setUserId(userDb?._id);
            setLocations(userDb.locations);
            setIsFetched(true);
        };

        if (!isLoading) getData();
    }, [isLoading]);

    return (
        <div id="root">
            <Head>
                <title>Account</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                {!isFetched? <TextAndBox/>:<div className="container">
                    <h1 className="title">Mis Direcciones</h1>
                    <div className="cards">
                        {locations.map((location) => (
                            <LocationCard location={location} userId={userId} />
                        ))}
                    </div>
                    <FormNewLocation userId={userId} />
                </div>}
            </main>

            <style jsx>{`
                .cards {
                    display: flex;
                    flex-direction: row;
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

                .section {
                    min-height: 90vh;
                    display: flex;
                    justify-content: center;
                    background-color: #d8d8d8;
                    padding: 1.5rem 4rem;
                }

                .container {
                    display: flex;
                    flex-direction: column;
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

export const getServerSideProps = withPageAuthRequired();
