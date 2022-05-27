import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { useUser } from "@auth0/nextjs-auth0";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
    styled,
    Box,
    Button,
    Grid,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";

import { encrypt } from "../helpers/index.js";
import Controls from "../components/controls/Controls.js";
import { useForm, Form } from "../components/useForm";
import { verifyCard } from "/components/verifyCard";

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

const FormNewCard = ({ values, handleInputChange, errors, userId }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await fetch(`/api/db/user/payment?userId=${encrypt(userId)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payment: values,
                    operation: "add",
                }),
            });

            resetForm();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    label="Número de tarjeta"
                    name="card"
                    value={values.card}
                    onChange={handleInputChange}
                    error={errors.card}
                />
                <Controls.Input
                    label="Nombre en la tarjeta"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    type="fullName"
                />
                <Controls.Select
                    name="expMonth"
                    label="Mes"
                    value={values.expMonth}
                    onChange={handleInputChange}
                    options={[...Array(12).keys()].map((num) => {
                        return {
                            id: (num + 1).toString(),
                            title: (num + 1).toString(),
                        };
                    })}
                    error={errors.expMonth}
                />
                <Controls.Select
                    name="expYear"
                    label="Año"
                    value={values.expYear}
                    onChange={handleInputChange}
                    options={[
                        { id: "1", title: "2022" },
                        { id: "2", title: "2023" },
                        { id: "3", title: "2024" },
                    ]}
                    error={errors.expYear}
                />
            </Grid>
            <Controls.Button
                text="Registrarse"
                color="secondary"
                onClick={async () => {
                    await fetch(
                        `/api/db/user/payment?userId=${encrypt(userId)}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                payment: values,
                                operation: "add",
                            }),
                        }
                    );
                }}
            />
        </Form>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [userId, setUserId] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(async () => {
        const getData = async () => {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            setUserId(userDb?._id);
            setCards(userDb.payments);
        };

        if (!isLoading) getData();
    }, [isLoading]);

    const initialFValues = {
        fullName: "",
        card: "",
        expMonth: "",
        expYear: "",
        expDate: "",
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ""
                : "This field is required.";
        if ("card" in fieldValues) {
            const cardInfo = verifyCard(fieldValues.card);
            console.log(cardInfo);
            temp.card = cardInfo.success ? "" : "Card is not valid.";
        }
        setErrors({
            ...temp,
        });

        if (fieldValues == values)
            return Object.values(temp).every((x) => x == "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    return (
        <div id="root" className="container">
            <Head>
                <title>Account</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <h1 className="title">Mis Metodos de Pagos</h1>
                    <div className="cards">
                        {cards.map((card) => (
                            <PaymentCard payment={card} />
                        ))}
                    </div>
                    <FormNewCard
                        values={values}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        userId={userId}
                    />
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
                    background-color: #f7f7f7;
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
