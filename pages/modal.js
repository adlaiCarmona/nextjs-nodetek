import { useState } from "react";
import Head from "next/head";

import Modal from "../components/Modal.js";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div id='root'>
            <Head>
                <title>Modal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Modal</h1>
                <h3 className="subtitle">Meta 3.6 semana 8</h3>
                <button onClick={() => setShowModal(true)}>Open Modal</button>
                <Modal onClose={() => setShowModal(false)} show={showModal}>
                    Hello from the modal!
                </Modal>
            </main>
        </div>
    );
}
