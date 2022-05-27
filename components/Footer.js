import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { styled, Box, Grid, Input, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";

const SearchBar = styled(Input)({
    // maybe use input rather than textfiel; check: https://stackoverflow.com/questions/56122219/in-mui-when-do-we-use-input-vs-textfield-for-building-a-form
    width: 300,
    height: 40,
    color: "darkslategray",
    backgroundColor: "#ffffff",
    borderRadius: "15px 0px 0px 15px",
    input: { padding: 12 },
});

const Header = () => {
    const { user, error, isLoading } = useUser();

    if (error) console.log(error.message);

    return (
        <div id="footer" className="container">
            <div className="recommendation">
            
            </div>
            <div className="info">
                <div id="categories" className="contact-info">
                    <h3>Categorías:</h3>
                    <p>Audio</p>
                    <p>Computación</p>
                    <p>Herramientas</p>
                    <p>Cables</p>
                </div>
                <div id="contact" className="contact-info">
                    <h3>Contacto:</h3>
                    <p>E-mail: support@nodetek.com</p>
                    <p>Phone: (+52) 123-456-789</p>
                    <p>Dirección: Alta Brisa, Tj., B.C.</p>
                </div>
                <div id="location" className="contact-info">
                    <h3>Ubicación:</h3>
                    <p>Calz. del Tecnológico 14102,</p>
                    <p>Alta Brisa, Tj., B.C.</p>
                </div>
            </div>

            <style jsx>{`
                .container {
                    color: #fff;
                    font-size: 16px;
                }

                .info {
                    padding: 0.2rem 0.5rem;
                    background-color: #255075;
                    display: flex;
                    justify-content: center;
                    gap: 15vw;
                }

                .contact-info {
                    text-align: center;
                    line-height: .6;
                }

                .contact-info p:hover,
                .contact-info p:focus,
                .contact-info p:active {
                    color: #ff0;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Header;
