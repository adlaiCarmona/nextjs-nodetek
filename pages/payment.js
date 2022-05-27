import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

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
import { verifyCard } from "/components/verifyCard";
import { TextAndBox } from '../components/MySkeleton'

const PaymentCard = ({ payment }) => {
    const verified = verifyCard(payment.card);
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
                        verified.type === "Visa"
                            ? "/visaLogo.png"
                            : "/mastercardLogo.png"
                    }
                    width={80}
                    height={35}
                />
            </div>
            <div>
                <h1>{payment.fullName}</h1>
                <h2>{payment.card.substr(payment.card.length - 4)}</h2>
                <h2>{verified.type}</h2>
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

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 36px;
                }
            `}</style>
        </div>
    );
};

const FormNewCard = ({ userId }) => {
    const [newPayment, setNewPayment] = useState({
        fullName: "",
        card: "",
        expMonth: "",
        expYear: "",
        expDate: "",
    });
    const [errors, setErrors] = useState({ card: "", displayErrorCard: false });

    return (
        <Box component="form" style={{ display: "flex", gap: "15px" }}>
            <TextField
                required
                id="card"
                label="Número de tarjeta"
                error={errors.displayErrorCard}
                helperText={errors.card}
                onChange={(e) => {
                    if (!verifyCard(e.target.value).success)
                        setErrors({ ...errors, card: "Tarjeta no valida" });
                    else setErrors({ card: "" });
                    setNewPayment({
                        ...newPayment,
                        card: e.target.value,
                    });
                }}
            />
            <TextField
                required
                id="fullname"
                label="Nombre en la tarjeta"
                onChange={(e) => {
                    setNewPayment({
                        ...newPayment,
                        fullName: e.target.value,
                    });
                }}
            />
            <Select
                id="expMonth"
                value={newPayment.expMonth}
                label="País"
                onChange={(e) =>
                    setNewPayment({ ...newPayment, expMonth: e.target.value })
                }
            >
                {[...Array(12).keys()].map((m) => (
                    <MenuItem value={m}>{m}</MenuItem>
                ))}
            </Select>
            <Select
                id="expMonth"
                value={newPayment.expYear}
                label="País"
                onChange={(e) =>
                    setNewPayment({ ...newPayment, expYear: e.target.value })
                }
            >
                {[...Array(10).keys()].map((m) => (
                    <MenuItem value={m + 2020}>{m + 2020}</MenuItem>
                ))}
            </Select>
            <Button
                onClick={async () => {
                    if (verifyCard(newPayment.card).success) {
                        setErrors({ ...errors, displayErrorCard: false });
                        await fetch(
                            `/api/db/user/payment?userId=${encrypt(userId)}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    payment: newPayment,
                                    operation: "add",
                                }),
                            }
                        );
                    } else {
                        console.log('error with card')
                        setErrors({ ...errors, displayErrorCard: true });
                    }
                }}
            >
                Guardar
            </Button>
        </Box>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [userId, setUserId] = useState(null);
    const [cards, setCards] = useState([]);
    const [ isFetched, setIsFetched ] = useState(false);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setUserId(userDb?._id);
            setCards(userDb.payments);
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
                    <h1 className="title">Mis Metodos de Pagos</h1>
                    <div className="cards">
                        {cards.map((card) => (
                            <PaymentCard payment={card} />
                        ))}
                    </div>
                    <FormNewCard userId={userId} />
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
