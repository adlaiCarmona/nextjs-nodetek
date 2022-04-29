import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

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

import Controls from "../components/controls/Controls.js";
import { useForm, Form } from "../components/useForm";
import { verifyCard } from "/components/verifyCard";
import Header from "../components/Header.js";

const initialFValues = {
    fullName: "",
    card: "",
    expMonth: "",
    expYear: "",
    expDate: "",
};

const FormNewCard = ({ values, handleInputChange, errors, handleSubmit }) => {
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
                        { id: "1", title: "2023" },
                        { id: "1", title: "2024" },
                    ]}
                    error={errors.expYear}
                />
            </Grid>
        </Form>
    );
};

export default function Home() {
    const { user, error, isLoading } = useUser();
    const router = useRouter()

    useEffect(() => {
        if (!(user || isLoading)) {
          router.push('/api/auth/login')
        }
      }, [user, isLoading])

    const cards = [
        {
            name: "Daniel Carmona",
            type: "Visa",
            ending: "7136",
        },
    ];

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

    // have to change handle to own service!!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            //employeeService.insertEmployee(values);
            resetForm();
        }
    };

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
                    <FormNewCard
                        values={values}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        handleSubmit={handleSubmit}
                    />
                    <Controls.Button
                        text="Registrarse"
                        color="secondary"
                        onClick={resetForm}
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