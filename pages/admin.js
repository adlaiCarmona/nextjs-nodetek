import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import { styled, Button, Box, MenuItem, Select, TextField } from "@mui/material";

const NotAdmin = () => {
    return (
        <div id="root" className="container">
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <div>
                        <h1 className="title">No eres Administrador</h1>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .section {
                    max-width: 1000px;
                    margin: auto;
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
            <hr />
            <h2 className="title">Añadir Producto</h2>
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
            <style jsx>{`
                .container{
                    padding: 10px;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 34px;
                }

                .addProduct {
                    width: 125px;
                    height: 30px;
                    padding: auto;
                    text-align: center;
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
            `}</style>
        </div>
    );
};

const ModifyProduct = ({ products }) => {
    const [modifyProduct, setModifyProduct] = useState({});
    const [productId, setProductId] = useState('');

    return (
        <div id="modifyProduct" className="container">
            <hr />
            <h2 className="title">Modificar Producto</h2>
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
                        setModifyProduct(products.find(product => product._id == e.target.value));
                        setProductId(modifyProduct.name);
                    }}
                    label="Producto"
                >
                    {
                        products.map((product) => (<MenuItem value={product._id}>{product.name}</MenuItem>))
                    }
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
                Save
            </div>
            <style jsx>{`
                .container{
                    padding: 10px;
                }

                .title {
                    color: #0f1111;
                    font-weight: 600;
                    font-size: 28;
                    line-height: 34px;
                }

                .addProduct {
                    width: 125px;
                    height: 30px;
                    padding: auto;
                    text-align: center;
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
            `}</style>
        </div>
    );
};

export default function Home() {
    const { user, isLoading } = useUser();
    const [isAdmin, setIsAdmin] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const router = useRouter();

    useEffect(async () => {
        if (!isLoading) {
            const userDb = await (
                await fetch(`/api/db/user?email=${user?.email}`)
            ).json();
            const productsDb = await (await fetch(`/api/db/product`)).json();
            console.log(productsDb);
            setIsAdmin(userDb?.isAdmin);
            setAllProducts(productsDb);
        }
    }, [user, isLoading]);

    if (!isAdmin) return <NotAdmin />;

    return (
        <div id="root" className="container">
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main>
                <div className="section">
                    <h1 className="title">Admin</h1>
                    <ModifyProduct products={allProducts} />
                    <AddProduct />
                </div>
            </main>

            <style jsx>{`
                .section {
                    max-width: 1000px;
                    margin: auto;
                }

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

// required to be logged in
export const getServerSideProps = withPageAuthRequired();
