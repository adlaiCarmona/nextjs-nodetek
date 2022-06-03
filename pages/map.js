import Head from "next/head";

export default function Home() {
    return (
        <div id="root">
            <Head>
                <title>Mapa</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div className="container">
                    <h1 className="title">Arbol de navegación</h1>
                    <h2 className="subtitle">Menú superior</h2>
                    <ul>
                        <li>Inicio</li>
                        <li>Búsqueda de Producto</li>
                        <li>Cuenta</li>
                        <ul>
                        <li>Mi Carrito</li>
                        <li>Mi Wishlist</li>
                        <li>Mi Direcciones</li>
                        <li>Mis Métodos de Pago</li>
                        <li>Mi Información</li>
                        <li>Administración</li>
                        </ul>
                    </ul>
                    <h2 className="subtitle">Menú inferior</h2>
                    <ul>
                        <li>Contacto</li>
                        <li>Ubicación</li>
                    </ul>
                </div>
            </main>

            <style jsx>{`
                .title {
                    line-height: 1.15;
                    font-size: 2rem;
                }

                .subtitle {
                    line-height: 1;
                    font-size: 1.5rem;
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
                    justify-content: center;
                    max-width: fit-content;
                    background-color: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem 2rem;
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
