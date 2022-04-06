import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { styled, Box, Grid, Input, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

import Controls from "/components/controls/Controls.js";
import { useForm, Form } from "/components/useForm";
import * as employeeService from "../services/employeeService";

const initialFValues = {
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
};

const SearchBar = styled(Input)({
    // maybe use input rather than textfiel; check: https://stackoverflow.com/questions/56122219/in-mui-when-do-we-use-input-vs-textfield-for-building-a-form
    width: 300,
    height: 40,
    color: "darkslategray",
    backgroundColor: "#ffffff",
    borderRadius: "15px 0px 0px 15px",
    input: { padding: 12 },
});

const FormLogIn = ({ values, handleInputChange, errors, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <Controls.Input
                    label="Contraseña"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    type="password"
                />
            </Grid>
        </Form>
    );
};

const FormSignUp = ({ values, handleInputChange, errors, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    label="Nombre"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                />
                <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <Controls.Input
                    label="Contraseña"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                />
                <Controls.Input
                    label="Confirma contraseña"
                    name="rePassword"
                    value={values.rePassword}
                    onChange={handleInputChange}
                    error={errors.password}
                />
            </Grid>
        </Form>
    );
};

const Header = () => {
    const isLogged = false;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ""
                : "This field is required.";
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ""
                : "Email is not valid.";
        if ("rePassword" in fieldValues != "password" in fieldValues)
            temp.rePassword = fieldValues.rePassword
                ? ""
                : "Invalid Credentials.";
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
            employeeService.insertEmployee(values);
            resetForm();
        }
    };

    return (
        <div id="header" className="container">
            <div className="tab-img">
                <Link href="/">
                    <Image
                        src="/NodetekNameWY.png"
                        width={170}
                        height={35}
                        quality={100}
                    />
                </Link>
            </div>

            <div className="search-bar">
                <SearchBar disableUnderline={true} />
                <Link href="/product">
                    <div className="search-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </Link>
            </div>

            <div id="user" onClick={handleOpen}>
                <div className="tab">
                    <FontAwesomeIcon icon={faUser} />
                    <p>Cuenta</p>
                </div>
                <Link href="/account">a</Link>
            </div>
            <Modal open={open} onClose={handleClose}>
                <div className="modal">
                    {isLogged ? (
                        <FormLogIn
                            values={values}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            handleSubmit={handleSubmit}
                        />
                    ) : (
                        <FormSignUp
                            values={values}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    <div>
                        <Controls.Button type="login" text="Iniciar Sesión" />
                        <Controls.Button
                            text="Registrarse"
                            color="secondary"
                            onClick={resetForm}
                        />
                    </div>
                </div>
            </Modal>

            <style jsx>{`
                .container {
                    height: 60px;
                    padding: 0.2rem 0.5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #255075;
                }

                .modal {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 600;
                    background-color: white;
                    border: 0px;
                    border-radius: 10px;
                    boxshadow: 24;
                    padding: 30px;
                }

                .tab {
                    padding: 17px;
                    gap: 7px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    color: white;
                }

                .tab:hover,
                .tab:focus,
                .tab:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }

                .tab-img {
                    padding: 5px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                }

                .tab-img:hover,
                .tab-img:focus,
                .tab-img:active {
                    border-color: #0070f3;
                    cursor: pointer;
                }

                .search-bar {
                    display: flex;
                    align-items: center;
                }

                .search-button {
                    padding: 5px;
                    border-radius: 0px 15px 15px 0px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    color: white;
                }

                .search-button:hover,
                .search-button:focus,
                .search-button:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }

                .login-button {
                    height: 40px;
                    border-radius: 15px;
                    background-color: #372000;
                    padding: 5px;
                }

                .login-button:hover,
                .login-button:focus,
                .login-button:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Header;
