import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { styled, Box, Button, Input, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

const SearchBar = styled(Input)({
    // maybe use input rather than textfiel; check: https://stackoverflow.com/questions/56122219/in-mui-when-do-we-use-input-vs-textfield-for-building-a-form
    width: 300,
    height: 40,
    color: "darkslategray",
    backgroundColor: "#ffffff",
    borderRadius: "15px 0px 0px 15px",
    input: { padding: 12 },
});

const FormLogIn = () => {
    return (
        <Box component="form">
            <div>
                <TextField required id="email" label="Correo" />
            </div>
            <div>
                <TextField
                    required
                    id="password"
                    type="password"
                    label="Contraseña"
                />
            </div>
        </Box>
    );
};

const FormSignUp = () => {
    return (
        <Box component="form">
            <div>
                <TextField required id="name" label="Nombre" />
            </div>
            <div>
                <TextField required id="email" label="Correo" />
            </div>
            <div>
                <TextField
                    required
                    id="password"
                    type="password"
                    label="Contraseña"
                />
            </div>
            <div>
                <TextField
                    required
                    id="rePassword"
                    type="password"
                    label="Confirma contraseña"
                />
            </div>
        </Box>
    );
};

const Header = () => {
    const isLogged = false;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <div className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
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
                    {isLogged ? <FormLogIn /> : <FormSignUp />}
                    <div>
                        <Button variant="contained" color="primary">
                            Iniciar Sesion
                        </Button>
                        <Button variant="contained" color="secondary">
                            Registrarse
                        </Button>
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
