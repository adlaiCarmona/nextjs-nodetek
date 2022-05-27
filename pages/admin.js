import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, MenuItem, Select, TextField } from "@mui/material";

import { TextAndBox } from "../components/MySkeleton";

const NotAdmin = () => {
    return (
        <div id="root">
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div className="container">
                    <div>
                        <h1 className="title">No eres Administrador</h1>
                    </div>
                </div>
            </main>

            <style jsx>{`
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
};

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: null,
        description: null,
        img: null,
        price: null,
        quantity: null,
    });

    return (
        <div id="addProduct" className="container">
            <div className="flex-row">
                <h2 className="title">Añadir Producto</h2>
                <div
                    id="addProduct"
                    className="addProduct"
                    onClick={async () => {
                        console.log(newProduct);
                        if (true)
                            await fetch(`/api/db/product`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    newProduct: newProduct,
                                    operation: "add",
                                }),
                            });
                    }}
                >
                    Add
                </div>
            </div>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="product-name"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => {
                        setNewProduct({
                            ...newProduct,
                            name: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    multiline
                    maxRows={4}
                    id="product-details"
                    label="Details"
                    variant="outlined"
                    onChange={(e) => {
                        setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="product-img"
                    label="Image"
                    variant="outlined"
                    onChange={(e) => {
                        setNewProduct({
                            ...newProduct,
                            img: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="product-price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                        setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="product-quantity"
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                        setNewProduct({
                            ...newProduct,
                            quantity: e.target.value,
                        });
                    }}
                />
            </Box>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    max-width: fit-content;
                    gap: 20px;
                    border-radius: 20px;
                    border: 1px solid #d7d7d7;
                    padding: 2rem;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 34px;
                }

                .addProduct {
                    padding: 0.6rem 2.5rem;
                    height: fit-content;
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

                .flex-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

const ModifyProduct = ({ products }) => {
    const [modifyProduct, setModifyProduct] = useState({});
    const [productId, setProductId] = useState("");

    return (
        <div id="modifyProduct" className="container">
            <div className="flex-row">
                <h2 className="title">Modificar Producto</h2>
                <div
                    id="saveProduct"
                    className="addProduct"
                    onClick={async () => {
                        console.log(modifyProduct);
                        if (true)
                            await fetch(`/api/db/product`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    newProduct: modifyProduct,
                                    operation: "update",
                                }),
                            });
                    }}
                >
                    Guardar
                </div>
            </div>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <Select
                    labelId="select-product-label"
                    id="select-product"
                    value={productId}
                    onChange={(e) => {
                        setModifyProduct(
                            products.find(
                                (product) => product._id == e.target.value
                            )
                        );
                        setProductId(modifyProduct.name);
                    }}
                    label="Producto"
                >
                    {products.map((product) => (
                        <MenuItem value={product._id}>{product.name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    required
                    multiline
                    maxRows={4}
                    id="product-details"
                    label="Details"
                    value={modifyProduct.description}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyProduct({
                            ...modifyProduct,
                            description: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="product-img"
                    label="Image"
                    value={modifyProduct.img}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyProduct({
                            ...modifyProduct,
                            img: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="product-price"
                    label="Price"
                    type="number"
                    value={modifyProduct.price}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyProduct({
                            ...modifyProduct,
                            price: Number(e.target.value),
                        });
                    }}
                />
                <TextField
                    required
                    id="product-quantity"
                    label="Quantity"
                    type="number"
                    value={modifyProduct.quantity}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setModifyProduct({
                            ...modifyProduct,
                            quantity: Number(e.target.value),
                        });
                    }}
                />
            </Box>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    border-radius: 20px;
                    border: 1px solid #d7d7d7;
                    padding: 2rem;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 34px;
                }

                .addProduct {
                    padding: 0.6rem 2.5rem;
                    height: fit-content;
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

                .flex-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [isAdmin, setIsAdmin] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(async () => {
        if (!isLoading) {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            const productsDb = await (await fetch(`/api/db/product`)).json();
            console.log(productsDb);
            setIsAdmin(userDb?.isAdmin);
            setAllProducts(productsDb);
            setIsFetched(true);
        }
    }, [user, isLoading]);

    return (
        <div id="root">
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                {!isFetched ? (
                    <TextAndBox />
                ) : !isAdmin ? (
                    <NotAdmin />
                ) : (
                    <div className="container">
                        <h1 className="title">Administración</h1>
                        <ModifyProduct products={allProducts} />
                        <AddProduct />
                    </div>
                )}
            </main>

            <style jsx>{`
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

// required to be logged in
export const getServerSideProps = withPageAuthRequired();
